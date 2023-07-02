// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface IERC20_EXTENDED {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint);
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

    function getAdminAddress() external view returns (address);

    function isTokenSupported(
        address _tokenContractAddress
    ) external view returns (bool);

    function isIBP(address _ibpAddress) external view returns (bool);

    function getRewardTokenContract() external view returns (address);

    function getRewardTokenRate() external view returns (uint8);

    function getPresaleContract() external view returns (address);

    function getReferralContract() external view returns (address);
}

contract StakingUpgradeable is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    address private _variablesContract;
    address[] private _stakers;
    uint256 private _totalValueStaked;
    uint256 private _totalValueUnStaked;
    uint256 private _rewardsDistributed;

    uint256 private _stakingRewardRate;
    uint256 private _stakingDuration;

    struct Account {
        uint256[] stakingID;
    }

    struct StakeInfo {
        bool isActive;
        address owner;
        uint256 value;
        uint256 rewardRate;
        uint256 startTime;
        uint256 duration;
        uint256 rewardClaimed;
    }

    mapping(address => Account) private account;
    mapping(uint256 => StakeInfo) private stakeInfo;

    event Stake(
        address indexed userAddress,
        uint256 indexed valueStaked,
        uint256 indexed duration,
        uint256 stakingID
    );
    event StakingRewardClaimed(
        address indexed userAddress,
        uint256 indexed reward,
        uint256 indexed stakingID,
        address tokenAddress
    );

    event PrincipalClaimed(address indexed userAddress, uint256 amount);
    event Unstake(
        address indexed userAddress,
        uint256 indexed valueStaked,
        uint256 indexed stakingID
    );

    function initialize() public initializer {
        _variablesContract = 0x77daaFc7411C911b869C71bf70FE36cCE507845d;
        _stakingRewardRate = 100;
        _stakingDuration = 550 days;

        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    receive() external payable {}

    function stakeInfoMap(
        uint256 _stakingID
    ) external view returns (StakeInfo memory) {
        return stakeInfo[_stakingID];
    }

    function _userAccountMap(
        address _userAddress
    ) private view returns (Account memory) {
        return account[_userAddress];
    }

    function userAccountMap(
        address _userAddress
    ) external view returns (Account memory) {
        return account[_userAddress];
    }

    function _stake(
        address _address,
        uint256 _value,
        uint256 _duration
    ) private returns (bool) {
        _stakers.push(_address);

        uint256 stakingID = _stakers.length;
        uint256 currentTime = block.timestamp;

        Account storage userAccount = account[_address];
        StakeInfo storage userStakingInfo = stakeInfo[stakingID];

        userAccount.stakingID.push(stakingID);

        userStakingInfo.isActive = true;
        userStakingInfo.owner = _address;
        userStakingInfo.startTime = currentTime;
        // userStakingInfo.duration = _duration;
        userStakingInfo.value = _value;
        // userStakingInfo.rewardRate = _rewardRate;

        _totalValueStaked += _value;

        emit Stake(_address, _value, _duration, stakingID);

        return true;
    }

    function stake(address _userAddress, uint256 _value) external {
        require(
            msg.sender == IVariables(_variablesContract).getReferralContract()
        );
        _stake(_userAddress, _value, _stakingDuration);
    }

    function _getStakingReward(
        uint256 _stakingID
    ) private view returns (uint256 stakingReward) {
        uint256 currentTime = block.timestamp;
        uint256 _duration = _stakingDuration;
        StakeInfo storage userStakingInfo = stakeInfo[_stakingID];
        uint256 stakingTimePassed = currentTime - userStakingInfo.startTime;

        uint256 baseReward = userStakingInfo.value / _duration;

        stakingReward =
            baseReward *
            (_min(stakingTimePassed, _duration) -
                userStakingInfo.rewardClaimed);
    }

    function getStakingReward(
        uint256 _stakingID
    ) external view returns (uint256) {
        return _getStakingReward(_stakingID);
    }

    function getUserAllStakingsRewards(
        address _userAddress
    ) external view returns (uint256 allStakingRewards) {
        uint256[] memory userStakingIDs = account[_userAddress].stakingID;
        uint256 stakingIDLength = userStakingIDs.length;

        for (uint8 i; i < stakingIDLength; i++) {
            allStakingRewards += _getStakingReward(userStakingIDs[i]);
        }
    }

    function claimStakingReward(uint256 _stakingID) external {
        uint256 stakingReward = _getStakingReward(_stakingID);
        require(stakingReward > 0, "You have no staking or ended");
        IVariables variables = IVariables(_variablesContract);

        address _msgSender = msg.sender;
        StakeInfo storage userStakingInfo = stakeInfo[_stakingID];

        require(
            userStakingInfo.owner == _msgSender,
            "Sorry staking id doen't belongs to you."
        );

        userStakingInfo.rewardClaimed += stakingReward;

        _rewardsDistributed += stakingReward;

        IERC20Upgradeable(variables.getRewardTokenContract()).transfer(
            _msgSender,
            stakingReward
        );

        emit StakingRewardClaimed(
            _msgSender,
            stakingReward,
            _stakingID,
            variables.getRewardTokenContract()
        );
    }

    function unStake(uint32 _stakingID) external {
        StakeInfo storage userStakingInfo = stakeInfo[_stakingID];
        require(userStakingInfo.isActive, "You have no staking or ended");
        uint256 stakingReward = _getStakingReward(_stakingID);
        IVariables variables = IVariables(_variablesContract);
        address _msgSender = msg.sender;

        require(
            userStakingInfo.owner == _msgSender,
            "Sorry staking id doen't belongs to you."
        );

        require(
            userStakingInfo.startTime + _stakingDuration > _getCurrentTime(),
            "You staking is not ended yet."
        );

        userStakingInfo.rewardClaimed += stakingReward;

        _rewardsDistributed += stakingReward;

        emit StakingRewardClaimed(
            _msgSender,
            stakingReward,
            _stakingID,
            variables.getRewardTokenContract()
        );

        userStakingInfo.isActive = false;

        emit Unstake(_msgSender, userStakingInfo.value, _stakingID);

        IERC20Upgradeable(variables.getRewardTokenContract()).transfer(
            _msgSender,
            userStakingInfo.value + stakingReward
        );
    }

    function isStaked(address _userAddress) public view returns (bool) {
        Account storage userAccount = account[_userAddress];
        uint256[] memory userStakingIDs = userAccount.stakingID;
        uint256 userStakingIDsLength = userStakingIDs.length;

        for (uint256 i; i < userStakingIDsLength; i++) {
            if (stakeInfo[userStakingIDs[i]].isActive) {
                return true;
            }
        }

        return false;
    }

    function getUserTotalValueStaked(
        address _userAddress
    ) external view returns (uint256 token) {
        Account storage userAccount = account[_userAddress];
        uint256[] memory userStakingIDs = userAccount.stakingID;
        uint256 userStakingIDsLength = userStakingIDs.length;

        for (uint256 i; i < userStakingIDsLength; i++) {
            StakeInfo storage userStakeInfo = stakeInfo[userStakingIDs[i]];
            if (userStakeInfo.isActive) {
                token += userStakeInfo.value;
            }
        }
    }

    function getUserStakingIDs(
        address _userAddress
    ) public view returns (uint256[] memory) {
        return account[_userAddress].stakingID;
    }

    function getUserTotalRewardClaimedToken(
        address _userAddress
    ) external view returns (uint256 totalRewardClaim) {
        Account storage userAccount = account[_userAddress];
        uint256[] memory userStakingIDs = userAccount.stakingID;
        uint256 userStakingIDsLength = userStakingIDs.length;

        for (uint256 i; i < userStakingIDsLength; i++) {
            StakeInfo storage userStakeInfo = stakeInfo[userStakingIDs[i]];
            totalRewardClaim += userStakeInfo.rewardClaimed;
        }
    }

    function getStakingTimeRemaining(
        uint256 _stakingID
    ) external view returns (uint256) {
        uint256 _currentTime = block.timestamp;
        StakeInfo storage userStakingInfo = stakeInfo[_stakingID];
        uint256 _duration = _stakingDuration;
        uint256 endTime = userStakingInfo.startTime + _duration;
        if (_currentTime < endTime) {
            return userStakingInfo.startTime + _duration - _currentTime;
        }

        return 0;
    }

    function getActiveStakingIDs() public view returns (uint256[] memory) {
        uint256 stakingIDsLength = _stakers.length;

        uint256[] memory stakingIDsArray = new uint256[](stakingIDsLength);

        for (uint256 i; i < stakingIDsLength; i++) {
            StakeInfo storage userStakingInfo = stakeInfo[i];
            if (userStakingInfo.isActive == true) {
                if (i != 0) {
                    stakingIDsArray[i] = i;
                }
            }
        }

        return stakingIDsArray;
    }

    function activeStakersList() external view returns (address[] memory) {
        address[] memory stakers = _stakers;
        uint256 totalStakers = stakers.length;
        address[] memory activeStakersArray = new address[](totalStakers);
        uint256 activeStakersLength;

        for (uint256 i; i < totalStakers; i++) {
            if (_isAddressInList(activeStakersArray, stakers[i]) == true) {
                continue;
            }

            if (isStaked(stakers[i])) {
                activeStakersArray[activeStakersLength] = stakers[i];
                activeStakersLength++;
            }
        }

        return activeStakersArray;
    }

    function allStakersList() external view returns (address[] memory) {
        address[] memory stakers = _stakers;
        uint256 totalStakers = stakers.length;
        address[] memory stakersArray = new address[](totalStakers);
        uint256 stakersArrayLength;

        for (uint256 i; i < totalStakers; i++) {
            if (_isAddressInList(stakersArray, stakers[i]) == true) {
                continue;
            }

            stakersArray[stakersArrayLength] = stakers[i];
            stakersArrayLength++;
        }

        return stakersArray;
    }

    function getTotalValueStaked() external view returns (uint256 token) {
        token = _totalValueStaked;
    }

    function getTotalStakingRewardDistributed()
        external
        view
        returns (uint256 _tokenRewards)
    {
        _tokenRewards = _rewardsDistributed;
    }

    function getStakingCappings()
        external
        view
        returns (uint256 stakingRewardRate, uint256 stakingDuration)
    {
        stakingRewardRate = _stakingRewardRate;
        stakingDuration = _stakingDuration;
    }

    function setStakingRewardRate(uint256 _valueInPer) external onlyOwner {
        _stakingRewardRate = _valueInPer;
    }

    function setStakingDuration(uint256 _valueInDays) external onlyOwner {
        _stakingDuration = _valueInDays * 1 days;
    }

    function _isAddressInList(
        address[] memory _addressList,
        address _addressToSearch
    ) private pure returns (bool) {
        for (uint256 i; i < _addressList.length; i++) {
            if (_addressList[i] == _addressToSearch) {
                return true;
            }
        }

        return false;
    }

    function getVariablesContract() external view returns (address) {
        return _variablesContract;
    }

    function setVariablesContract(address _contractAddress) external onlyOwner {
        _variablesContract = _contractAddress;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function _getCurrentTime() private view returns (uint256 currentTime) {
        currentTime = block.timestamp;
        return currentTime;
    }

    function _min(uint256 a, uint256 b) private pure returns (uint256) {
        return a < b ? a : b;
    }
}
