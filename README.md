# simple-xml-server

リクエストに応じて任意のXMLファイルをレスポンスするだけのシンプルなHTTPサーバです。

# 使い方

## サーバ起動(デフォルトは3000番ポートで起動する)

```sh
$ npm install
$ npm start
Server listening on 127.0.0.1 port 3000...
```

### ポート番号を指定したいとき

例) ポート3333番を指定

```sh
# 以下のうち好きな方で指定可能
$ npm start 3333
$ cross-env NODE_PORT=3333 npm start
Server listening on 127.0.0.1 port 3333...
```

## レスポンス設定

リクエストされたパスによってレスポンスファイルを切り替えるための設定を `conf/response.json` で行います。  
複数の設定がマッチする場合は、設定が上のものを選択します。

### conf/response.json の設定方法

| 設定プロパティ | 必須 | デフォルト値 | 説明 |
| :- | :-: | :-: | :- |
| default | - | 0 | 1:マッチする設定が見つからなかった場合に使用する設定<br>※ 1を指定できるのは1つの設定のみ |
| path | default=0 の場合 ○<br>default=1 の場合は任意 | - | 判定するパスを正規表現で指定する |
| response | ○ | - | レスポンスファイルの名前<br>※ responseディレクトリ内にあるファイルから指定する |

# Dockerを利用する

## 使い捨てのnodeコンテナを用意してサーバ起動

以下のコマンドで、使い捨てのコンテナを立ち上げてログインできます。  
ポート番号を変更したい場合は、 `NODE_PORT` と `-p` に続くポート番号の指定を全て変えてください。

```sh
$ docker run -it --rm --name node-server -v "$(pwd)":/tmp -w /tmp -e NODE_HOST=0.0.0.0 -e NODE_PORT=3000 -p 3000:3000 node:latest /bin/bash
```

コンテナへログイン後は以下のコマンドでサーバを起動できます。

```sh
> npm install
> npm start
Server listening on 0.0.0.0 port 3000...
```