## Mini App を作成する

[Mini apps](https://docs.worldcoin.org/mini-apps) を使うと、サードパーティ開発者は World App 内でネイティブアプリのように動作するアプリケーションを作成できます。

このテンプレートを使うことで、認証機能や、やや実装が難しいコマンドのサンプルを含む構成をすばやく立ち上げられます。

## はじめに

1. `.env.example` を `.env.local` にコピーします。
2. `.env.local` ファイル内の説明に従って設定します。
3. `npm run dev` を実行します。
4. `ngrok http 3000` を実行します。
5. `npx auth secret` を実行して、`.env.local` 内の `AUTH_SECRET` を更新します。
6. `next.config.ts` の `allowedDevOrigins` に自分のドメインを追加します。
7. 【テスト用】ngrok のようなプロキシを使っている場合は、`.env.local` 内の `AUTH_URL` を ngrok の URL に更新してください。
8. developer.worldcoin.org に進み、アプリが正しい ngrok URL に接続されていることを確認します。
9. 【任意】Verify と Send Transaction を利用するには、Developer Portal 側で追加設定が必要です。手順はそれぞれのコンポーネントファイルに記載されています。

## 認証

このスターターキットでは、ユーザー認証に [MiniKit](https://github.com/worldcoin/minikit-js) の Wallet Auth を使い、セッション管理に [next-auth](https://authjs.dev/getting-started) を使っています。

## UI ライブラリ

このスターターキットでは、アプリのスタイリングに [Mini Apps UI Kit](https://github.com/worldcoin/mini-apps-ui-kit) を使っています。[World App のデザインシステム](https://docs.world.org/mini-apps/design/app-guidelines) に準拠するため、UI Kit の利用を推奨します。

## Eruda

[Eruda](https://github.com/liriliri/eruda) は、Mini App として開発中にコンソールを確認できるツールです。本番環境では無効化してください。

## コントリビュート

このテンプレートは、[supercorp-ai](https://github.com/supercorp-ai) チームの協力を受けて作成されました。
