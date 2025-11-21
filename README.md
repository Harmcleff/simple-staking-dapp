# Simple Staking DApp (Hardhat + React)

This project is a simple staking DApp where users can stake an ERC-20 token and earn rewards at a fixed APR.  
It includes the smart contracts, deployment scripts, tests, and a React frontend.

---

## 🔥 What This Project Includes
- ERC-20 token (for testing)
- Staking contract (fixed APR)
- Hardhat setup
- Deployment scripts
- Unit tests
- React frontend (connect wallet, stake, unstake)

---

## 📂 Folder Structure

simple-staking-dapp/
│
├── contracts/
│ ├── MyToken.sol
│ └── SimpleStaking.sol
│
├── scripts/
│ ├── deployToken.js
│ └── deployStaking.js
│
├── test/
│ └── SimpleStaking.test.js
│
├── frontend/
│ └── src/...
│
└── hardhat.config.js

---

## ⚙️ Installation

### 1. Clone the project

git clone https://github.com/yourname/simple-staking-dapp

cd simple-staking-dapp

### 2. Install backend dependencies

npm install

### 3. Install Hardhat Toolbox (Ethers v6 compatible)
npm install --save-dev @nomicfoundation/hardhat-toolbox ethers@6