# simple-xml-server

リクエストに応じて任意のXMLファイルをレスポンスするだけのシンプルなHTTPサーバです。

# 使い方

## サーバ起動(デフォルトは3000番ポートで起動する)

```sh
$ npm install
$ npm start
```

### ポート番号を指定したいとき

例) ポート3333番を指定

```sh
# 以下のうち好きな方で指定可能
$ npm start 3333
$ cross-env NODE_PORT=3333 npm start
```

## レスポンス設定

リクエストされたパスによってレスポンスファイルを切り替えるための設定を `conf/response.json` で行います
複数の設定がマッチする場合は、設定が上のものを選択します

### conf/response.json の設定方法

| 設定プロパティ | 必須 | デフォルト値 | 説明 |
| :- | :-: | :-: | :- |
| default | - | 0 | 1:マッチする設定が見つからなかった場合に使用する設定<br>※ 1を指定できるのは1つの設定のみ |
| path | default=0 の場合 ○<br>default=1 の場合は任意 | - | 判定するパス |
| match | default=0 の場合 ○<br>default=1 の場合は任意 | 'exact' | pathのマッチング方法<br>'exact': 完全一致<br>'forward': 前方一致<br>'backward': 後方一致 |
| response | ○ | - | レスポンスファイルの名前<br>※ responseディレクトリ内にあるファイルから指定する |
