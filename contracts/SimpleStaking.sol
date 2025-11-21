// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleStaking is Ownable {
    IERC20 public immutable stakingToken;

    uint256 public apr; // e.g., 150 = 15% APR
    uint256 public constant BASE = 1000; // for APR calculations

    struct StakeInfo {
        uint256 amount;
        uint256 rewardDebt;
        uint256 lastUpdate;
    }

    mapping(address => StakeInfo) public stakes;

    constructor(address _token, uint256 _apr) Ownable(msg.sender) {
        stakingToken = IERC20(_token);
        apr = _apr; 
    }

   
    // INTERNAL REWARD CALCULATOR

    function _pendingRewards(address _user) internal view returns (uint256) {
        StakeInfo memory s = stakes[_user];

        if (s.amount == 0) return 0;

        uint256 timeElapsed = block.timestamp - s.lastUpdate;

        // reward = amount * APR% * time / 365 days
        uint256 yearlyReward = (s.amount * apr) / BASE;
        uint256 reward = (yearlyReward * timeElapsed) / 365 days;

        return reward + s.rewardDebt;
    }


    // VIEW: EXTERNAL PENDING REWARDS

    function pendingRewards(address _user) external view returns (uint256) {
        return _pendingRewards(_user);
    }

    // STAKE
    
    function stake(uint256 _amount) external {
        require(_amount > 0, "Zero amount");

        StakeInfo storage s = stakes[msg.sender];

        // Update accumulated rewards
        s.rewardDebt = _pendingRewards(msg.sender);
        s.lastUpdate = block.timestamp;

        // Take tokens
        stakingToken.transferFrom(msg.sender, address(this), _amount);

        // Add to stake
        s.amount += _amount;
    }

    // CLAIM REWARDS

    function claim() public {
        StakeInfo storage s = stakes[msg.sender];

        uint256 reward = _pendingRewards(msg.sender);
        require(reward > 0, "No rewards");

        // Reset reward tracking
        s.rewardDebt = 0;
        s.lastUpdate = block.timestamp;

        // Send reward (paid with same token)
        stakingToken.transfer(msg.sender, reward);
    }


    // UNSTAKE

    function unstake(uint256 _amount) external {
        StakeInfo storage s = stakes[msg.sender];
        require(s.amount >= _amount, "Not enough staked");

        // Claim rewards first
        claim();

        // Update last update
        s.lastUpdate = block.timestamp;

        // Remove stake
        s.amount -= _amount;

        // Return tokens
        stakingToken.transfer(msg.sender, _amount);
    }

    // GET STAKED BALANCE

    function stakedBalance(address _user) external view returns (uint256) {
    return stakes[_user].amount;
}

    
    // ADMIN — UPDATE APR
  
    function setAPR(uint256 _newAPR) external onlyOwner {
        apr = _newAPR;
    }
}
