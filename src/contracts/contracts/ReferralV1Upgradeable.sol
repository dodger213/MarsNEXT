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

interface IUniswapRouter {
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB, uint256 liquidity);
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
    bool isStable;
    address aggregatorAddress;
    bool isEnaled;
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

    function getLevelRates() external view returns (uint16[] memory);

    function getLevelDecimals() external view returns (uint16);

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

    function getPlanById(
        uint8 _planId
    ) external view returns (PlanStruct memory);

    function getAdminAddress() external view returns (address);

    function isTokenSupported(
        address _tokenContractAddress
    ) external view returns (bool);

    function getSupportedTokenInfo(
        address _tokenContractAddress
    ) external view returns (SupportedTokensStruct memory);

    function isIBP(address _ibpAddress) external view returns (bool);

    function getRewardTokenContract() external view returns (address);

    function getRewardTokenRate() external view returns (uint8);

    function getPresaleContract() external view returns (address);

    function getStakingContract() external view returns (address);

    function getUniSwapRouterV2Address() external view returns (address);
}

interface IStaking {
    function stake(address _userAddress, uint256 _value) external;
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

    event IBPRewardsNotPaid(address ibpAddress, string reason);

    event CoreMembersRewardPaid(address coreMembersContract, uint256 value);

    bool private _registerRandom;

    receive() external payable {}

