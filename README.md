# Re-Entrancy

An example of how a malicious user can drain funds not intended for them from a seemingly secure contract

# Prevention

Either update the user's balance before they withdraw, this prevents callback into the withdraw function. Or use a modifier, like OpenZeppelin's [ReentrancyGuard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol) library modifier nonReentrant.

```shell
npm install
npx hardhat test
```
