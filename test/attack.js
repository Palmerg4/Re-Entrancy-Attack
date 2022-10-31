const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("Attack the prey contract, draining all funds", () => {
    it("Should empty the balance of the prey contract", async () => {
        // Deploying prey contract
        const preyFactory = await ethers.getContractFactory("Prey");
        const prey = await preyFactory.deploy();
        await prey.deployed();


        // Deploying predator contract
        const predatorFactory = await ethers.getContractFactory("Predator");
        const predator = await predatorFactory.deploy(prey.address);
        await predator.deployed();

        const [user, attacker] = await ethers.getSigners();

        // Normal user deposits value
        let tx = await prey.connect(user).updateBalance({
            value: parseEther("10"),
        });
        await tx.wait();

        // Check prey contract balance
        let balance = await ethers.provider.getBalance(prey.address);
        expect(balance).to.equal(parseEther("10"));

        tx = await predator.connect(attacker).attack({
            value: parseEther("1"),
        });
        await tx.wait();

        // Check prey contract balance is 0 and contract has been exploited via re-entrancy
        balance = await ethers.provider.getBalance(prey.address);
        expect(balance).to.equal(BigNumber.from("0"));

        balance = await ethers.provider.getBalance(predator.address);
        expect(balance).to.equal(parseEther("11"));
    });
});