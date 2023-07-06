//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract MarsNextToken {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;

    mapping(address => uint256) private _balanceOf;
    mapping(address => mapping(address => uint256)) private _allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        _name = "MarsNext";
        _symbol = "MARTIAN";
        _decimals = 18;
        _totalSupply = 100_00_00_000 * 10 ** _decimals;
        _balanceOf[msg.sender] = _totalSupply;
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _userAddress) public view returns (uint256) {
        return _balanceOf[_userAddress];
    }

    function allowance(address _userAddress, address _spenderAddress) public view returns (uint256) {
        return _allowances[_userAddress][_spenderAddress];
    }

    //This function is just to show that there is no owner of this smart contract and no admin function to call.

    function owner() external pure returns (address) {
        return address(0);
    }

    function transfer(address _receiverAddress, uint256 _valueInWei) external returns (bool) {
        _transfer(_msgSender(), _receiverAddress, _valueInWei);
        return true;
    }

    function approve(address _spenderAddress, uint256 _valueInWei) external returns (bool) {
        _approve(_msgSender(), _spenderAddress, _valueInWei);
        return true;
    }

    function transferFrom(address _userAddress, address _receiverAddress, uint256 _valueInWei) external returns (bool) {
        _spendAllowance(_userAddress, _msgSender(), _valueInWei);
        _transfer(_userAddress, _receiverAddress, _valueInWei);
        return true;
    }

    function increaseAllowance(address _spenderAddress, uint256 _valueToIncreaseInWei) external returns (bool) {
        address _userAddress = _msgSender();
        _approve(_userAddress, _spenderAddress, allowance(_userAddress, _spenderAddress) + _valueToIncreaseInWei);
        return true;
    }

    function decreaseAllowance(address _spenderAddress, uint256 _valueToDecreaseInWei) external returns (bool) {
        address _userAddress = _msgSender();
        uint256 currentAllowance = allowance(_userAddress, _spenderAddress);
        require(currentAllowance >= _valueToDecreaseInWei, "ERC20: Decreased allowance below zero");
        unchecked {
            _approve(_userAddress, _spenderAddress, currentAllowance - _valueToDecreaseInWei);
        }

        return true;
    }


    function _transfer(address _userAddress, address _receiverAddress, uint256 _valueInWei) internal virtual {
        require(_userAddress != address(0), "ERC20: Address zero can't be the sender.");
        require(_receiverAddress != address(0), "ERC20: Address zero can't be the receiver.");

        uint256 senderBalance = _balanceOf[_userAddress];
        require(senderBalance >= _valueInWei, "ERC20: Transfer value exceeds sender balance");
        unchecked {
            _balanceOf[_userAddress] = senderBalance - _valueInWei;
            _balanceOf[_receiverAddress] += _valueInWei;
        }

        emit Transfer(_userAddress, _receiverAddress, _valueInWei);
    }

    function _approve(address _userAddress, address _spenderAddress, uint256 _valueInWei) internal virtual {
        require(_userAddress != address(0), "ERC20: Zero address can't approve.");
        require(_spenderAddress != address(0), "ERC20: Zero address approval as spender disallowed.");

        _allowances[_userAddress][_spenderAddress] = _valueInWei;
        emit Approval(_userAddress, _spenderAddress, _valueInWei);
    }

    function _spendAllowance(address _userAddress, address _spenderAddress, uint256 _valueInWei) internal virtual {
        uint256 currentAllowance = allowance(_userAddress, _spenderAddress);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= _valueInWei, "ERC20: Insufficient allowance");
            unchecked {
                _approve(_userAddress, _spenderAddress, currentAllowance - _valueInWei);
            }
        }
    }

    function _msgSender() private view returns (address) {
        return msg.sender;
    }
}