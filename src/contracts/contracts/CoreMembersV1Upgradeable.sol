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

contract CoreMembersV1Upgradeable is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    address[] private _coreMembersList;

    event AddedCoreMember(address userAddress);
    event RemoveCoreMember(address userAddress);

    event CoreMembersRewardPaid(
        address coreMemberAddress,
        uint256 value,
        address valuePaidInContract,
        uint256 totalMembers
    );

    function initialize() public initializer {
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getCoreMembersList()
        external
        view
        returns (address[] memory coreMembersList, uint256 coreMembersLength)
    {
        coreMembersList = _coreMembersList;
        coreMembersLength = coreMembersList.length;
    }

    function isUserInCoreMembersList(address _userAddress) external view returns (bool) {
        address[] memory coreMembers = _coreMembersList;
        uint256 coreMembersLength = coreMembers.length;

        for (uint16 i; i < coreMembersLength; i++) {
            if (_userAddress == coreMembers[i]) {
                return true;
            }
        }

        return false;
    }

    function addCoreMember(address _userAddress) external onlyOwner {
        _coreMembersList.push(_userAddress);
        emit AddedCoreMember(_userAddress);
    }

    function removeCoreMember(address _userAddress) external onlyOwner {
        address[] memory coreMembers = _coreMembersList;
        uint256 coreMembersLength = coreMembers.length;

        for (uint16 i; i < coreMembersLength; i++) {
            if (_userAddress == coreMembers[i]) {
                _coreMembersList[i] = _coreMembersList[coreMembersLength - 1];
                _coreMembersList.pop();
            }

            emit RemoveCoreMember(_userAddress);
        }
    }

    function distributeETH() external {
        address[] memory coreMembers = _coreMembersList;
        uint256 coreMembersLength = coreMembers.length;
        uint256 ethBalanceThis = address(this).balance;
        uint256 ethBalanceShare = ethBalanceThis / coreMembersLength;

        for (uint16 i; i < coreMembersLength; i++) {
            payable(coreMembers[i]).transfer(ethBalanceShare);
            emit CoreMembersRewardPaid(
                coreMembers[i],
                ethBalanceShare,
                address(0),
                coreMembersLength
            );
        }
    }

    function distributeToken(address _tokenContract) external {
        address[] memory coreMembers = _coreMembersList;
        uint256 coreMembersLength = coreMembers.length;
        uint256 tokenBalanceThis = IERC20Upgradeable(_tokenContract).balanceOf(
            address(this)
        );
        uint256 tokenBalanceShare = tokenBalanceThis / coreMembersLength;

        for (uint16 i; i < coreMembersLength; i++) {
            payable(coreMembers[i]).transfer(tokenBalanceShare);
            emit CoreMembersRewardPaid(
                coreMembers[i],
                tokenBalanceShare,
                _tokenContract,
                coreMembersLength
            );
        }
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
