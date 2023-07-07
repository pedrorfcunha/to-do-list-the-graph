import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-abi-exporter';
import * as dotenv from 'dotenv';

dotenv.config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  abiExporter: {
    path: './abis',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: false,
  },
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      url: 'http://localhost:8545',
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
