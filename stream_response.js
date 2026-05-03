const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);
  const fileName = reqUrl.searchParams.get('fileName');

  if (!fileName) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Bad Request');
  }

  const filePath = path.join(process.cwd(), fileName);

  const readStream = fs.createReadStream(filePath);

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

  readStream.pipe(res);

  readStream.on('error', (err) => {
    res.end('Bad Request');
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});