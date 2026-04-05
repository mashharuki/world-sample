import "dotenv/config";
import { defineConfig } from "hardhat/config";
import hardhatToolboxViem from "@nomicfoundation/hardhat-toolbox-viem";
import {
  getCountTask,
  incrementTask,
  incrementByTask,
  resetTask,
} from "./tasks/worldCounter.js";

const WORLD_SEPOLIA_RPC_URL =
  process.env.WORLD_SEPOLIA_RPC_URL ?? "https://worldchain-sepolia.drpc.org";
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";

export default defineConfig({
  plugins: [hardhatToolboxViem],
  tasks: [getCountTask, incrementTask, incrementByTask, resetTask],

  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    // ローカルシミュレーション
    hardhat: {
      type: "edr-simulated",
      chainType: "generic",
    },

    // World Chain Sepolia Testnet
    // Chain ID: 4801
    // Explorer: https://worldchain-sepolia.explorer.alchemy.com
    worldSepolia: {
      type: "http",
      chainType: "generic",
      url: WORLD_SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    // World Chain Mainnet（将来用）
    // worldMainnet: {
    //   type: "http",
    //   chainType: "generic",
    //   url: process.env.WORLD_MAINNET_RPC_URL ?? "",
    //   accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    // },
  },
});
