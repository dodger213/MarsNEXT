// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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
    OwnableUpgradeable,
    UUPSUpgradeable
{
    uint16[] private _levelRates;
    uint16 private _levelDecimals;

    address[] public supportedTokensList;

    address private _presaleContract;
    address private _referralContract;
    address private _stakingContract;
    address private _rewardTokenContract;
    address private _coreMembersContract;
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
        bool isStable;
        address aggregatorAddress;
        bool isEnaled;
    }

    mapping(uint8 => PlanStruct) private plans;
    mapping(address => SupportedTokensStruct) private supportTokens;

    address private _uniswapRouterV2Address;

    mapping(address => bool) private _isAdmin;

    address private _maticUsdPriceOracleContract;

    address private _bonanzaContract;

    function initialize() public initializer {
        _levelRates = [5000, 500, 400, 300, 200, 100, 100, 125, 125, 150];
        _levelDecimals = 10000;

        _rewardTokenContract = 0x7F9fD63932babC508FAD2f324EB534D09cfE86F0;
        _coreMembersContract = 0x64b909a2C51AA62F30e75010b726a8CE863285fA;

        _adminAddress = msg.sender;

        _uniswapRouterV2Address;
        _maticUsdPriceOracleContract;
        _bonanzaContract;

        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function pushSupportedTokenToList(
        address _tokenContractAddress,
        bool _isStable,
        address _aggregatorContractAddress
    ) external onlyOwner {
        supportTokens[_tokenContractAddress] = SupportedTokensStruct({
            contractAddress: _tokenContractAddress,
            name: IERC20_EXTENDED(_tokenContractAddress).name(),
            decimals: IERC20_EXTENDED(_tokenContractAddress).decimals(),
            symbol: IERC20_EXTENDED(_tokenContractAddress).symbol(),
            isStable: _isStable,
            aggregatorAddress: _aggregatorContractAddress,
            isEnaled: true
        });

        supportedTokensList.push(_tokenContractAddress);
    }

    function getCoreMembersContractAddress() external view returns (address) {
        return _coreMembersContract;
    }

    function setCoreMembersContractAddress(
        address _address
    ) external onlyOwner {
        _coreMembersContract = _address;
    }

    function getSupportedTokenInfo(
        address _tokenContractAddress
    ) external view returns (SupportedTokensStruct memory) {
        return supportTokens[_tokenContractAddress];
    }

    function isTokenSupported(
        address _tokenContractAddress
    ) external view returns (bool) {
        return supportTokens[_tokenContractAddress].isEnaled;
    }

    function disableSupportedToken(
        address[] calldata _tokenContractAddress
    ) external onlyOwner {
        for (uint8 i; i < _tokenContractAddress.length; i++) {
            supportTokens[_tokenContractAddress[i]].isEnaled = false;
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

    function getLevelDecimals() external view returns (uint16) {
        return _levelDecimals;
    }

    function setLevelDecimals(uint16 decimals) external onlyOwner {
        _levelDecimals = decimals;
    }

    function getPlanById(
        uint8 _planId
    ) external view returns (PlanStruct memory) {
        return plans[_planId];
    }

    function getPlansCount() external view returns (uint8 planCount) {
        for (uint8 i; i < 20; i++) {
            if (plans[i].value > 0) {
                planCount++;
            }
        }
    }

    function setPlans(
        uint8[] calldata planId,
        string[] memory name,
        uint256[] calldata valueInDecimals,
        uint256[] calldata maxLimitMultiplier
    ) external onlyOwner {
        for (uint256 i = 0; i < planId.length; i++) {
            plans[planId[i]].planId = planId[i];
            plans[planId[i]].name = name[i];
            plans[planId[i]].value = valueInDecimals[i] * 10 ** 18;
            plans[planId[i]].maxLimitMultiplier = maxLimitMultiplier[i];
        }
    }

    // Getter and Setter for _rewardTokenContract
    function getRewardTokenContract() external view returns (address) {
        return _rewardTokenContract;
    }

    function setRewardTokenContract(address tokenContract) external onlyOwner {
        _rewardTokenContract = tokenContract;
    }

    function isAdmin(address _userAddress) external view returns (bool) {
        return _isAdmin[_userAddress];
    }

    function getAdminAddress() external view returns (address) {
        return _adminAddress;
    }

    function setAdminAddress(address adminAddress) external onlyOwner {
        _adminAddress = adminAddress;
    }

    function getPresaleContract() external view returns (address) {
        return _presaleContract;
    }

    function setPresaleContract(address _contractAddress) external onlyOwner {
        _presaleContract = _contractAddress;
    }

    function getReferralContract() external view returns (address) {
        return _referralContract;
    }

    function setReferralContract(address _contractAddress) external onlyOwner {
        _referralContract = _contractAddress;
    }

    function getStakingContract() external view returns (address) {
        return _stakingContract;
    }

    function setStakingContract(address _contractAddress) external onlyOwner {
        _stakingContract = _contractAddress;
    }

    function getUniSwapRouterV2Address() external view returns (address) {
        return _uniswapRouterV2Address;
    }

    function setUniSwapRouterV2Address(
        address _routerV2Address
    ) external onlyOwner {
        _uniswapRouterV2Address = _routerV2Address;
    }

    function getMaticUSDPriceOracle() external view returns (address) {
        return _maticUsdPriceOracleContract;
    }

    function setMaticUSDPriceOracle(address _oracleAddress) external onlyOwner {
        _maticUsdPriceOracleContract = _oracleAddress;
    }

    function getBonanzaContract() external view returns (address) {
        return _bonanzaContract;
    }

    function setBonanzaContract(address _contractAddress) external onlyOwner {
        _bonanzaContract = _contractAddress;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
