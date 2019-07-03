const fs = require('fs');
const urlParser = require('url');
const http = require('http');
const server = http.createServer();

const host = '127.0.0.1';
const port = process.env.PORT || process.argv[2] || 8200;

server.on('request', function(req, res) {
  const { method, url } = req;
  const { path, pathname, query } = urlParser.parse(url);
  console.log(
    `request received. method: [${method}] path: [${path}] pathname: [${pathname}] query: [${query}]`
  );

  let xmlFile = 'response/';
  switch (true) {
    case /^\/hoge/.test(pathname):
      xmlFile += 'hoge.xml';
      break;

    default:
      xmlFile += 'default.xml';
      break;
  }

  res.writeHead(200, { 'Content-Type': 'application/xml; charset=UTF-8' });
  res.write(fs.readFileSync(xmlFile, { encoding: 'utf-8' }));

  res.end();
});

server.listen(port, host);
console.log(`Server listening on ${host} port ${port}...`);
