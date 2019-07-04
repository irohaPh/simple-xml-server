# 使い方

## サーバ起動(デフォルトは3000番ポートで起動する)
```sh
$ npm install
$ npm start
```

### ポート番号を指定したいとき
```sh:例) ポート3333番を指定
# 以下のうち好きな方で指定可能
$ npm start 3333
$ cross-env NODE_PORT=3333 npm start
```
