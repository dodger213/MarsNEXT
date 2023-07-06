const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const gas = await ethers.provider.getGasPrice();

  console.log("Gas price is ", gas);

  console.log("Deploying contracts with the account:", deployer.address);
  const balance = await deployer.getBalance();
  const formatedBalance = ethers.utils.formatEther(balance);

  console.log("Account balance:", formatedBalance.toString(), "ETH");

  const contract = await ethers.getContractFactory("MarsNextProtocol");
  const mc = await contract.deploy();

  await mc.deployed();
  console.log("Contract deployed to:", mc.address);
  console.log("Contract deployment fees:", mc.deployTransaction);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
