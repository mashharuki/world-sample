import { task } from "hardhat/config";
import { ArgumentType } from "hardhat/types/arguments";
import { getDeployedAddress } from "./helpers.js";

const CONTRACT_KEY = "WorldModule#WorldCounter";

// ------------------------------------------------------------------
// counter:count — 現在のカウント値を取得
// ------------------------------------------------------------------
export const getCountTask = task("counter:count", "現在のカウント値を取得する")
  .setInlineAction(async (_taskArgs, hre) => {
    const { viem } = await hre.network.connect();
    const publicClient = await viem.getPublicClient();
    const chainId = Number(await publicClient.getChainId());
    const contractAddress = getDeployedAddress(chainId, CONTRACT_KEY);

    const counter = await viem.getContractAt("WorldCounter", contractAddress);
    const count = await counter.read.count();
    const owner = await counter.read.owner();

    console.log(`コントラクトアドレス : ${contractAddress}`);
    console.log(`オーナー             : ${owner}`);
    console.log(`現在のカウント       : ${count}`);
  })
  .build();

// ------------------------------------------------------------------
// counter:increment — カウントを1増やす
// ------------------------------------------------------------------
export const incrementTask = task("counter:increment", "カウントを1増やす")
  .setInlineAction(async (_taskArgs, hre) => {
    const { viem } = await hre.network.connect();
    const publicClient = await viem.getPublicClient();
    const chainId = Number(await publicClient.getChainId());
    const contractAddress = getDeployedAddress(chainId, CONTRACT_KEY);

    const counter = await viem.getContractAt("WorldCounter", contractAddress);
    const before = await counter.read.count();

    console.log(`カウント前: ${before}`);
    console.log("increment() を実行中...");

    const txHash = await counter.write.increment();
    console.log(`トランザクション: ${txHash}`);

    const after = await counter.read.count();
    console.log(`カウント後: ${after}`);
  })
  .build();

// ------------------------------------------------------------------
// counter:increment-by — カウントを指定した値だけ増やす
// ------------------------------------------------------------------
export const incrementByTask = task(
  "counter:increment-by",
  "カウントを指定した値だけ増やす",
)
  .addOption({
    name: "amount",
    description: "増加量（0より大きい整数）",
    type: ArgumentType.BIGINT,
    defaultValue: 1n,
  })
  .setInlineAction(async (taskArgs, hre) => {
    const { viem } = await hre.network.connect();
    const publicClient = await viem.getPublicClient();
    const chainId = Number(await publicClient.getChainId());
    const contractAddress = getDeployedAddress(chainId, CONTRACT_KEY);

    const amount = BigInt(taskArgs.amount ?? 1n);
    if (amount <= 0n) {
      throw new Error("amount は0より大きい値を指定してください。");
    }

    const counter = await viem.getContractAt("WorldCounter", contractAddress);
    const before = await counter.read.count();

    console.log(`カウント前: ${before}`);
    console.log(`incrementBy(${amount}) を実行中...`);

    const txHash = await counter.write.incrementBy([amount]);
    console.log(`トランザクション: ${txHash}`);

    const after = await counter.read.count();
    console.log(`カウント後: ${after}`);
  })
  .build();

// ------------------------------------------------------------------
// counter:reset — カウントをリセット（オーナーのみ）
// ------------------------------------------------------------------
export const resetTask = task(
  "counter:reset",
  "カウントをリセットする（オーナーのみ）",
)
  .setInlineAction(async (_taskArgs, hre) => {
    const { viem } = await hre.network.connect();
    const publicClient = await viem.getPublicClient();
    const chainId = Number(await publicClient.getChainId());
    const contractAddress = getDeployedAddress(chainId, CONTRACT_KEY);

    const counter = await viem.getContractAt("WorldCounter", contractAddress);
    const before = await counter.read.count();

    console.log(`カウント前: ${before}`);
    console.log("reset() を実行中...");

    const txHash = await counter.write.reset();
    console.log(`トランザクション: ${txHash}`);

    const after = await counter.read.count();
    console.log(`カウント後: ${after}`);
  })
  .build();
