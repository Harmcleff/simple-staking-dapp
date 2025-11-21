import { useState, useEffect } from "react";
import { ethers } from "ethers";

import tokenABI from "./contracts/MyToken.json";
import stakingABI from "./contracts/SimpleStaking.json";

const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const STAKING_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

function App() {
  const [account, setAccount] = useState(null);

  const [token, setToken] = useState(null);
  const [staking, setStaking] = useState(null);

  const [balance, setBalance] = useState("0");
  const [staked, setStaked] = useState("0");
  const [amount, setAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");

  // Connect Metamask
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setAccount(address);

    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenABI.abi, signer);
    const stakingContract = new ethers.Contract(STAKING_ADDRESS, stakingABI.abi, signer);

    setToken(tokenContract);
    setStaking(stakingContract);
  };

  // Load balances
  const loadBalances = async () => {
    if (!token || !staking || !account) return;

    const bal = await token.balanceOf(account);
    
    // Your contract stores staked balances here:
    const stakeInfo = await staking.stakes(account);
    const st = stakeInfo.amount; 

    console.log("Wallet:", ethers.formatEther(bal));
    console.log("Staked:", ethers.formatEther(st));

    setBalance(ethers.formatEther(bal));
    setStaked(ethers.formatEther(st));
  };

  useEffect(() => {
    loadBalances();
  }, [token, staking, account]);

  // Stake
  const stake = async () => {
    if (!amount) return;

    const value = ethers.parseEther(amount);

    const tx1 = await token.approve(STAKING_ADDRESS, value);
    await tx1.wait();

    const tx2 = await staking.stake(value);
    await tx2.wait();

    loadBalances();
  };

  // Unstake
  const unstake = async () => {
    if (!unstakeAmount) return alert("Input amount to unstake");

    const value = ethers.parseEther(unstakeAmount);

    const tx = await staking.unstake(value);
    await tx.wait();

    loadBalances();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Simple Staking DApp</h1>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected: {account}</p>
      )}

      <h2>Your Balances</h2>
      <p><b>Wallet:</b> {balance} CLE</p>
      <p><b>Staked:</b> {staked} CLE</p>

      <hr />

      <h3>Stake Tokens</h3>
      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={stake}>Stake</button>

      <h3>Unstake</h3>
      <input
        type="number"
        placeholder="Amount to Unstake"
        onChange={(e) => setUnstakeAmount(e.target.value)}
      />
      <button onClick={unstake}>Unstake</button>
    </div>
  );
}

export default App;
