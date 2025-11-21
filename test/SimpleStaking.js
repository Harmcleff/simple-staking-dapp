const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStaking", function () {
  let staking, token, owner, user;
  const APR = 150; // 15%

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    // Deploy test ERC20 token
    const Token = await ethers.getContractFactory("ERC20PresetMinterPauser");
    token = await Token.deploy("TestToken", "TTK");
    await token.waitForDeployment();

    // Mint tokens to user
    await token.mint(user.address, ethers.parseEther("1000"));

    // Deploy staking contract
    const Staking = await ethers.getContractFactory("SimpleStaking");
    staking = await Staking.deploy(await token.getAddress(), APR);
    await staking.waitForDeployment();
  });

  it("Should allow staking", async () => {
    const amount = ethers.parseEther("100");

    // Approve and stake
    await token.connect(user).approve(await staking.getAddress(), amount);
    await staking.connect(user).stake(amount);

    const stakeInfo = await staking.stakes(user.address);
    expect(stakeInfo.amount).to.equal(amount);
  });

  it("Should accumulate rewards over time", async () => {
    const amount = ethers.parseEther("100");

    await token.connect(user).approve(await staking.getAddress(), amount);
    await staking.connect(user).stake(amount);

    // move forward by 30 days
    await ethers.provider.send("evm_increaseTime", [30 * 24 * 3600]);
    await ethers.provider.send("evm_mine");

    const pending = await staking.pendingRewards(user.address);

    expect(pending).to.be.gt(0); // rewards > 0
  });

  it("Should allow claiming rewards", async () => {
    const amount = ethers.parseEther("100");

    await token.connect(user).approve(await staking.getAddress(), amount);
    await staking.connect(user).stake(amount);

    // Increase time 30 days
    await ethers.provider.send("evm_increaseTime", [30 * 24 * 3600]);
    await ethers.provider.send("evm_mine");

    const before = await token.balanceOf(user.address);

    await staking.connect(user).claim();

    const after = await token.balanceOf(user.address);
    expect(after).to.be.gt(before); // user got rewards
  });

  it("Should allow unstaking", async () => {
    const amount = ethers.parseEther("100");

    await token.connect(user).approve(await staking.getAddress(), amount);
    await staking.connect(user).stake(amount);

    await staking.connect(user).unstake(amount);

    const stakeInfo = await staking.stakes(user.address);

    expect(stakeInfo.amount).to.equal(0);
  });

  it("Should revert unstake if amount too high", async () => {
    await expect(staking.connect(user).unstake(10)).to.be.reverted;
  });

  it("Only owner can set APR", async () => {
    await expect(staking.connect(user).setAPR(200)).to.be.reverted;
    
    await expect(staking.connect(owner).setAPR(200)).not.to.be.reverted;
  });
});
