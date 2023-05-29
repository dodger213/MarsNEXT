// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

interface IERC20_EXTENDED {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);
}

struct PlanStruct {
    uint8 planId;
    string name;
    uint256 value;
    uint256 maxLimitMultiplier;
}

struct SupportedTokensStruct {
    address contractAddress;
    string name;
    string symbol;
    uint8 decimals;
    address aggregatorAddress;
    bool isEbaled;
}

struct AccountStruct {
    uint32 userId;
    address selfAddress;
    address ibpAddress;
    address referrerAddress;
    address[] refereeAddresses;
    address[] teamAddress;
    uint32[] teamLevels;
    uint256 selfBusiness;
    uint256 directBusiness;
    uint256 teamBusiness;
    uint256 maxLimit;
    uint256 currentLimit;
    uint256 referralRewards;
    uint256 globalRewards;
    uint256 weeklyRewards;
    uint256 ibpRewards;
    bool isGlobal;
    uint32[] globalIndexes;
}

interface IVariables {
    function getCoreMembersContractAddress() external view returns (address);

    function getAdminContractAddress() external view returns (address);

    function getLevelRates() external view returns (uint16[] memory);

    function getLevelDecimals() external view returns (uint16);

    function getBaseCurrencyDecimals() external view returns (uint8);

    function getValueBufferRate() external view returns (uint8);

    function getGlobalRewardRate() external view returns (uint8);

    function getWeeklyRewardRate() external view returns (uint8);

    function getIbpRewardRate() external view returns (uint8);

    function getCoreMemberRewardRate() external view returns (uint8);

    function getIsPayReferralRewards() external view returns (bool);

    function getIsPayGlobalRewards() external view returns (bool);

    function getIsPayWeeklyRewards() external view returns (bool);

    function getIsPayIbpRewards() external view returns (bool);

    function getIsPayCoreMembersRewards() external view returns (bool);

    function getAdminFees() external view returns (uint8);

    function getUsdtContractAddress() external view returns (address);

    function getBusdContractAddress() external view returns (address);

    function getPlanById(
        uint8 _planId
    ) external view returns (PlanStruct memory);

    function getDefaultReferrer() external view returns (address);

    function getDefaultIBP() external view returns (address);

    function getAdminAddress() external view returns (address);

    function isTokenSupported(
        address _tokenContractAddress
    ) external view returns (bool);

    function getSupportedTokenInfo(
        address _tokenContractAddress
    ) external view returns (SupportedTokensStruct memory);
}

