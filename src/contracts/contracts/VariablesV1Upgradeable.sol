// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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

contract VariablesV1Upgradeable is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    uint16[] private _levelRates;
    uint16 private _levelDecimals;
    uint8 private _baseCurrencyDecimals;

    uint8 private _valueBufferRate;
    uint8 private _globalRewardRate;
    uint8 private _weeklyRewardRate;
    uint256 private _weeklyRewardTimeLimit;
    uint8 private _ibpRewardRate;
    uint8 private _coreMemberRewardRate;
    uint8 private _adminFees;
    uint8 private _rewardTokenRate;

    bool private _isPayRewardToken;
    bool private _isPayReferralRewards;
    bool private _isPayGlobalRewards;
    bool private _isPayWeeklyRewards;
    bool private _isPayIbpRewards;
    bool private _isPayCoreMembersRewards;

    address private _usdtContractAddress;
    address private _busdContractAddress;
    address private _rewardTokenContract;
    address private _coreMembersContractAddress;
    address private _adminContractAddress;

    address[] public supportedTokensList;
    address[] private _ibpAddresses;

    address private _defaultReferrer;
    address private _defaultIBP;
    address private _adminAddress;

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

    mapping(uint8 => PlanStruct) private plans;
    mapping(address => SupportedTokensStruct) private supportTokens;
    mapping(address => bool) private isIBPAddress;

    event IBPPromotedByAdmin(address ibpAddress);
    event IBPRemovedByAdmin(address ibpAddress);

    function initialize() public initializer {
        _levelRates = [5000, 500, 400, 300, 200, 100, 100, 125, 125, 150];
        _levelDecimals = 10000;
        _baseCurrencyDecimals = 18;
        _valueBufferRate = 10;
        _globalRewardRate = 10;
        _weeklyRewardRate = 10;
        _weeklyRewardTimeLimit = 7 days;
        _ibpRewardRate = 5;
        _coreMemberRewardRate = 2;
        _adminFees = 3;

        _isPayRewardToken = true;
        _isPayReferralRewards = true;
        _isPayGlobalRewards = true;
        _isPayWeeklyRewards = true;
        _isPayIbpRewards = true;
        _isPayCoreMembersRewards = true;

        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function pushSupportedTokenToList(
        address[] calldata _tokenContractAddress,
        address[] calldata aggregatorContractAddress
    ) external onlyOwner {
        for (uint8 i; i < _tokenContractAddress.length; i++) {
            supportTokens[_tokenContractAddress[i]]
                .contractAddress = _tokenContractAddress[i];
            supportTokens[_tokenContractAddress[i]].name = IERC20_EXTENDED(
                _tokenContractAddress[i]
            ).name();
            supportTokens[_tokenContractAddress[i]].symbol = IERC20_EXTENDED(
                _tokenContractAddress[i]
            ).symbol();
            supportTokens[_tokenContractAddress[i]].decimals = IERC20_EXTENDED(
                _tokenContractAddress[i]
            ).decimals();
            supportTokens[_tokenContractAddress[i]]
                .aggregatorAddress = aggregatorContractAddress[i];
            supportTokens[_tokenContractAddress[i]].isEbaled = true;
            supportedTokensList.push(_tokenContractAddress[i]);
        }
    }

    function getAdminContractAddress() external view returns (address) {
        return _adminContractAddress;
    }

    function setAdminContractAddress(address _address) external onlyOwner {
        _adminContractAddress = _address;
    }

    function getCoreMembersContractAddress() external view returns (address) {
        return _coreMembersContractAddress;
    }

    function setCoreMembersContractAddress(
        address _address
    ) external onlyOwner {
        _coreMembersContractAddress = _address;
    }

    function getSupportedTokenInfo(
        address _tokenContractAddress
    ) external view returns (SupportedTokensStruct memory) {
        return supportTokens[_tokenContractAddress];
    }

    function isTokenSupported(
        address _tokenContractAddress
    ) external view returns (bool) {
        return supportTokens[_tokenContractAddress].isEbaled;
    }

    function disableSupportedToken(
        address[] calldata _tokenContractAddress
    ) external onlyOwner {
        for (uint8 i; i < _tokenContractAddress.length; i++) {
            supportTokens[_tokenContractAddress[i]].isEbaled = false;
            supportedTokensList.push(_tokenContractAddress[i]);
        }
    }

    // Getter and Setter for _levelRates
    function getLevelRates() external view returns (uint16[] memory) {
        return _levelRates;
    }

    function setLevelRates(uint16[] memory rates) external onlyOwner {
        _levelRates = rates;
    }

    // Getter and Setter for _levelDecimals
    function getLevelDecimals() external view returns (uint16) {
        return _levelDecimals;
    }

    function setLevelDecimals(uint16 decimals) external onlyOwner {
        _levelDecimals = decimals;
    }

    function getBaseCurrencyDecimals() external view returns (uint8) {
        return _baseCurrencyDecimals;
    }

    function setBaseCurrencyDecimals(uint8 decimals) external onlyOwner {
        _baseCurrencyDecimals = decimals;
    }

    //getter and setter plans

    function getPlanById(
        uint8 _planId
    ) external view returns (PlanStruct memory) {
        return plans[_planId];
    }

    function setPlans(
        uint8[] calldata planId,
        string[] calldata name,
        uint256[] calldata value,
        uint256[] calldata maxLimitMultiplier
    ) external onlyOwner {
        for (uint256 i = 0; i < planId.length; i++) {
            plans[planId[i]].planId = planId[i];
            plans[planId[i]].name = name[i];
            plans[planId[i]].value = value[i];
            plans[planId[i]].maxLimitMultiplier = maxLimitMultiplier[i];
        }
    }

    // Getter and Setter for _valueBufferRate
    function getValueBufferRate() external view returns (uint8) {
        return _valueBufferRate;
    }

    function setValueBufferRate(uint8 rate) external onlyOwner {
        _valueBufferRate = rate;
    }

    // Getter and Setter for _globalRewardRate
    function getGlobalRewardRate() external view returns (uint8) {
        return _globalRewardRate;
    }

    function setGlobalRewardRate(uint8 rate) external onlyOwner {
        _globalRewardRate = rate;
    }

    // Getter and Setter for _weeklyRewardRate
    function getWeeklyRewardRate() external view returns (uint8) {
        return _weeklyRewardRate;
    }

    function setWeeklyRewardRate(uint8 rate) external onlyOwner {
        _weeklyRewardRate = rate;
    }

    function getWeeklyRewardTimeLimit() external view returns (uint256) {
        return _weeklyRewardTimeLimit;
    }

    function getIbpRewardRate() external view returns (uint8) {
        return _ibpRewardRate;
    }

    function setIbpRewardRate(uint8 rate) external onlyOwner {
        _ibpRewardRate = rate;
    }

    // Getter and Setter for _coreMemberRewardRate
    function getCoreMemberRewardRate() external view returns (uint8) {
        return _coreMemberRewardRate;
    }

    function setCoreMemberRewardRate(uint8 rate) external onlyOwner {
        _coreMemberRewardRate = rate;
    }

    // Getter and Setter for _adminFees
    function getAdminFees() external view returns (uint8) {
        return _adminFees;
    }

    function setAdminFees(uint8 fees) external onlyOwner {
        _adminFees = fees;
    }

    // Getter and Setter for _usdtContractAddress
    function getUsdtContractAddress() external view returns (address) {
        return _usdtContractAddress;
    }

    function setUsdtContractAddress(address usdtAddress) external onlyOwner {
        _usdtContractAddress = usdtAddress;
    }

    // Getter and Setter for _busdContractAddress
    function getBusdContractAddress() external view returns (address) {
        return _busdContractAddress;
    }

    function setBusdContractAddress(address busdAddress) external onlyOwner {
        _busdContractAddress = busdAddress;
    }

    // Getter and Setter for _rewardTokenRate
    function getRewardTokenRate() external view returns (uint8) {
        return _rewardTokenRate;
    }

    function setRewardTokenRate(uint8 rate) external onlyOwner {
        _rewardTokenRate = rate;
    }

    // Getter and Setter for _isPayRewardToken
    function getIsPayRewardToken() external view returns (bool) {
        return _isPayRewardToken;
    }

    function setIsPayRewardToken(bool isPay) external onlyOwner {
        _isPayRewardToken = isPay;
    }

    function getIsPayReferralRewards() external view returns (bool) {
        return _isPayReferralRewards;
    }

    function getIsPayGlobalRewards() external view returns (bool) {
        return _isPayGlobalRewards;
    }

    function getIsPayWeeklyRewards() external view returns (bool) {
        return _isPayWeeklyRewards;
    }

    function getIsPayIbpRewards() external view returns (bool) {
        return _isPayIbpRewards;
    }

    function setIsPayReferralRewards(bool value) external onlyOwner {
        _isPayReferralRewards = value;
    }

    function setIsPayGlobalRewards(bool value) external onlyOwner {
        _isPayGlobalRewards = value;
    }

    function setIsPayWeeklyRewards(bool value) external onlyOwner {
        _isPayWeeklyRewards = value;
    }

    function setIsPayIbpRewards(bool value) external onlyOwner {
        _isPayIbpRewards = value;
    }

    function getIsPayCoreMembersRewards() external view returns (bool) {
        return _isPayCoreMembersRewards;
    }

    function setIsPayCoreMembersRewards(bool value) external onlyOwner {
        _isPayCoreMembersRewards = value;
    }

    // Getter and Setter for _rewardTokenContract
    function getRewardTokenContract() external view returns (address) {
        return _rewardTokenContract;
    }

    function setRewardTokenContract(address tokenContract) external onlyOwner {
        _rewardTokenContract = tokenContract;
    }

    function getDefaultReferrer() external view returns (address) {
        return _defaultReferrer;
    }

    function setDefaultReferrer(address referrer) external onlyOwner {
        _defaultReferrer = referrer;
    }

    function getDefaultIBP() external view returns (address) {
        return _defaultIBP;
    }

    function setDefaultIBP(address ibpAddress) external onlyOwner {
        _defaultIBP = ibpAddress;
    }

    function getAdminAddress() external view returns (address) {
        return _adminAddress;
    }

    function setAdminAddress(address adminAddress) external onlyOwner {
        _adminAddress = adminAddress;
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
