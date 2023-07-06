// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";

/// @custom:security-contact security@marsnext.io
contract MarsNextProtocol is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, ERC20Permit, ERC20FlashMint {
    constructor() ERC20("MarsNext", "MRSNXT") ERC20Permit("MarsNext") {
        _addSupply(msg.sender, 100_00_00_000 * 10 ** decimals());
    }

    function snapshot() external {
        _snapshot();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}