contract ReferralV1Upgradeable is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    address private _variableContractAddress;
    address[] private _globalAddresses;

    uint32 private _totalUsers;

    uint256 private _totalRegistrationValue;
    uint256 private _WeeklyRewardValue;
    uint256 private _weeklyRewardClaimedTimeStamp;

    uint256 private _totalReferralPaid;
    uint256 private _totalGlobalRewardsPaid;
    uint256 private _totalWeeklyRewardsPaid;
    uint256 private _totalCoreMembershipRewardPaid;
    uint256 private _totalIBPRewardsPaid;

    mapping(address => AccountStruct) private accounts;
    mapping(uint32 => address) private idToAddress;

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

    event TeamAddressAdded(
        address parentAddress,
        address referrerAddress,
        address refereeAddress,
        uint32 level
    );
    event ReferralRewardsPaid(
        address referrerAddress,
        address userAddress,
        uint256 value,
        uint256 rewardValue,
        uint256 rewardRate,
        uint256 rewardRateDecimals,
        uint32 level
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
    event WeeklyRewardsPaid(address globalAddress, uint256 rewardValue);

    event NoRewardsPaid(address userAddress, string reason);

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
        _weeklyRewardClaimedTimeStamp = block.timestamp;

        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _hasReferrer(
        AccountStruct memory userAccount
    ) private pure returns (bool hasReferrer) {
        if (userAccount.referrerAddress != address(0)) {
            hasReferrer = true;
        }
    }

    //addReferrer
    function _addReferrer(
        address _referrer,
        address _referee,
        uint8 _levelLength,
        IVariables variablesContractInterface
    ) private {
        AccountStruct storage userAccount = accounts[_referee];
        if (
            !_hasReferrer(userAccount) &&
            _referee != variablesContractInterface.getDefaultReferrer()
        ) {
            if (_referrer == address(0)) {
                emit ReferrerNotAdded(
                    _referrer,
                    _referee,
                    "Zero address cannot be referrer. Setting default referrer."
                );

                address defaultReferrer = variablesContractInterface
                    .getDefaultReferrer();
                userAccount.referrerAddress = defaultReferrer;

                emit ReferrerAdded(defaultReferrer, _referee);
            } else {
                userAccount.referrerAddress = _referrer;
                emit ReferrerAdded(_referrer, _referee);
            }

            for (uint8 i; i < _levelLength; i++) {
                if (userAccount.referrerAddress == address(0)) {
                    break;
                }

                AccountStruct storage referrerAccount = accounts[
                    userAccount.referrerAddress
                ];

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

                            address defaultIBP = variablesContractInterface
                                .getDefaultIBP();
                            userAccount.ibpAddress = defaultIBP;
                            referrerAccount.ibpAddress = defaultIBP;

                            emit IBPAdded(defaultIBP, _referrer);
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

    function _isMaxLimitReached(
        AccountStruct memory userAccount
    ) private pure returns (bool isLimitReached) {
        if (userAccount.currentLimit >= userAccount.maxLimit) {
            isLimitReached = true;
        }
    }

    function _updateCurrentLimit(
        AccountStruct memory userAccount,
        uint256 _value
    ) private pure returns (uint256 _valueUpdated) {
        if (userAccount.currentLimit + _value <= userAccount.maxLimit) {
            _valueUpdated = _value;
            userAccount.currentLimit += _value;
        } else {
            _valueUpdated = userAccount.maxLimit - userAccount.currentLimit;
            userAccount.currentLimit = _valueUpdated;
        }
    }

    //payReferral
    function _registration(
        address _referrer,
        address _referee,
        uint8 _planId,
        address _tokenAddress
    ) private {
        IVariables variablesInterface = IVariables(_variableContractAddress);
        PlanStruct memory planAccount = variablesInterface.getPlanById(_planId);
        SupportedTokensStruct memory tokenAccount = variablesInterface
            .getSupportedTokenInfo(_tokenAddress);

        require(tokenAccount.isEbaled, "Token is not supported or disabled");

        uint16[] memory _levelRates = variablesInterface.getLevelRates();

        IERC20Upgradeable(_tokenAddress).transferFrom(
            _referee,
            address(this),
            _convertToDecimals(planAccount.value, 18, tokenAccount.decimals)
        );

        AccountStruct storage userAccount = accounts[_referee];
        uint256 _value = planAccount.value;

        if (!_hasReferrer(userAccount)) {
            _addReferrer(
                _referrer,
                _referee,
                uint8(_levelRates.length),
                variablesInterface
            );
        }

        if (userAccount.userId == 0) {
            _totalUsers++;
            userAccount.userId = _totalUsers;
            idToAddress[userAccount.userId] = _referee;
        }

        userAccount.selfAddress = _referee;
        userAccount.selfBusiness += _value;
        userAccount.maxLimit += _value * planAccount.maxLimitMultiplier;

        if (_globalAddresses.length > 0) {
            address globalAddress = _getRandomGlobalAddress();

            if (globalAddress != address(0)) {
                AccountStruct storage globalAddressAccount = accounts[
                    globalAddress
                ];

                uint256 globalRewardValue = (_value * 10) / 100;

                globalAddressAccount.globalRewards += globalRewardValue;
                globalAddressAccount.currentLimit += globalRewardValue;

                _transferToken(
                    tokenAccount.contractAddress,
                    globalAddress,
                    _convertToDecimals(
                        globalRewardValue,
                        18,
                        tokenAccount.decimals
                    )
                );

                emit GlobalRewardsPaid(
                    globalAddress,
                    _referee,
                    _value,
                    globalRewardValue,
                    10,
                    100
                );

                _totalGlobalRewardsPaid += globalRewardValue;
            }
        }

        if (
            userAccount.ibpAddress != address(0) &&
            userAccount.ibpAddress != userAccount.selfAddress &&
            userAccount.ibpAddress != variablesInterface.getDefaultIBP()
        ) {
            AccountStruct storage ibpAccount = accounts[userAccount.ibpAddress];

            if (!_isMaxLimitReached(ibpAccount)) {
                uint256 ibpRewardValue = (_value *
                    variablesInterface.getIbpRewardRate()) / 100;

                uint256 updatedIbpRewardValue = _updateCurrentLimit(
                    ibpAccount,
                    ibpRewardValue
                );

                ibpAccount.ibpRewards += updatedIbpRewardValue;
                ibpAccount.currentLimit += updatedIbpRewardValue;

                _transferToken(
                    tokenAccount.contractAddress,
                    userAccount.ibpAddress,
                    _convertToDecimals(
                        updatedIbpRewardValue,
                        18,
                        tokenAccount.decimals
                    )
                );

                emit IBPRewardsPaid(
                    userAccount.ibpAddress,
                    userAccount.selfAddress,
                    _value,
                    updatedIbpRewardValue,
                    variablesInterface.getIbpRewardRate(),
                    100
                );

                _totalIBPRewardsPaid += ibpRewardValue;
            }
        }

        uint256 totalReferralRewardsPaid;

        for (uint8 i; i < _levelRates.length; i++) {
            if (!_hasReferrer(userAccount)) {
                break;
            }

            AccountStruct storage referrerAccount = accounts[
                userAccount.referrerAddress
            ];

            if (_isMaxLimitReached(referrerAccount)) {
                emit NoRewardsPaid(
                    userAccount.referrerAddress,
                    "Max Limit Reached"
                );

                userAccount = referrerAccount;

                continue;
            }

            if (i == 0) {
                referrerAccount.directBusiness += _value;

                if (referrerAccount.isGlobal) {
                    _globalAddresses.push(userAccount.referrerAddress);
                    referrerAccount.globalIndexes.push(
                        uint32(_globalAddresses.length - 1)
                    );
                }

                referrerAccount.isGlobal = !referrerAccount.isGlobal;
            }

            referrerAccount.teamBusiness += _value;

            uint256 referralRewardValue = (_value * _levelRates[i]) / 10000;

            uint256 updatedReferralRewardValue = _updateCurrentLimit(
                referrerAccount,
                referralRewardValue
            );

            referrerAccount.referralRewards += updatedReferralRewardValue;

            _transferToken(
                tokenAccount.contractAddress,
                userAccount.referrerAddress,
                _convertToDecimals(
                    updatedReferralRewardValue,
                    18,
                    tokenAccount.decimals
                )
            );

            totalReferralRewardsPaid += updatedReferralRewardValue;

            emit ReferralRewardsPaid(
                userAccount.referrerAddress,
                userAccount.selfAddress,
                _value,
                updatedReferralRewardValue,
                _levelRates[i],
                10000,
                i + 1
            );

            userAccount = referrerAccount;
        }

        _totalReferralPaid += totalReferralRewardsPaid;
        _totalRegistrationValue += _value;
        _WeeklyRewardValue += (_value * 10) / 100;

        uint256 contractTokenBalance = IERC20Upgradeable(
            tokenAccount.contractAddress
        ).balanceOf(address(this));

        _transferToken(
            tokenAccount.contractAddress,
            variablesInterface.getAdminAddress(),
            _convertToDecimals(
                contractTokenBalance -
                    _convertToDecimals(
                        _WeeklyRewardValue,
                        18,
                        tokenAccount.decimals
                    ),
                18,
                tokenAccount.decimals
            )
        );
    }

    //registerInETH
    function registrationWithETH(
        address _referrer,
        uint8 _planId,
        address _tokenAddress
    ) external payable {}

    //registerInToken
    function registrationWithToken(
        address _referrer,
        uint8 _planId,
        address _tokenAddress
    ) external {
        address _msgSender = msg.sender;
        _registration(_referrer, _msgSender, _planId, _tokenAddress);
    }

    //registrations stats
    function getRegistrationsStats()
        external
        view
        returns (
            uint32 totalUser,
            uint256 totalRegistrationValue,
            uint256 totalReferralPaid,
            uint256 totalGlobalRewardsPaid,
            uint256 totalWeeklyRewardsPaid,
            uint256 totalCoreMembershipRewardPaid,
            uint256 totalIbpRewardsPaid
        )
    {
        totalUser = _totalUsers;
        totalRegistrationValue = _totalRegistrationValue;
        totalReferralPaid = _totalReferralPaid;
        totalGlobalRewardsPaid = _totalGlobalRewardsPaid;
        totalWeeklyRewardsPaid = _totalWeeklyRewardsPaid;
        totalCoreMembershipRewardPaid = _totalCoreMembershipRewardPaid;
        totalIbpRewardsPaid = _totalIBPRewardsPaid;
    }

    //Weekly Rewards Function
    function getWeeklyRewardToBeDistributed() external view returns (uint256) {
        return _WeeklyRewardValue;
    }

    function getWeeklyRewardsRemainTime() external view returns (uint256) {
        uint256 weeklyCounterEndTime = _weeklyRewardClaimedTimeStamp + 7 days;
        uint256 _currentTime = block.timestamp;
        if (_currentTime >= weeklyCounterEndTime) {
            return 0;
        }

        return weeklyCounterEndTime - _currentTime;
    }

    function distributeWeeklyReward() external returns (address) {
        uint256 weeklyCounterEndTime = _weeklyRewardClaimedTimeStamp + 7 days;
        uint256 _currentTime = block.timestamp;
        require(
            _currentTime >= weeklyCounterEndTime,
            "Weekly time is not over yet."
        );
        address globalAddress = _getRandomGlobalAddress();

        address usdtContractAddress = IVariables(_variableContractAddress)
            .getUsdtContractAddress();
        uint256 usdtBalanceOfThisContract = IERC20Upgradeable(
            usdtContractAddress
        ).balanceOf(address(this));
        uint256 weeklyRewardValue = _WeeklyRewardValue;

        require(
            usdtBalanceOfThisContract >= weeklyRewardValue,
            "Contract has insufficient balance to distribute reward."
        );

        IERC20Upgradeable(usdtContractAddress).transfer(
            globalAddress,
            weeklyRewardValue
        );
        _WeeklyRewardValue = 0;

        emit WeeklyRewardsPaid(globalAddress, weeklyRewardValue);

        return globalAddress;
    }

    //getUserAccountMap
    function getUserAccount(
        address _userAddress
    ) external view returns (AccountStruct memory) {
        return accounts[_userAddress];
    }

    //getUserReferrerAddress
    function getUserReferrer(
        address _userAddress
    ) external view returns (address) {
        return accounts[_userAddress].referrerAddress;
    }

    //getUserRefereeAddress
    function getUserReferee(
        address _userAddress
    ) external view returns (address[] memory referees, uint256 refereeCount) {
        AccountStruct memory userAccount = accounts[_userAddress];
        referees = userAccount.refereeAddresses;
        refereeCount = userAccount.refereeAddresses.length;
    }

    //getUserTeamAddress
    function getUserTeam(
        address _userAddress
    ) external view returns (address[] memory team, uint256 teamCount) {
        AccountStruct memory userAccount = accounts[_userAddress];
        team = userAccount.teamAddress;
        teamCount = userAccount.teamAddress.length;
    }

    //getUserTotalBusiness
    function getUserBusiness(
        address _userAddress
    )
        external
        view
        returns (
            uint256 selfBusiness,
            uint256 directBusiness,
            uint256 teamBusiness,
            uint256 totalBusiness
        )
    {
        AccountStruct memory userAccount = accounts[_userAddress];
        selfBusiness = userAccount.selfBusiness;
        directBusiness = userAccount.directBusiness;
        teamBusiness = userAccount.teamBusiness;
        totalBusiness = userAccount.teamBusiness + userAccount.selfBusiness;
    }

    //getUserRewards
    function getUserRewards(
        address _userAddress
    )
        external
        view
        returns (
            uint256 referralReward,
            uint256 globalReward,
            uint256 weeklyReward,
            uint256 ibpReward,
            uint256 totalIncome
        )
    {
        AccountStruct memory userAccount = accounts[_userAddress];
        referralReward = userAccount.referralRewards;
        globalReward = userAccount.globalRewards;
        weeklyReward = userAccount.weeklyRewards;
        ibpReward = userAccount.ibpRewards;
        totalIncome = userAccount.currentLimit;
    }

    function isuserInGlobalList(
        address _userAddress
    )
        external
        view
        returns (bool isInList, uint32[] memory indexes, uint256 totalGlobalIds)
    {
        AccountStruct memory userAccount = accounts[_userAddress];

        if (userAccount.globalIndexes.length > 0) {
            isInList = true;
        }

        indexes = userAccount.globalIndexes;
        totalGlobalIds = userAccount.globalIndexes.length;
    }

    //getUserLimits
    function getUserLimit(
        address _userAddress
    )
        external
        view
        returns (
            uint256 maxLimit,
            uint256 currentLimit,
            uint256 limitRemaingvalue,
            uint256 limitRemainingPer
        )
    {
        AccountStruct memory userAccount = accounts[_userAddress];

        maxLimit = userAccount.maxLimit;
        currentLimit = userAccount.currentLimit;
        limitRemaingvalue = userAccount.maxLimit - userAccount.currentLimit;
        limitRemainingPer =
            (userAccount.currentLimit / userAccount.maxLimit) *
            100;
    }

    //ibp functions
    function getuserIbpAddress(
        address _userAddress
    ) external view returns (address) {
        return accounts[_userAddress].ibpAddress;
    }

    function addIbpToAddressAdmin(
        address _userAddress,
        address _ibpAddress
    ) external onlyOwner {
        accounts[_userAddress].ibpAddress = _ibpAddress;
        emit IBPAdded(_ibpAddress, _userAddress);
    }

    function removeIbpFromAddressAdmin(
        address _userAddress
    ) external onlyOwner {
        accounts[_userAddress].ibpAddress = IVariables(_variableContractAddress)
            .getDefaultIBP();

        emit IBPAdded(
            IVariables(_variableContractAddress).getDefaultIBP(),
            _userAddress
        );
    }

    //convertToDecimals
    function _convertToDecimals(
        uint256 _value,
        uint8 _from,
        uint8 _to
    ) private pure returns (uint256) {
        return (_value / 10 ** _from) * 10 ** _to;
    }

    function _transferToken(
        address _tokenContractAddress,
        address _to,
        uint256 _value
    ) private {
        IERC20Upgradeable(_tokenContractAddress).transfer(_to, _value);
    }

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