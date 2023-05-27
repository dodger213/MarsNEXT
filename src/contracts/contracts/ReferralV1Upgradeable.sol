// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

interface IERC20_EXTENDED {
    function name() external view returns (string memory);

    function decimals() external view returns (uint8);
}

struct PlanStruct {
    uint8 planId;
    string name;
    uint256 value;
    uint256 maxLimitMultiplier;
}

interface IVariables {
    function getLevelRates() external view returns (uint16[] memory);

    function getLevelDecimals() external view returns (uint16);

    function getValueBufferRate() external view returns (uint8);

    function getGlobalRewardRate() external view returns (uint8);

    function getWeeklyRewardRate() external view returns (uint8);

    function getIbpRewardRate() external view returns (uint8);

    function getCoreMemberRewardRate() external view returns (uint8);

    function getAdminFees() external view returns (uint8);

    function getUsdtContractAddress() external view returns (address);

    function getBusdContractAddress() external view returns (address);

    function getPlanById(
        uint8 _planId
    ) external view returns (PlanStruct memory);

    function getDefaultReferrer() external view returns (address);

    function getDefaultIBP() external view returns (address);

    function getAdminAddress() external view returns (address);
}

contract ReferralV1Upgradeable is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    address private _variableContractAddress;
    address[] private _globalAddresses;
    address[] private _ibpAddresses;

    uint32 public totalUsers;

    uint256 private _totalRegistrationValue;
    uint256 private _totalRegistrationValueForWeeklyRewards;

    uint256 private _totalReferralPaid;
    uint256 private _totalGlobalRewardsPaid;
    uint256 private _totalWeeklyRewardsPaid;
    uint256 private _totalCoreMembershipRewardPaid;
    uint256 private _totalIBPRewardsPaid;

    struct AccountStruct {
        uint32 userId;
        bool isDisabledByAdmin;
        address ibpAddress;
        address referrerAddress;
        address[] refereeAddresses;
        address[] teamAddress;
        uint32[] teamLevels;
        uint256 maxLimit;
        uint256 totalRewards;
        uint256 referralRewards;
        uint256 globalRewards;
        uint256 weeklyRewards;
        uint256 ibpRewards;
        bool isGlobal;
        uint32[] globalIndexes;
    }

    mapping(address => AccountStruct) private accounts;
    mapping(uint32 => address) private idToAddress;
    mapping(address => bool) private isIBPAddress;

    event Registration(
        address userAddress,
        uint32 userId,
        uint8 planId,
        address referrerAddress
    );
    event ReferrerAdded(address referrerAddress, address refereeAddress);
    event ReferrerNotAdded(
        address referrerAddress,
        address refereeAddress,
        string reason
    );
    event IBPAdded(address ibpAddress, address userAddress);
    event IBPNotAdded(address ibpAddress, address userAddress, string reason);
    event IBPPromotedByAdmin(address ibpAddress);
    event IBPRemovedByAdmin(address ibpAddress);
    event TeamAddressAdded(
        address parentAddress,
        address referrerAddress,
        address refereeAddress,
        uint32 level
    );
    event ReferralPaid(
        address referrerAddress,
        address userAddress,
        uint256 value,
        uint256 rewardValue,
        uint256 rewardRate,
        uint256 rewardRateDecimals,
        uint32 level
    );
    event ReferralNotPaid(
        address referrerAddress,
        address userAddress,
        uint256 registrationValue,
        uint256 rewardValue,
        uint16 rewardRate,
        uint16 rewardRateDecimals,
        uint32 level,
        string reason
    );
    event GlobalRewardsPaid(
        address globalAddress,
        address userAddress,
        uint256 registrationValue,
        uint256 rewardValue,
        uint16 rewardRate,
        uint16 rewardRateDecimals
    );
    event GlobalRewardsNotPaid(
        address globalAddress,
        address userAddress,
        uint256 registrationValue,
        uint256 rewardValue,
        uint16 rewardRate,
        uint16 rewardRateDecimals,
        string reason
    );
    event WeeklyRewardsPaid(
        address globalAddress,
        uint256 businessValue,
        uint256 rewardValue,
        uint16 rewardRate,
        uint16 rewardRateDecimals
    );
    event WeeklyRewardsNotPaid(
        address globalAddress,
        uint256 businessValue,
        uint256 rewardValue,
        uint16 rewardRate,
        uint16 rewardRateDecimals,
        string reason
    );

    event IBPRewardsPaid(
        address ibpAddress,
        address userAddress,
        uint256 businessValue,
        uint256 rewardValue,
        uint16 rewardRate,
        uint16 rewardRateDecimals
    );

    receive() external payable {}

    function initialize() public initializer {
        _variableContractAddress = address(0);

        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function hasReferrer(
        address _userAddress
    ) private view returns (bool _hasReferrer) {
        if (accounts[_userAddress].referrerAddress != address(0)) {
            _hasReferrer = true;
        }
    }

    function isIBP(address _ibpAddress) external view returns (bool) {
        return isIBPAddress[_ibpAddress];
    }

    function getIBPList() external view returns (address[] memory) {
        return _ibpAddresses;
    }

    function addIBPAddressAdmin(address _ibpAddress) external onlyOwner {
        bool isAlreadyIBP = isIBPAddress[_ibpAddress];
        if (!isAlreadyIBP) {
            isIBPAddress[_ibpAddress] = true;
            _ibpAddresses.push(_ibpAddress);
            emit IBPPromotedByAdmin(_ibpAddress);
        }
    }

    function removeIBPAddressAdmin(address _ibpAddress) external onlyOwner {
        bool isAlreadyIBP = isIBPAddress[_ibpAddress];
        if (isAlreadyIBP) {
            isIBPAddress[_ibpAddress] = false;
            address[] memory ibpAddressList = _ibpAddresses;
            for (uint i; i < ibpAddressList.length; i++) {
                if (ibpAddressList[i] == _ibpAddress) {
                    _ibpAddresses[i] = ibpAddressList[
                        ibpAddressList.length - 1
                    ];
                    _ibpAddresses.pop();
                    emit IBPRemovedByAdmin(_ibpAddress);
                    break;
                }
            }
        }
    }

    //addReferrer
    function _addReferrer(
        address _referrer,
        address _referee,
        uint8 _levelLength
    ) private {
        if (!hasReferrer(_referee)) {
            AccountStruct storage userAccount = accounts[_referee];

            if (_referrer == address(0)) {
                emit ReferrerNotAdded(
                    _referrer,
                    _referee,
                    "Zero address cannot be referrer. Setting default referrer."
                );

                address defaultReferrer = IVariables(_variableContractAddress)
                    .getDefaultReferrer();
                userAccount.referrerAddress = defaultReferrer;

                emit ReferrerAdded(defaultReferrer, _referee);
            } else {
                userAccount.referrerAddress = _referrer;
                emit ReferrerAdded(_referrer, _referee);
            }

            for (uint8 i; i < _levelLength; i++) {
                AccountStruct storage referrerAccount = accounts[
                    userAccount.referrerAddress
                ];

                if (userAccount.referrerAddress == address(0)) {
                    break;
                }

                if (i == 0) {
                    referrerAccount.refereeAddresses.push(_referee);
                    if (userAccount.ibpAddress != address(0)) {
                        emit IBPNotAdded(
                            userAccount.ibpAddress,
                            _referee,
                            "Referee already have ibp set."
                        );
                    } else {
                        if (referrerAccount.ibpAddress == address(0)) {
                            emit IBPNotAdded(
                                referrerAccount.ibpAddress,
                                _referee,
                                "Zero address cannot be ibp. Setting up default ibp"
                            );

                            address defaultIBP = IVariables(
                                _variableContractAddress
                            ).getDefaultIBP();
                            userAccount.ibpAddress = defaultIBP;

                            emit IBPAdded(defaultIBP, _referee);
                        } else {
                            userAccount.ibpAddress = referrerAccount.ibpAddress;
                            emit IBPAdded(referrerAccount.ibpAddress, _referee);
                        }
                    }
                }

                referrerAccount.teamAddress.push(_referee);
                referrerAccount.teamLevels.push(i + 1);

                userAccount = referrerAccount;
            }
        } else {
            emit ReferrerNotAdded(
                _referrer,
                _referee,
                "User Already have referrer"
            );
        }
    }

    //getRandomGlobalAddress
    function _getRandomGlobalAddress() private view returns (address) {
        uint256 randomHash = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    blockhash(block.number - 1)
                )
            )
        );
        uint256 randomIndex = randomHash % _globalAddresses.length;
        return _globalAddresses[randomIndex];
    }

    //payReferral
    function _payRewardsETH(address _referrer, address _referee, uint256 _value) private {}
    function _payRewardsInToken(address _referrer, address _referee, uint256 _value) private {}

    //registerInETH
    //registerInToken

    //getContractDefaults
    //getUserAccountMap
    //getUserReferrerAddress
    //getUserRefereeAddress
    //getUserTeamAddress
    //getUserTotalBusiness
    //getUserRewards
    //getUserLimits

    //transferETHAdmin
    //transferTokenAdmin

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