    function initialize() public initializer {
        _variableContractAddress = 0x494549e00FE6598E3DC93254c5377c406dDA8579;
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
        AccountStruct memory firstReferrerAccount = accounts[_referee];

        require(
            firstReferrerAccount.referrerAddress != _referee,
            "Referrer Upline Cannot be referrer downline."
        );

        require(
            _referee != _referrer,
            "Referrer & User address cannot be same."
        );

        if (!_hasReferrer(userAccount)) {
            if (_referrer == address(0)) {
                emit ReferrerNotAdded(
                    _referrer,
                    _referee,
                    "Zero address cannot be referrer. Setting default referrer."
                );

                if (!_registerRandom) {
                    address defaultReferrer = variablesContractInterface
                        .getAdminAddress();
                    userAccount.referrerAddress = defaultReferrer;
                    emit ReferrerAdded(defaultReferrer, _referee);
                } else {
                    address randomAddress = _getRandomGlobalAddress();
                    userAccount.referrerAddress = randomAddress;
                    emit ReferrerAdded(randomAddress, _referee);
                }

                _registerRandom = !_registerRandom;
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
                                .getAdminAddress();
                            userAccount.ibpAddress = defaultIBP;
                            referrerAccount.ibpAddress = defaultIBP;

                            emit IBPAdded(
                                defaultIBP,
                                referrerAccount.selfAddress
                            );
                            emit IBPAdded(defaultIBP, userAccount.selfAddress);
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
        AccountStruct storage userAccount,
        uint256 _value
    ) private returns (uint256 _valueUpdated) {
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
        require(
            planAccount.value > 0,
            "Value is zero. Please select correct plan."
        );
        SupportedTokensStruct memory tokenAccount = variablesInterface
            .getSupportedTokenInfo(_tokenAddress);

        require(tokenAccount.isEnaled, "Token is not supported");
        IERC20Upgradeable ierc20Interface = IERC20Upgradeable(_tokenAddress);

        uint16[] memory _levelRates = variablesInterface.getLevelRates();

        ierc20Interface.transferFrom(
            _referee,
            address(this),
            tokenAccount.decimals < 18
                ? _convertToDecimals(
                    planAccount.value,
                    18,
                    tokenAccount.decimals
                )
                : planAccount.value
        );

        AccountStruct storage userAccount = accounts[_referee];

        uint256 rewardTokenBalanceThis = IERC20Upgradeable(
            variablesInterface.getRewardTokenContract()
        ).balanceOf(address(this));

        if (
            rewardTokenBalanceThis > planAccount.value &&
            userAccount.selfBusiness == 0
        ) {
            uint256 stakingValue = planAccount.value / 2;
            IStaking(variablesInterface.getStakingContract()).stake(
                _referee,
                stakingValue
            );

            IERC20Upgradeable(variablesInterface.getRewardTokenContract())
                .transfer(
                    variablesInterface.getStakingContract(),
                    planAccount.value
                );
        }

        if (userAccount.userId == 0) {
            _totalUsers++;
            userAccount.userId = _totalUsers;
            idToAddress[userAccount.userId] = _referee;
        }

        userAccount.selfAddress = _referee;
        userAccount.selfBusiness += planAccount.value;
        userAccount.maxLimit +=
            planAccount.value *
            planAccount.maxLimitMultiplier;

        // if (
        //     keccak256(abi.encodePacked(planAccount.name)) ==
        //     keccak256(abi.encodePacked("IBP")) &&
        //     userAccount.ibpAddress != userAccount.selfAddress
        // ) {
        //     userAccount.ibpAddress = userAccount.selfAddress;
        // }

        if (!_hasReferrer(userAccount)) {
            _addReferrer(
                _referrer,
                _referee,
                uint8(_levelRates.length),
                variablesInterface
            );
        }

        emit Registration(
            userAccount.selfAddress,
            userAccount.userId,
            _planId,
            userAccount.referrerAddress
        );

        address globalAddress = _getRandomGlobalAddress();

        if (globalAddress != address(0)) {
            AccountStruct storage globalAddressAccount = accounts[
                globalAddress
            ];

            uint256 globalRewardValue = _updateCurrentLimit(
                globalAddressAccount,
                (planAccount.value * 10) / 100
            );

            if (globalRewardValue > 0) {
                ierc20Interface.transfer(
                    globalAddress,
                    tokenAccount.decimals < 18
                        ? _convertToDecimals(
                            globalRewardValue,
                            18,
                            tokenAccount.decimals
                        )
                        : globalRewardValue
                );

                globalAddressAccount.globalRewards += globalRewardValue;

                emit GlobalRewardsPaid(
                    globalAddress,
                    _referee,
                    planAccount.value,
                    globalRewardValue,
                    10,
                    100
                );

                _totalGlobalRewardsPaid += globalRewardValue;
            }
        }

        if (userAccount.ibpAddress != address(0)) {
            AccountStruct storage ibpAccount = accounts[userAccount.ibpAddress];
            uint256 ibpRewardValue = (planAccount.value * 5) / 100;
            uint256 updatedIbpRewardValue = _updateCurrentLimit(
                ibpAccount,
                ibpRewardValue
            );

            if (updatedIbpRewardValue > 0) {
                ibpAccount.ibpRewards += updatedIbpRewardValue;

                ierc20Interface.transfer(
                    userAccount.ibpAddress,
                    tokenAccount.decimals < 18
                        ? _convertToDecimals(
                            updatedIbpRewardValue,
                            18,
                            tokenAccount.decimals
                        )
                        : updatedIbpRewardValue
                );

                emit IBPRewardsPaid(
                    userAccount.ibpAddress,
                    userAccount.selfAddress,
                    planAccount.value,
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

            if (i == 0) {
                referrerAccount.directBusiness += planAccount.value;

                if (referrerAccount.isGlobal) {
                    _globalAddresses.push(userAccount.referrerAddress);
                    referrerAccount.globalIndexes.push(
                        uint32(_globalAddresses.length - 1)
                    );
                }

                referrerAccount.isGlobal = !referrerAccount.isGlobal;
            }

            referrerAccount.teamBusiness += planAccount.value;

            uint256 updatedReferralRewardValue = _updateCurrentLimit(
                referrerAccount,
                (planAccount.value * _levelRates[i]) / 10000
            );

            if (updatedReferralRewardValue > 0) {
                referrerAccount.referralRewards += updatedReferralRewardValue;

                ierc20Interface.transfer(
                    userAccount.referrerAddress,
                    tokenAccount.decimals < 18
                        ? _convertToDecimals(
                            updatedReferralRewardValue,
                            18,
                            tokenAccount.decimals
                        )
                        : updatedReferralRewardValue
                );

                totalReferralRewardsPaid += updatedReferralRewardValue;

                emit ReferralRewardsPaid(
                    userAccount.referrerAddress,
                    userAccount.selfAddress,
                    planAccount.value,
                    updatedReferralRewardValue,
                    _levelRates[i],
                    10000,
                    i + 1
                );
            }

            userAccount = referrerAccount;
        }

        _totalReferralPaid += totalReferralRewardsPaid;
        _totalRegistrationValue += planAccount.value;
        _WeeklyRewardValue += (planAccount.value * 10) / 100;

        uint256 coreMembersReward = (planAccount.value * 5) / 100;

        ierc20Interface.transfer(
            variablesInterface.getCoreMembersContractAddress(),
            tokenAccount.decimals < 18
                ? _convertToDecimals(
                    coreMembersReward,
                    18,
                    tokenAccount.decimals
                )
                : coreMembersReward
        );

        _totalCoreMembershipRewardPaid += coreMembersReward;

        emit CoreMembersRewardPaid(
            variablesInterface.getCoreMembersContractAddress(),
            tokenAccount.decimals < 18
                ? _convertToDecimals(
                    coreMembersReward,
                    18,
                    tokenAccount.decimals
                )
                : tokenAccount.decimals
        );
    }

    //registerInToken
    function registrationWithToken(
        address _referrer,
        uint8 _planId,
        address _tokenAddress
    ) external {
        address _msgSender = msg.sender;
        _registration(_referrer, _msgSender, _planId, _tokenAddress);
    }

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
    function getWeeklyRewardToBeDistributed()
        external
        view
        returns (uint256 _rewardValue, uint256 _remianingTime)
    {
        _rewardValue = _WeeklyRewardValue;
        uint256 weeklyCounterEndTime = _weeklyRewardClaimedTimeStamp + 7 days;
        uint256 _currentTime = block.timestamp;
        if (weeklyCounterEndTime > _currentTime) {
            _remianingTime = weeklyCounterEndTime - _currentTime;
        }
    }

    function distributeWeeklyReward(address _tokenAddress) external {
        uint256 weeklyCounterEndTime = _weeklyRewardClaimedTimeStamp + 7 days;
        uint256 _currentTime = block.timestamp;
        require(
            _currentTime >= weeklyCounterEndTime,
            "Weekly time is not over yet."
        );
        address globalAddress = _getRandomGlobalAddress();
        AccountStruct storage globalAddressAccount = accounts[globalAddress];

        // uint256 weeklyRewardValue = _WeeklyRewardValue;

        IVariables variablesInterface = IVariables(_variableContractAddress);
        SupportedTokensStruct memory tokenAccount = variablesInterface
            .getSupportedTokenInfo(_tokenAddress);

        uint256 weeklyRewardValue = _updateCurrentLimit(
            globalAddressAccount,
            _WeeklyRewardValue
        );

        if (weeklyRewardValue > 0) {
            globalAddressAccount.weeklyRewards += weeklyRewardValue;

            IERC20Upgradeable(_tokenAddress).transfer(
                globalAddress,
                tokenAccount.decimals < 18
                    ? _convertToDecimals(
                        weeklyRewardValue,
                        18,
                        tokenAccount.decimals
                    )
                    : weeklyRewardValue
            );

            _WeeklyRewardValue -= weeklyRewardValue;
            _weeklyRewardClaimedTimeStamp = block.timestamp;
            _totalWeeklyRewardsPaid += weeklyRewardValue;
            emit WeeklyRewardsPaid(globalAddress, weeklyRewardValue);
        }
    }

    // function createLiquidity() external {}

    // function updateWeeklyRewardValue(
    //     uint256 _valueInDecimals
    // ) external onlyOwner {
    //     _totalWeeklyRewardsPaid = _valueInDecimals * 10 ** 18;
    // }

    //getUserAccountMap
    function getUserAccount(
        address _userAddress
    ) external view returns (AccountStruct memory) {
        return accounts[_userAddress];
    }

    //getUserTeamAddress
    function getUserTeam(
        address _userAddress
    )
        external
        view
        returns (
            address referrer,
            address[] memory referees,
            uint256 refereeCount,
            address[] memory team,
            uint32[] memory teamLevels,
            uint256 teamCount
        )
    {
        AccountStruct memory userAccount = accounts[_userAddress];
        referrer = userAccount.referrerAddress;
        referees = userAccount.refereeAddresses;
        refereeCount = userAccount.refereeAddresses.length;
        team = userAccount.teamAddress;
        teamLevels = userAccount.teamLevels;
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

    function isUserInGlobalList(
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
            uint256 limitRemaingvalue
        )
    {
        AccountStruct memory userAccount = accounts[_userAddress];

        maxLimit = userAccount.maxLimit;
        currentLimit = userAccount.currentLimit;
        limitRemaingvalue = userAccount.maxLimit - userAccount.currentLimit;
    }

    //ibp functions
    function getUserIbpAddress(
        address _userAddress
    ) external view returns (address) {
        return accounts[_userAddress].ibpAddress;
    }

    function addIbpToAddressAdmin(
        address _userAddress,
        address _ibpAddress,
        uint256 _maxLimitInDecimals
    ) external onlyOwner {
        accounts[_userAddress].ibpAddress = _ibpAddress;
        accounts[_userAddress].maxLimit += _maxLimitInDecimals * 10 ** 18;
        emit IBPAdded(_ibpAddress, _userAddress);
    }

    // function removeIbpFromAddressAdmin(
    //     address _userAddress
    // ) external onlyOwner {
    //     accounts[_userAddress].ibpAddress = IVariables(_variableContractAddress)
    //         .getAdminAddress();

    //     emit IBPAdded(
    //         IVariables(_variableContractAddress).getAdminAddress(),
    //         _userAddress
    //     );
    // }

    function _removeReferee(
        AccountStruct storage _referrerAccount,
        address _refereeAddress
    ) private {
        if (_referrerAccount.selfAddress != address(0)) {
            uint256 referrerRefereeCount = _referrerAccount
                .refereeAddresses
                .length;

            for (uint256 i; i < referrerRefereeCount; i++) {
                if (_referrerAccount.refereeAddresses[i] == _refereeAddress) {
                    _referrerAccount.refereeAddresses[i] = _referrerAccount
                        .refereeAddresses[
                            _referrerAccount.refereeAddresses.length - 1
                        ];
                    _referrerAccount.refereeAddresses.pop();
                }

                if (
                    _referrerAccount.refereeAddresses.length == 0 ||
                    i == _referrerAccount.refereeAddresses.length - 1
                ) {
                    break;
                }
            }
        }
    }

    function removeRefereeAdmin(address _refereeAddress) external onlyOwner {
        AccountStruct storage refereeAccount = accounts[_refereeAddress];

        AccountStruct storage prevReferrerAccount = accounts[
            refereeAccount.referrerAddress
        ];

        _removeReferee(prevReferrerAccount, _refereeAddress);
    }

    function _removeTeamAddress(
        AccountStruct storage _referrerAccount,
        address _teamAddress
    ) private {
        if (_referrerAccount.selfAddress != address(0)) {
            uint256 referrerTeamCount = _referrerAccount.teamAddress.length;

            for (uint256 i; i < referrerTeamCount; i++) {
                if (_referrerAccount.refereeAddresses[i] == _teamAddress) {
                    _referrerAccount.teamAddress[i] = _referrerAccount
                        .teamAddress[_referrerAccount.teamAddress.length - 1];
                    _referrerAccount.teamAddress.pop();
                }

                if (
                    _referrerAccount.teamAddress.length == 0 ||
                    i == (_referrerAccount.teamAddress.length - 1)
                ) {
                    break;
                }
            }
        }
    }

    function removeTeamAddress(address _userAddress, address _teamAddress) external onlyOwner {
        IVariables variablesInterface = IVariables(_variableContractAddress);
        uint16[] memory _levelRates = variablesInterface.getLevelRates();
        AccountStruct storage refereeAccount = accounts[_teamAddress];

        AccountStruct storage prevReferrerAccount = accounts[
            refereeAccount.referrerAddress
        ];

        for (uint16 i; i < _levelRates.length; i++) {
            _removeTeamAddress(prevReferrerAccount, _teamAddress);
        }
    }

    function changeReferrer(
        address _referrer,
        address _user
    ) external onlyOwner {
        IVariables variablesInterface = IVariables(_variableContractAddress);
        AccountStruct storage userAccount = accounts[_user];

        uint16[] memory _levelRates = variablesInterface.getLevelRates();

        userAccount.referrerAddress = address(0);

        _addReferrer(
            _referrer,
            _user,
            uint8(_levelRates.length),
            variablesInterface
        );
    }

    function getVariablesContract() external view returns (address) {
        return _variableContractAddress;
    }

    // function setVariablesContract(address _contractAddress) external onlyOwner {
    //     _variableContractAddress = _contractAddress;
    // }

    // function pushAddressToGlobal(address _userAddress) external onlyOwner {
    //     accounts[_userAddress].isGlobal = true;
    //     accounts[_userAddress].globalIndexes.push(
    //         uint32(_globalAddresses.length - 1)
    //     );
    //     _globalAddresses.push(_userAddress);
    // }

    //convertToDecimals
    function _convertToDecimals(
        uint256 _value,
        uint256 _from,
        uint256 _to
    ) private pure returns (uint256) {
        return (_value * 10 ** uint256(_to)) / 10 ** uint256(_from);
    }

    // function _transferToken(
    //     address _tokenContractAddress,
    //     address _to,
    //     uint256 _value
    // ) private {
    //     IERC20Upgradeable(_tokenContractAddress).transfer(_to, _value);
    // }

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
