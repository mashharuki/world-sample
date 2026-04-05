# Contracts — World Chain Sepolia Hardhat 3 プロジェクト

Hardhat 3 を使って World Chain Sepolia にスマートコントラクトをデプロイするためのプロジェクトです。

## 必要環境

- Node.js v22以上
- npm

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 環境変数ファイルを作成
cp .env.example .env
```

`.env` を編集して以下を設定してください：

| 変数名                  | 説明                             | 取得先                                                                               |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------ |
| `WORLD_SEPOLIA_RPC_URL` | World Sepolia の RPC URL         | [Alchemy](https://alchemy.com/) または `https://worldchain-sepolia.drpc.org`（無料） |
| `PRIVATE_KEY`           | デプロイに使うウォレットの秘密鍵 | MetaMask等のウォレット                                                               |

> テスト用ETHは https://faucet.worldcoin.org/ から取得できます。

## コマンド

### ビルド（コンパイル）

```bash
npm run build
# または
npx hardhat build
```

### テスト

```bash
# 全テスト実行（Solidity + TypeScript）
npm test

# Solidity テストのみ
npm run test:solidity

# TypeScript テストのみ
npm run test:nodejs
```

### ローカルノード起動

```bash
npm run node
```

### デプロイ

**ローカル（シミュレーション）**

```bash
npm run deploy:local
```

**World Chain Sepolia テストネット**

```bash
npm run deploy:world-sepolia
```

## プロジェクト構造

```
contracts/
├── hardhat.config.ts          # Hardhat 3 設定
├── tsconfig.json
├── .env.example               # 環境変数テンプレート
├── contracts/
│   ├── *.sol                  # Solidity コントラクト
│   └── *.t.sol                # Solidity テスト（forge-std 使用）
├── test/
│   └── *.ts                   # TypeScript テスト（Viem + node:test）
└── ignition/modules/
    └── *.ts                   # Hardhat Ignition デプロイモジュール
```

## 新しいコントラクトを追加する

### 1. コントラクト作成

`contracts/MyContract.sol` を作成します。

### 2. テスト作成

- Solidity テスト → `contracts/MyContract.t.sol`
- TypeScript テスト → `test/MyContract.ts`

### 3. Ignition モジュール作成

`ignition/modules/MyModule.ts` を作成します：

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MyModule = buildModule("MyModule", (m) => {
  const myContract = m.contract("MyContract");
  return { myContract };
});

export default MyModule;
```

### 4. デプロイ

```bash
npx hardhat ignition deploy ignition/modules/MyModule.ts --network worldSepolia
```

## ネットワーク情報

| 項目           | 値                                              |
| -------------- | ----------------------------------------------- |
| ネットワーク名 | World Chain Sepolia                             |
| Chain ID       | `4801`                                          |
| RPC URL        | `https://worldchain-sepolia.drpc.org`           |
| Explorer       | https://worldchain-sepolia.explorer.alchemy.com |
| Faucet         | https://faucet.worldcoin.org/                   |

## 技術スタック

- **Hardhat 3** — スマートコントラクト開発環境
- **Solidity 0.8.28** — コントラクト言語
- **Viem** — TypeScript テスト用 Ethereum クライアント
- **forge-std** — Solidity テスト用アサーションライブラリ
- **Hardhat Ignition** — 宣言的デプロイシステム
