//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

struct Account {
    address userAddress;
}

contract MonthlyRewardsUpgradeable {
    function setSelfBusines(
        address _userAddress,
        uint256 _valueInUSD
    ) external {}

    function setDirectBusines(
        address _userAddress,
        uint256 _valueInUSD
    ) external {}

    function setTeamBusines(
        address _userAddress,
        uint256 _valueInUSD
    ) external {}
}
