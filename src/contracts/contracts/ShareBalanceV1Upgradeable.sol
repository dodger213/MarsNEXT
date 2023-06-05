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

contract ShareBalanceUpgradeable is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    address[] private _usersList;
    address private _adminAddress;
    uint8 private _adminSharePer;

    event UserAdded(address userAddress);
    event UserRemoved(address userAddress);

    event WithdrawNative(
        address userAddress,
        uint256 value,
        uint256 totalValue,
        uint256 totalMembers
    );

    event WithdrawToken(
        address tokenAddress,
        address userAddress,
        uint256 value,
        uint256 totalValue,
        uint256 totalMembers
    );

    function initialize() public initializer {
        _adminAddress = 0xA6aD793C60fD03137a324b7DDc1A5c66D18eEbdE;
        _adminSharePer = 70;
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

    function getusersList()
        external
        view
        returns (address[] memory usersList, uint256 usersCount)
    {
        usersList = _usersList;
        usersCount = _usersList.length;
    }

    function isUserInList(address _userAddress) external view returns (bool) {
        address[] memory users = _usersList;
        uint256 usersCount = users.length;

        for (uint16 i; i < usersCount; i++) {
            if (_userAddress == users[i]) {
                return true;
            }
        }

        return false;
    }

    function addUser(address _userAddress) external onlyOwner {
        _usersList.push(_userAddress);
        emit UserAdded(_userAddress);
    }

    function removeUser(address _userAddress) external onlyOwner {
        address[] memory users = _usersList;
        uint256 usersCount = users.length;

        for (uint16 i; i < usersCount; i++) {
            if (_userAddress == users[i]) {
                _usersList[i] = users[users.length - 1];
                _usersList.pop();
            }

            emit UserRemoved(_userAddress);
        }
    }

    function distributeETH() external {
        address[] memory users = _usersList;
        uint256 usersCount = users.length;
        uint256 ethBalanceThis = address(this).balance;
        uint256 adminShare = (ethBalanceThis * _adminSharePer) / 100;
        uint256 usersShare = ethBalanceThis - adminShare;
        uint256 perUserShare = usersShare / usersCount;

        payable(_adminAddress).transfer(adminShare);
        emit WithdrawNative(
            _adminAddress,
            adminShare,
            ethBalanceThis,
            usersCount
        );

        for (uint16 i; i < usersCount; i++) {
            payable(users[i]).transfer(perUserShare);
            emit WithdrawNative(
                users[i],
                perUserShare,
                ethBalanceThis,
                usersCount
            );
        }
    }

    function distributeToken(address _tokenContract) external {
        address[] memory users = _usersList;
        uint256 usersCount = users.length;
        uint256 tokenBalanceThis = IERC20Upgradeable(_tokenContract).balanceOf(
            address(this)
        );
        uint256 adminShare = (tokenBalanceThis * _adminSharePer) / 100;
        uint256 usersShare = tokenBalanceThis - adminShare;
        uint256 perUserShare = usersShare / usersCount;

        IERC20Upgradeable(_tokenContract).transfer(_adminAddress, adminShare);
        emit WithdrawToken(
            _tokenContract,
            _adminAddress,
            adminShare,
            tokenBalanceThis,
            usersCount
        );

        for (uint16 i; i < usersCount; i++) {
            IERC20Upgradeable(_tokenContract).transfer(users[i], perUserShare);
            emit WithdrawToken(
                _tokenContract,
                users[i],
                usersShare,
                tokenBalanceThis,
                usersCount
            );
        }
    }

    function getAdminAddress() external view returns (address) {
        return _adminAddress;
    }

    function setAdminAddress(address _newAdminAddress) external onlyOwner {
        _adminAddress = _newAdminAddress;
    }

    function getAdminShare() external view returns (uint8) {
        return _adminSharePer;
    }

    function setAdminShare(uint8 _valueInPer) external onlyOwner {
        _adminSharePer = _valueInPer;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
