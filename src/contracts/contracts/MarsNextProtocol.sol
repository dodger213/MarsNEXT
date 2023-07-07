// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MarsNextProtocol is ERC20, Ownable {
    constructor() ERC20("MarsNext", "MNXT") {
        _addInitialSupply(msg.sender, 100_00_00_000 * 10 ** decimals());
    }
}
