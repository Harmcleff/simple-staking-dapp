const hre = require("hardhat");

async function main() {

  // 1. CONFIGURE

  const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";   
  const apr = 150; 


  // 2. DEPLOY CONTRACT

  console.log("Deploying SimpleStaking...");

  const Staking = await hre.ethers.getContractFactory("SimpleStaking");
  const staking = await Staking.deploy(tokenAddress, apr);

  await staking.waitForDeployment();

  console.log("SimpleStaking deployed to:", staking.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
