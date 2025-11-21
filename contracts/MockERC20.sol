// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MockERC20 is ERC20, Ownable {
constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
// mint initial supply to deployer for convenience
_mint(msg.sender, 1_000_000 ether);
}


function mint(address to, uint256 amount) external onlyOwner {
_mint(to, amount);
}
}