require("dotenv").config();
require("@nomiclabs/hardhat-ethers");


const ALCHEMY = process.env.ALCHEMY_API_URL || "";
const PK = process.env.PRIVATE_KEY || "";


module.exports = {
solidity: {
version: "0.8.20",
settings: { optimizer: { enabled: true, runs: 200 } }
},
networks: {
hardhat: {},
localhost: { url: "http://127.0.0.1:8545" },
sepolia: {
url: ALCHEMY,
accounts: PK ? [PK] : []
}
}
};