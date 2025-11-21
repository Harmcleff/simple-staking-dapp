// SPDX-License-Identifier: MIT
}
u.lastUpdate = block.timestamp;
}


function stake(uint256 _amount) external nonReentrant {
require(_amount > 0, "stake-amount-zero");
_updateRewards(msg.sender);
bool ok = stakingToken.transferFrom(msg.sender, address(this), _amount);
require(ok, "erc20-transfer-from-failed");
users[msg.sender].amount += _amount;
totalStaked += _amount;
emit Staked(msg.sender, _amount);
}


function unstake(uint256 _amount) external nonReentrant {
require(_amount > 0, "unstake-amount-zero");
UserInfo storage u = users[msg.sender];
require(u.amount >= _amount, "insufficient-staked");
_updateRewards(msg.sender);
u.amount -= _amount;
totalStaked -= _amount;
bool ok = stakingToken.transfer(msg.sender, _amount);
require(ok, "erc20-transfer-failed");
emit Unstaked(msg.sender, _amount);
}


function claimRewards() external nonReentrant {
_updateRewards(msg.sender);
UserInfo storage u = users[msg.sender];
uint256 reward = u.rewards;
require(reward > 0, "no-rewards");
uint256 contractBalance = stakingToken.balanceOf(address(this));
require(contractBalance >= reward + totalStaked, "insufficient-contract-funds");
u.rewards = 0;
bool ok = stakingToken.transfer(msg.sender, reward);
require(ok, "erc20-transfer-failed");
emit RewardsClaimed(msg.sender, reward);
}


function exit() external nonReentrant {
_updateRewards(msg.sender);
UserInfo storage u = users[msg.sender];
uint256 reward = u.rewards;
uint256 amount = u.amount;
require(amount > 0 || reward > 0, "nothing-to-exit");
u.rewards = 0;
u.amount = 0;
u.lastUpdate = block.timestamp;
totalStaked -= amount;
if (amount > 0) {
bool ok1 = stakingToken.transfer(msg.sender, amount);
require(ok1, "stake-transfer-failed");
}
if (reward > 0) {
uint256 contractBalance = stakingToken.balanceOf(address(this));
require(contractBalance >= reward + totalStaked, "insufficient-contract-funds");
bool ok2 = stakingToken.transfer(msg.sender, reward);
require(ok2, "reward-transfer-failed");
}
if (amount > 0) emit Unstaked(msg.sender, amount);
if (reward > 0) emit RewardsClaimed(msg.sender, reward);
}


function setAprBps(uint256 _newAprBps) external onlyOwner {
uint256 old = aprBps;
aprBps = _newAprBps;
emit AprUpdated(old, _newAprBps);
}


function emergencyWithdraw(uint256 _amount) external onlyOwner nonReentrant {
uint256 contractBalance = stakingToken.balanceOf(address(this));
require(contractBalance >= _amount + totalStaked, "not-enough-free-funds");
bool ok = stakingToken.transfer(msg.sender, _amount);
require(ok, "transfer-failed");
emit EmergencyWithdraw(msg.sender, _amount);
}


function getUserInfo(address _user) external view returns (uint256 amount, uint256 pending, uint256 lastUpdate) {
UserInfo memory u = users[_user];
amount = u.amount;
pending = pendingRewards(_user);
lastUpdate = u.lastUpdate;
}
}