# 🚀 Simple Staking DApp (Hardhat + React)

A clean, beginner-friendly decentralized application that allows users to **stake ERC-20 tokens**, earn rewards at a fixed APR, and manage their staking balance—all powered by **Hardhat**, **Solidity**, and a **React frontend**.

---

## 🔥 Features

- ✔ **Custom ERC-20 Test Token**
- ✔ **Simple Staking Contract** (fixed APR)
- ✔ **Reward Accrual Based on Time Staked**
- ✔ **Reentrancy Protection**
- ✔ **Hardhat Deployment Scripts**
- ✔ **Unit Tests**
- ✔ **React Frontend:**
  - Connect Wallet
  - View Wallet Balance
  - View Staked Balance
  - Stake Tokens
  - Unstake + Auto-claim Rewards

---

## 📁 Project Structure

```
simple-staking-dapp/
│
├── contracts/
│   ├── MyToken.sol
│   └── SimpleStaking.sol
│
├── scripts/
│   ├── deployToken.js
│   └── deployStaking.js
│
├── test/
│   └── SimpleStaking.test.js
│
├── frontend/
│   └── src/...
│
├── hardhat.config.js
└── README.md
```

---

## ⚙️ 1. Installation & Setup

### Clone the repository

```bash
git clone https://github.com/yourname/simple-staking-dapp
cd simple-staking-dapp
```

---

## 🔧 2. Backend Setup (Hardhat)

### Install backend dependencies

```bash
npm install
```

### Install Hardhat toolbox (Ethers v6 compatible)

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox ethers@6
```

### Install OpenZeppelin contracts

Works with Solidity ^0.8.20 and later

```bash
npm install @openzeppelin/contracts
```

---

## 🛠 3. Compile the Contracts

```bash
npx hardhat compile
```


## 🚀 4. Deploying to Local Hardhat Network

### Start the local blockchain

```bash
npx hardhat node
```

### Deploy the token

```bash
npx hardhat run scripts/deployToken.js --network localhost
```

### Deploy the staking contract

```bash
npx hardhat run scripts/deployStaking.js --network localhost
```

### Copy the deployed contract addresses

Use these in your frontend:

```
MyToken Address:        0x...
SimpleStaking Address:  0x...
```

---

## 💻 5. Frontend Setup (React)

### Navigate to the frontend folder

```bash
cd frontend
npm install
npm start
```

The app will start at:

```
http://localhost:3000
```

---

## 🎯 Frontend Features

The React UI allows you to:

- Connect MetaMask
- Fetch wallet token balance
- Fetch staked balance from the staking contract
- Approve tokens for staking
- Stake tokens
- Unstake tokens (includes reward claim)
- Auto-refresh balances after every action

---

## 🧪 6. Running Unit Tests

To run the full test suite:

```bash
npx hardhat test
```

---

## 🧱 7. Environment Requirements

- Node.js 16+
- MetaMask Extension
- Hardhat
- OpenZeppelin Contracts
- React

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to add more features—multi-pool staking, auto-compounding, UI redesign—feel free to open an issue.

---

## 📝 License

This project is released under the MIT License.

---

## 📚 Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Ethers.js Documentation](https://docs.ethers.org)
- [React Documentation](https://react.dev)

---

## 🐛 Troubleshooting

### MetaMask not connecting?

1. Make sure MetaMask is installed and unlocked
2. Check that you're connected to the correct network (Localhost 8545)
3. Try resetting your MetaMask account (Settings → Advanced → Reset Account)

### Transaction failing?

1. Ensure you have enough tokens to stake
2. Check that you've approved the staking contract to spend your tokens
3. Verify the contract addresses are correct in your frontend

### Compilation errors?

1. Make sure you're using compatible versions of Solidity and OpenZeppelin
2. Run `npx hardhat clean` and then `npx hardhat compile` again
3. Check that all imports are correct

---

**Built with ❤️ using Hardhat, Solidity, and React**