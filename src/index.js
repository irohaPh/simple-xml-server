const fs = require('fs');
const urlParser = require('url');
const http = require('http');
const server = http.createServer();

const host = '127.0.0.1';
const port = process.env.NODE_PORT || process.argv[2] || 3000;

const settings = require('../conf/response.json');

server.on('request', function(req, res) {
  const { method, url } = req;
  const { path, pathname, query } = urlParser.parse(url);
  console.log(
    `request received. method: [${method}] path: [${path}] pathname: [${pathname}] query: [${query}]`
  );

  /* リクエストされたパスにマッチする設定を取得(見つからなければデフォルト設定を取得) */
  const matchSetting =
    settings
      .filter(s => s.path !== undefined)
      .filter(s => {
        let reg = new RegExp(
          (s.match === 'backward' ? '' : '^/') +
            s.path +
            (s.match === 'forward' ? '' : '$')
        );
        return pathname.match(reg);
      })
      .shift() || settings.filter(s => s.default).shift();

  /* 設定に応じたレスポンスの生成 */
  if (matchSetting) {
    try {
      let xmlFile = `response/${matchSetting.response}`;
      fs.statSync(xmlFile); // ファイルが存在しない場合は例外を投げる

      res.writeHead(200, { 'Content-Type': 'application/xml; charset=UTF-8' });
      res.write(fs.readFileSync(xmlFile, { encoding: 'utf-8' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/xml; charset=UTF-8' });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/xml; charset=UTF-8' });
  }

  res.end();
});

server.listen(port, host);
console.log(`Server listening on ${host} port ${port}...`);
