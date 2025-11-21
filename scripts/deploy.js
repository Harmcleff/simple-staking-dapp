const hre = require("hardhat");

async function main() {

  // 1. CONFIGURE

  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";   
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
