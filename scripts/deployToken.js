const hre = require("hardhat");

async function main() {
  console.log("Deploying ERC20 token...");

  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = await Token.deploy();

  await token.waitForDeployment();

  console.log("Token deployed at:", token.target);
}

main().catch(console.error);
