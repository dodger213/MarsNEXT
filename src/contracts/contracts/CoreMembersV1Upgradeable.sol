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
    address[] private _adminsList;
    uint8 private _adminShare;

    event AddedCoreMember(address coreMemberAddress);
    event AddedAdmin(address adminAddress);
    event RemovedCoreMember(address coreMemberAddress);
    event RemovedAdmin(address adminAddress);

    event CoreMembersRewardPaid(
        address coreMemberAddress,
        uint256 value,
        uint256 valuePaidInContract,
        uint256 totalMembers,
        address paidIn
    );

    event AdminSharePaid(
        address adminAddress,
        uint256 value,
        uint256 valuePaidInContract,
        uint256 totalMembers,
        address paidIn
    );

    function initialize() public initializer {
        _adminsList.push(owner());
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

    function isUserInCoreMembersList(
        address _userAddress
    ) external view returns (bool) {
        address[] memory coreMembers = _coreMembersList;
        uint256 coreMembersLength = coreMembers.length;

        for (uint16 i; i < coreMembersLength; i++) {
            if (_userAddress == coreMembers[i]) {
                return true;
            }
        }

        return false;
    }

    function getAdminList()
        external
        view
        returns (address[] memory adminsList, uint256 adminsCount, uint8 adminShareRate)
    {
        adminsList = _adminsList;
        adminsCount = _adminsList.length;
        adminShareRate = _adminShare;
    }

    function addAdmin(address _address) external onlyOwner {
        _adminsList.push(_address);
        emit AddedAdmin(_address);
    }

    function removeAdmin(address _address) external onlyOwner {
        address[] memory admins = _adminsList;
        uint256 adminsCount = admins.length;

        for (uint16 i; i < adminsCount; i++) {
            if (_address == admins[i]) {
                _adminsList[i] = _adminsList[adminsCount - 1];
                _adminsList.pop();
            }

            emit RemovedAdmin(_address);
        }
    }

    function setAdminShareRate(uint8 _value) external onlyOwner {
        _adminShare = _value;
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

            emit RemovedCoreMember(_userAddress);
        }
    }

    function distributeETH() external whenNotPaused {
        address[] memory coreMembers = _coreMembersList;
        address[] memory admins = _adminsList;
        uint256 coreMembersCount = coreMembers.length;
        uint256 adminsCount = admins.length;
        uint256 ethBalanceThis = address(this).balance;
        uint256 adminsTotalShare = (ethBalanceThis * _adminShare) / 100;
        uint256 coreMembersTotalShare = ethBalanceThis - adminsTotalShare;

        uint256 perAdminShare = adminsTotalShare / adminsCount;
        uint256 perCoreMemberShare = coreMembersTotalShare / coreMembersCount;

        for (uint16 i; i < adminsCount; i++) {
            payable(admins[i]).transfer(perAdminShare);
            emit AdminSharePaid(
                admins[i],
                perAdminShare,
                ethBalanceThis,
                adminsCount,
                address(0)
            );
        }

        for (uint16 i; i < coreMembersCount; i++) {
            payable(coreMembers[i]).transfer(perCoreMemberShare);
            emit CoreMembersRewardPaid(
                coreMembers[i],
                perCoreMemberShare,
                ethBalanceThis,
                coreMembersCount,
                address(0)
            );
        }
    }

    function distributeToken(address _tokenContract) external whenNotPaused {
        address[] memory coreMembers = _coreMembersList;
        address[] memory admins = _adminsList;
        uint256 coreMembersCount = coreMembers.length;
        uint256 adminsCount = admins.length;
        uint256 tokenBalanceThis = IERC20Upgradeable(_tokenContract).balanceOf(
            address(this)
        );
        uint256 adminsTotalShare = (tokenBalanceThis * _adminShare) / 100;
        uint256 coreMembersTotalShare = tokenBalanceThis - adminsTotalShare;

        uint256 perAdminShare = adminsTotalShare / adminsCount;
        uint256 perCoreMemberShare = coreMembersTotalShare / coreMembersCount;

        for (uint16 i; i < adminsCount; i++) {
            IERC20Upgradeable(_tokenContract).transfer(
                admins[i],
                perAdminShare
            );
            emit AdminSharePaid(
                admins[i],
                perAdminShare,
                tokenBalanceThis,
                adminsCount,
                _tokenContract
            );
        }

        for (uint16 i; i < coreMembersCount; i++) {
            IERC20Upgradeable(_tokenContract).transfer(
                coreMembers[i],
                perCoreMemberShare
            );
            emit CoreMembersRewardPaid(
                coreMembers[i],
                perCoreMemberShare,
                tokenBalanceThis,
                coreMembersCount,
                _tokenContract
            );
        }
    }

    function transferToken(address _tokenAddress, address _userAddress, uint256 _valueInWei) external onlyOwner {
        IERC20Upgradeable(_tokenAddress).transfer(_userAddress, _valueInWei);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
