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

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory);
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

    function getPlanById(
        uint8 _planId
    ) external view returns (PlanStruct memory);

    function getAdminAddress() external view returns (address);

    function isAdmin(address _userAddress) external view returns (bool);

    function getSupportedTokenInfo(
        address _tokenContractAddress
    ) external view returns (SupportedTokensStruct memory);

    function getRewardTokenContract() external view returns (address);

    function getStakingContract() external view returns (address);

    function getUniSwapRouterV2Address() external view returns (address);

    function getMaticUSDPriceOracle() external view returns (address);

    function getBonanzaContract() external view returns (address);
}

interface IStaking {
    function stake(address _userAddress, uint256 _value) external;
}

interface IChainlinkOracle {
    function latestAnswer() external view returns (uint256);

    function decimals() external view returns (uint256);
}

interface IBonanza {
    function setSelfBusines(address _userAddress, uint256 _valueInUSD) external;

    function setDirectBusines(
        address _userAddress,
        uint256 _valueInUSD
    ) external;

    function setTeamBusines(address _userAddress, uint256 _valueInUSD) external;
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
        uint256 rewardValue,
        uint32 level
    );

    event GlobalRewardsPaid(address globalAddress, uint256 rewardValue);

    event WeeklyRewardsPaid(address globalAddress, uint256 rewardValue);

    event NoRewardsPaid(address userAddress, string reason);

    event IBPRewardsPaid(address ibpAddress, uint256 rewardValue);

    event CoreMembersRewardPaid(address coreMembersContract, uint256 value);

    event DirectBusinessUpdated(address referrer, address user, uint256 value);
    event TeamBusinessUpdated(address referrer, address user, uint256 value);

    bool private _registerRandom;

    uint256 _WeeklyRewardValueNative;

    receive() external payable {}

    function initialize() public initializer {
        _variableContractAddress = 0x494549e00FE6598E3DC93254c5377c406dDA8579;
        _weeklyRewardClaimedTimeStamp = block.timestamp;

        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _buyFromUniswap(
        address _tokenInContract,
        uint256 _tokenInAmount,
        address _tokenOutContract,
        address _uniswapV2Router
    ) private returns (uint256[] memory) {
        address[] memory tokensContracts = new address[](2);
        tokensContracts[0] = _tokenInContract;
        tokensContracts[1] = _tokenOutContract;

        IERC20Upgradeable(_tokenInContract).approve(
            _uniswapV2Router,
            _tokenInAmount
        );

        uint[] memory amounts = IUniswapRouter(_uniswapV2Router)
            .swapExactTokensForTokens(
                _tokenInAmount,
                1,
                tokensContracts,
                address(this),
                block.timestamp + 100
            );

        return amounts;
    }

    function _hasReferrer(
        AccountStruct memory userAccount
    ) private pure returns (bool hasReferrer) {
        if (userAccount.referrerAddress != address(0)) {
            hasReferrer = true;
        }
    }

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
                if (referrerAccount.ibpAddress != address(0)) {
                    userAccount.ibpAddress = referrerAccount.ibpAddress;
                    emit IBPAdded(referrerAccount.ibpAddress, _referee);
                }

                referrerAccount.refereeAddresses.push(_referee);
            }

            referrerAccount.teamAddress.push(_referee);
            referrerAccount.teamLevels.push(i + 1);

            userAccount = referrerAccount;
        }
    }

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

    function getRandomGlobalAddress() external view returns (address) {
        return _getRandomGlobalAddress();
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
        if (userAccount.currentLimit + _value < userAccount.maxLimit) {
            _valueUpdated = _value;
            userAccount.currentLimit += _valueUpdated;
        } else if (userAccount.currentLimit + _value == userAccount.maxLimit) {
            _valueUpdated = _value;
            userAccount.currentLimit += _valueUpdated;
        } else {
            _valueUpdated = userAccount.maxLimit - userAccount.currentLimit;
            userAccount.currentLimit = userAccount.maxLimit;
        }
    }

    function _updateId(AccountStruct storage userAccount) private {
        if (userAccount.userId == 0) {
            _totalUsers++;
            userAccount.userId = _totalUsers;
            idToAddress[userAccount.userId] = userAccount.selfAddress;
        }
    }

    function _updateGlobalReward(
        address globalAddress,
        uint256 _valueInUSD
    ) private returns (uint256 globalRewardValue) {
        AccountStruct storage globalAddressAccount = accounts[globalAddress];
        globalRewardValue = _updateCurrentLimit(
            globalAddressAccount,
            (_valueInUSD * 10) / 100
        );

        if (globalRewardValue > 0) {
            globalAddressAccount.globalRewards += globalRewardValue;

            emit GlobalRewardsPaid(
                globalAddressAccount.selfAddress,
                globalRewardValue
            );

            _totalGlobalRewardsPaid += globalRewardValue;
        }
    }

    function _updateIbpReward(
        address _ibpAddress,
        uint256 _valueInUSD
    ) private returns (uint256 ibpReward) {
        AccountStruct storage ibpAccount = accounts[_ibpAddress];
        ibpReward = _updateCurrentLimit(ibpAccount, (_valueInUSD * 5) / 100);
        if (ibpReward > 0) {
            ibpAccount.ibpRewards += ibpReward;
            emit IBPRewardsPaid(_ibpAddress, ibpReward);
            _totalIBPRewardsPaid += ibpReward;
        }
    }

    // function _updateReferralReward(
    //     IVariables _varInt,
    //     AccountStruct storage _referrerAccount,
    //     uint256 _valueInUSD,
    //     uint16[] memory _levelRates,
    //     uint32 _i
    // ) private returns (uint256 referralRewardValue) {

    // }

    function _updateCoreMembersReward(
        uint256 _valueInUSD,
        address _coreMembersContract
    ) private returns (uint256 coreRewardValue) {
        coreRewardValue = (_valueInUSD * 5) / 100;
        _totalCoreMembershipRewardPaid += coreRewardValue;
        emit CoreMembersRewardPaid(_coreMembersContract, coreRewardValue);
    }

    function _getRewardToken(
        IVariables _varInt
    ) private view returns (address) {
        return _varInt.getRewardTokenContract();
    }

    function _getStakingContract(
        IVariables _varInt
    ) private view returns (address) {
        return _varInt.getStakingContract();
    }

    function _registration(
        address _referrer,
        address _referee,
        uint8 _planId,
        address _tokenAddress
    ) private {
        IVariables varInt = IVariables(_variableContractAddress);
        PlanStruct memory planS = varInt.getPlanById(_planId);

        require(planS.value > 0, "Value is zero. Please select correct plan.");
        SupportedTokensStruct memory tokenS = varInt.getSupportedTokenInfo(
            _tokenAddress
        );

        require(tokenS.isEnaled, "Token is not supported");
        IERC20Upgradeable iercInt = IERC20Upgradeable(_tokenAddress);

        uint16[] memory _levelRates = varInt.getLevelRates();

        iercInt.transferFrom(
            _referee,
            address(this),
            tokenS.decimals < 18
                ? _toTokenDecimals(planS.value, 18, tokenS.decimals)
                : planS.value
        );

        AccountStruct storage userAccount = accounts[_referee];

        uint256 rewardTokenBalanceThis = IERC20Upgradeable(
            _getRewardToken(varInt)
        ).balanceOf(address(this));

        if (
            rewardTokenBalanceThis > planS.value &&
            userAccount.selfBusiness == 0
        ) {
            uint256 stakingValue = planS.value / 2;
            IStaking(_getStakingContract(varInt)).stake(_referee, stakingValue);

            IERC20Upgradeable(_getRewardToken(varInt)).transfer(
                _getStakingContract(varInt),
                planS.value
            );
        }

        if (userAccount.selfAddress == address(0)) {
            userAccount.selfAddress = _referee;
        }
        userAccount.selfBusiness += planS.value;
        userAccount.maxLimit += planS.value * planS.maxLimitMultiplier;

        _updateId(userAccount);

        if (!_hasReferrer(userAccount)) {
            _addReferrer(
                _referrer,
                _referee,
                uint8(_levelRates.length),
                varInt
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
            uint256 globalRewardValue = _updateGlobalReward(
                globalAddress,
                planS.value
            );

            if (globalRewardValue > 0) {
                iercInt.transfer(
                    globalAddress,
                    tokenS.decimals < 18
                        ? _toTokenDecimals(
                            globalRewardValue,
                            18,
                            tokenS.decimals
                        )
                        : globalRewardValue
                );
            }
        }

        if (userAccount.ibpAddress != address(0)) {
            uint256 ibpRewardValue = _updateIbpReward(
                userAccount.ibpAddress,
                planS.value
            );

            if (ibpRewardValue > 0) {
                iercInt.transfer(
                    userAccount.ibpAddress,
                    tokenS.decimals < 18
                        ? _toTokenDecimals(ibpRewardValue, 18, tokenS.decimals)
                        : ibpRewardValue
                );
            }
        }

        uint256 totalReferralPaid;

        for (uint8 i; i < _levelRates.length; i++) {
            if (!_hasReferrer(userAccount)) {
                break;
            }

            AccountStruct storage referrerAccount = accounts[
                userAccount.referrerAddress
            ];

            if (i == 0) {
                referrerAccount.directBusiness += planS.value;

                if (
                    referrerAccount.isGlobal &&
                    referrerAccount.selfAddress != address(0) &&
                    referrerAccount.selfAddress != varInt.getAdminAddress()
                ) {
                    _globalAddresses.push(referrerAccount.selfAddress);
                    referrerAccount.globalIndexes.push(
                        uint32(_globalAddresses.length - 1)
                    );
                }

                referrerAccount.isGlobal = !referrerAccount.isGlobal;
            }

            referrerAccount.teamBusiness += planS.value;

            uint256 referralRewardValue = _updateCurrentLimit(
                referrerAccount,
                (planS.value * _levelRates[i]) / 10000
            );

            if (referralRewardValue > 0) {
                referrerAccount.referralRewards += referralRewardValue;
                emit ReferralRewardsPaid(
                    referrerAccount.selfAddress,
                    referralRewardValue,
                    i + 1
                );

                iercInt.transfer(
                    userAccount.referrerAddress,
                    tokenS.decimals < 18
                        ? _toTokenDecimals(
                            referralRewardValue,
                            18,
                            tokenS.decimals
                        )
                        : referralRewardValue
                );

                totalReferralPaid += referralRewardValue;
            }

            userAccount = referrerAccount;
        }

        _totalReferralPaid += totalReferralPaid;
        _totalRegistrationValue += planS.value;
        _WeeklyRewardValue += (planS.value * 10) / 100;

        uint256 coreMembersReward = (planS.value * 5) / 100;

        iercInt.transfer(
            varInt.getCoreMembersContractAddress(),
            tokenS.decimals < 18
                ? _toTokenDecimals(coreMembersReward, 18, tokenS.decimals)
                : coreMembersReward
        );

        _totalCoreMembershipRewardPaid += coreMembersReward;

        emit CoreMembersRewardPaid(
            varInt.getCoreMembersContractAddress(),
            tokenS.decimals < 18
                ? _toTokenDecimals(coreMembersReward, 18, tokenS.decimals)
                : tokenS.decimals
        );
    }

    // function _registrationWithNative(
    //     address _referrer,
    //     address _msgSender,
    //     uint8 _planId,
    //     uint256 _msgValue
    // ) private {
    //     IVariables varInt = IVariables(_variableContractAddress);
    //     PlanStruct memory planS = varInt.getPlanById(_planId);
    //     uint256 priceInUSD = _usdPrice(varInt.getMaticUSDPriceOracle());
    //     uint256 msgValueInUSD = _weiToUSD(_msgValue, priceInUSD);

    //     require(planS.value > 0, "Value is zero. Please select correct plan.");
    //     require(
    //         msgValueInUSD > planS.value - ((planS.value * 5) / 100),
    //         "Native value is less 5% of price."
    //     );

    //     uint16[] memory _levelRates = varInt.getLevelRates();

    //     AccountStruct storage userAccount = accounts[_msgSender];

    //     uint256 rewardTokenBalanceThis = IERC20Upgradeable(
    //         _getRewardToken(varInt)
    //     ).balanceOf(address(this));

    //     if (
    //         rewardTokenBalanceThis > msgValueInUSD &&
    //         userAccount.selfBusiness == 0
    //     ) {
    //         uint256 stakingValue = msgValueInUSD / 2;
    //         IStaking(_getStakingContract(varInt)).stake(
    //             _msgSender,
    //             stakingValue
    //         );

    //         IERC20Upgradeable(_getRewardToken(varInt)).transfer(
    //             _getStakingContract(varInt),
    //             msgValueInUSD
    //         );
    //     }

    //     if (userAccount.selfAddress == address(0)) {
    //         userAccount.selfAddress = _msgSender;
    //     }

    //     userAccount.selfBusiness += msgValueInUSD;
    //     userAccount.maxLimit += msgValueInUSD * planS.maxLimitMultiplier;

    //     _updateId(userAccount);

    //     if (!_hasReferrer(userAccount)) {
    //         _addReferrer(
    //             _referrer,
    //             _msgSender,
    //             uint8(_levelRates.length),
    //             varInt
    //         );
    //     }

    //     emit Registration(
    //         userAccount.selfAddress,
    //         userAccount.userId,
    //         _planId,
    //         userAccount.referrerAddress
    //     );

    //     address globalAddress = _getRandomGlobalAddress();

    //     if (globalAddress != address(0)) {
    //         uint256 globalRewardValueUSD = _updateGlobalReward(
    //             globalAddress,
    //             msgValueInUSD
    //         );

    //         if (globalRewardValueUSD > 0) {
    //             payable(globalAddress).transfer(
    //                 _usdToWei(globalRewardValueUSD, priceInUSD)
    //             );
    //         }
    //     }

    //     if (userAccount.ibpAddress != address(0)) {
    //         uint256 ibpRewardValueUSD = _updateIbpReward(
    //             userAccount.ibpAddress,
    //             msgValueInUSD
    //         );

    //         if (ibpRewardValueUSD > 0) {
    //             payable(userAccount.ibpAddress).transfer(
    //                 _usdToWei(ibpRewardValueUSD, priceInUSD)
    //             );
    //         }
    //     }

    //     uint256 totalReferralPaid;

    //     for (uint8 i; i < _levelRates.length; i++) {
    //         if (!_hasReferrer(userAccount)) {
    //             break;
    //         }

    //         AccountStruct storage referrerAccount = accounts[
    //             userAccount.referrerAddress
    //         ];

    //         uint256 referralValueUSD = _updateReferralReward(
    //             varInt,
    //             referrerAccount,
    //             msgValueInUSD,
    //             _levelRates,
    //             i
    //         );

    //         if (referralValueUSD > 0) {
    //             payable(userAccount.referrerAddress).transfer(
    //                 _usdToWei(referralValueUSD, priceInUSD)
    //             );
    //             totalReferralPaid += referralValueUSD;
    //         }

    //         userAccount = referrerAccount;
    //     }

    //     payable(varInt.getCoreMembersContractAddress()).transfer(
    //         (_msgValue * 5) / 100
    //     );

    //     _updateCoreMembersReward(
    //         msgValueInUSD,
    //         varInt.getCoreMembersContractAddress()
    //     );

    //     _totalReferralPaid += totalReferralPaid;
    //     _totalRegistrationValue += msgValueInUSD;
    //     _WeeklyRewardValueNative += (_msgValue * 10) / 100;
    // }

    function registrationWithToken(
        address _referrer,
        uint8 _planId,
        address _tokenAddress
    ) external {
        address _msgSender = msg.sender;
        _registration(_referrer, _msgSender, _planId, _tokenAddress);
    }

    // function registrationWithNative(
    //     address _referrer,
    //     uint8 _planId
    // ) external payable {
    //     _registrationWithNative(_referrer, msg.sender, _planId, msg.value);
    // }

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

    function getWeeklyRewardToBeDistributed()
        external
        view
        returns (uint256 _rewardValue, uint256 _remianingTime, uint256 _endTime)
    {
        _rewardValue = _WeeklyRewardValue;
        _endTime = _weeklyRewardClaimedTimeStamp + 7 days;
        uint256 _currentTime = block.timestamp;
        if (_endTime > _currentTime) {
            _remianingTime = _endTime - _currentTime;
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
                    ? _toTokenDecimals(
                        weeklyRewardValue,
                        18,
                        tokenAccount.decimals
                    )
                    : weeklyRewardValue
            );

            _WeeklyRewardValue = 0;
            _weeklyRewardClaimedTimeStamp = block.timestamp;
            _totalWeeklyRewardsPaid += weeklyRewardValue;
            emit WeeklyRewardsPaid(globalAddress, weeklyRewardValue);
        }
    }

    function getUserAccount(
        address _userAddress
    ) external view returns (AccountStruct memory) {
        return accounts[_userAddress];
    }

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

    function setWeeklyDetails(
        uint256 _valueToAddInWei,
        uint256 _timeInSeconds
    ) external onlyOwner {
        _weeklyRewardClaimedTimeStamp = _timeInSeconds;
        _WeeklyRewardValue += _valueToAddInWei;
    }

    // function removeAdminAddressFromGlobalList() external {
    //     address adminAddress = IVariables(_variableContractAddress)
    //         .getAdminAddress();
    //     address[] memory globalList = _globalAddresses;
    //     uint256 globalAddressCount = globalList.length;

    //     for (uint256 i; i < globalAddressCount; i++) {
    //         if (_globalAddresses[i] == adminAddress) {
    //             _globalAddresses[i] = _globalAddresses[
    //                 _globalAddresses.length - 1
    //             ];
    //             _globalAddresses.pop();
    //         }

    //         if (
    //             _globalAddresses.length == 0 || i == _globalAddresses.length - 1
    //         ) {
    //             break;
    //         }
    //     }
    // }

    function resetGlobalArray() external onlyOwner {
        delete _globalAddresses;
    }

    function resetUserAccounts(uint16 _from, uint16 _to) external onlyOwner {
        for (uint16 i = _from; i < _to; ++i) {
            address userAddress = idToAddress[i];
            AccountStruct storage userAccount = accounts[userAddress];

            delete userAccount.refereeAddresses;
            delete userAccount.directBusiness;
            delete userAccount.teamAddress;
            delete userAccount.teamBusiness;
            delete userAccount.teamLevels;
            delete userAccount.isGlobal;
            delete userAccount.globalIndexes;
        }
    }

    function reRegisterAccounts(uint16 _from, uint16 _to) external onlyOwner {
        IVariables varI = IVariables(_variableContractAddress);
        for (uint32 j = _from; j < _to; ++j) {
            address userAddress = idToAddress[j];
            AccountStruct storage userAccount = accounts[userAddress];
            if (userAccount.selfAddress == address(0)) {
                userAccount.selfAddress = userAddress;
            }
            uint256 userSelfBusiness = userAccount.selfBusiness;

            uint16[] memory levelRate = varI.getLevelRates();

            for (uint8 i; i < levelRate.length; ++i) {
                if (
                    userAccount.referrerAddress == address(0) ||
                    userAccount.referrerAddress == varI.getAdminAddress()
                ) {
                    break;
                }

                AccountStruct storage referrerAccount = accounts[
                    userAccount.referrerAddress
                ];

                if (referrerAccount.selfAddress == address(0)) {
                    userAccount.referrerAddress;
                }

                if (i == 0) {
                    referrerAccount.refereeAddresses.push(userAddress);
                    emit ReferrerAdded(
                        referrerAccount.selfAddress,
                        userAddress
                    );

                    referrerAccount.directBusiness += userSelfBusiness;
                    emit DirectBusinessUpdated(
                        referrerAccount.selfAddress,
                        userAddress,
                        userSelfBusiness
                    );

                    if (
                        referrerAccount.isGlobal &&
                        userAccount.referrerAddress != varI.getAdminAddress() &&
                        referrerAccount.selfAddress != address(0)
                    ) {
                        referrerAccount.globalIndexes.push(
                            uint32(_globalAddresses.length)
                        );
                        _globalAddresses.push(referrerAccount.selfAddress);
                    }

                    referrerAccount.isGlobal = !referrerAccount.isGlobal;
                }

                referrerAccount.teamAddress.push(userAddress);
                referrerAccount.teamLevels.push(i + 1);
                emit TeamAddressAdded(
                    referrerAccount.referrerAddress,
                    referrerAccount.selfAddress,
                    userAddress,
                    i + 1
                );
                referrerAccount.teamBusiness += userSelfBusiness;
                emit TeamBusinessUpdated(
                    referrerAccount.selfAddress,
                    userAddress,
                    userSelfBusiness
                );

                userAccount = referrerAccount;
            }
        }
    }

    // function updateAllAddressIBP(
    //     uint32 _idFrom,
    //     uint32 _idTo,
    //     address _ibpAddress,
    //     address _ibpAddressToIgnore
    // ) external onlyOwner {
    //     for (uint32 i = _idFrom; i <= _idTo; i++) {
    //         address userAddress = idToAddress[i];
    //         if (accounts[userAddress].ibpAddress != _ibpAddressToIgnore) {
    //             accounts[userAddress].ibpAddress = _ibpAddress;
    //             emit IBPAdded(_ibpAddress, userAddress);
    //         }
    //     }
    // }

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

    // function _removeReferee(
    //     AccountStruct storage _referrerAccount,
    //     address _refereeAddress
    // ) private {
    //     if (_referrerAccount.selfAddress != address(0)) {
    //         uint256 referrerRefereeCount = _referrerAccount
    //             .refereeAddresses
    //             .length;

    //         for (uint256 i; i < referrerRefereeCount; i++) {
    //             if (_referrerAccount.refereeAddresses[i] == _refereeAddress) {
    //                 _referrerAccount.refereeAddresses[i] = _referrerAccount
    //                     .refereeAddresses[
    //                         _referrerAccount.refereeAddresses.length - 1
    //                     ];
    //                 _referrerAccount.refereeAddresses.pop();
    //             }

    //             if (
    //                 _referrerAccount.refereeAddresses.length == 0 ||
    //                 i == _referrerAccount.refereeAddresses.length - 1
    //             ) {
    //                 break;
    //             }
    //         }
    //     }
    // }

    // function removeRefereeAdmin(address _refereeAddress) external onlyOwner {
    //     AccountStruct storage refereeAccount = accounts[_refereeAddress];

    //     AccountStruct storage prevReferrerAccount = accounts[
    //         refereeAccount.referrerAddress
    //     ];

    //     _removeReferee(prevReferrerAccount, _refereeAddress);
    // }

    // function _removeTeamAddress(
    //     AccountStruct storage _referrerAccount,
    //     address _teamAddress
    // ) private {
    //     if (_referrerAccount.selfAddress != address(0)) {
    //         uint256 referrerTeamCount = _referrerAccount.teamAddress.length;

    //         for (uint256 i; i < referrerTeamCount; i++) {
    //             if (_referrerAccount.refereeAddresses[i] == _teamAddress) {
    //                 _referrerAccount.teamAddress[i] = _referrerAccount
    //                     .teamAddress[_referrerAccount.teamAddress.length - 1];
    //                 _referrerAccount.teamAddress.pop();
    //             }

    //             if (
    //                 _referrerAccount.teamAddress.length == 0 ||
    //                 i == (_referrerAccount.teamAddress.length - 1)
    //             ) {
    //                 break;
    //             }
    //         }
    //     }
    // }

    // function removeTeamAddress(address _userAddress, address _teamAddress) external onlyOwner {
    //     IVariables variablesInterface = IVariables(_variableContractAddress);
    //     uint16[] memory _levelRates = variablesInterface.getLevelRates();
    //     AccountStruct storage refereeAccount = accounts[_teamAddress];

    //     AccountStruct storage prevReferrerAccount = accounts[
    //         refereeAccount.referrerAddress
    //     ];

    //     for (uint16 i; i < _levelRates.length; i++) {
    //         _removeTeamAddress(prevReferrerAccount, _teamAddress);
    //     }
    // }

    // function updateUserAccount(
    //     address _userAddress,
    //     uint256 _referralIncome,
    //     uint256 _limit,
    //     uint256 _directBusiness,
    //     uint256 _teamBusiness
    // ) external onlyOwner {
    //     AccountStruct storage userAccount = accounts[_userAddress];

    //     userAccount.directBusiness += _directBusiness;
    //     userAccount.referralRewards += _referralIncome;
    //     userAccount.currentLimit += _limit;
    //     userAccount.teamBusiness += _teamBusiness;
    // }

    // function changeReferrer(
    //     address _referrer,
    //     address _user
    // ) external onlyOwner {
    //     IVariables variablesInterface = IVariables(_variableContractAddress);
    //     AccountStruct storage userAccount = accounts[_user];

    //     uint16[] memory _levelRates = variablesInterface.getLevelRates();

    //     userAccount.referrerAddress = address(0);

    //     _addReferrer(
    //         _referrer,
    //         _user,
    //         uint8(_levelRates.length),
    //         variablesInterface
    //     );
    // }

    function getIDToAddress(uint32 _id) external view returns (address) {
        return idToAddress[_id];
    }

    function getVariablesContract() external view returns (address) {
        return _variableContractAddress;
    }

    // function setVariablesContract(address _contractAddress) external onlyOwner {
    //     _variableContractAddress = _contractAddress;
    // }

    function pushAddressToGlobal(address _userAddress) external onlyOwner {
        accounts[_userAddress].isGlobal = true;
        accounts[_userAddress].globalIndexes.push(
            uint32(_globalAddresses.length - 1)
        );
        _globalAddresses.push(_userAddress);
    }

    function getGlobalAddress()
        external
        view
        returns (address[] memory globalAddress, uint256 globalAddressCount)
    {
        globalAddress = _globalAddresses;
        globalAddressCount = _globalAddresses.length;
    }

    function _toTokenDecimals(
        uint256 _value,
        uint256 _from,
        uint256 _to
    ) private pure returns (uint256) {
        return (_value * 10 ** _to) / 10 ** _from;
    }

    function _usdPrice(
        address _oracleContractAddress
    ) private view returns (uint256 _priceInWei) {
        _priceInWei =
            IChainlinkOracle(_oracleContractAddress).latestAnswer() *
            10 ** 10;
    }

    function _weiToUSD(
        uint256 _valueInWei,
        uint256 _priceInUSD
    ) private pure returns (uint256) {
        return (_valueInWei * _priceInUSD) / 10 ** 18;
    }

    function _usdToWei(
        uint256 _valueInUSD,
        uint256 _priceInUSD
    ) private pure returns (uint256) {
        return (_valueInUSD * 10 ** 18) / _priceInUSD;
    }

    function getUSDToNativeValue(
        uint256 _valueInUSDWei
    ) external view returns (uint256) {
        return
            (_valueInUSDWei * 10 ** 18) /
            _usdPrice(
                IVariables(_variableContractAddress).getMaticUSDPriceOracle()
            );
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
