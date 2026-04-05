import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Hardhat Ignition の deployed_addresses.json からコントラクトアドレスを取得する。
 *
 * @param chainId  接続中のチェーンID
 * @param key      deployed_addresses.json のキー（例: "WorldModule#WorldCounter"）
 * @returns        デプロイ済みコントラクトアドレス
 *
 * @example
 *   const address = getDeployedAddress(4801, "WorldModule#WorldCounter");
 */
export function getDeployedAddress(
  chainId: number,
  key: string,
): `0x${string}` {
  const filePath = join(
    import.meta.dirname,
    "..",
    "ignition",
    "deployments",
    `chain-${chainId}`,
    "deployed_addresses.json",
  );

  let raw: string;
  try {
    raw = readFileSync(filePath, "utf-8");
  } catch {
    throw new Error(
      `デプロイ情報が見つかりません: ${filePath}\n` +
        `先に "npx hardhat ignition deploy" を実行してください。`,
    );
  }

  const addresses: Record<string, string> = JSON.parse(raw);
  const address = addresses[key];

  if (!address) {
    const available = Object.keys(addresses).join(", ");
    throw new Error(
      `キー "${key}" が deployed_addresses.json に存在しません。\n` +
        `利用可能なキー: ${available}`,
    );
  }

  return address as `0x${string}`;
}
