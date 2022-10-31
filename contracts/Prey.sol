// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Prey {
    mapping(address => uint256) public balances;

    function updateBalance() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0);
        (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent, "Withdraw Failed");
        balances[msg.sender] = 0;
    }
}