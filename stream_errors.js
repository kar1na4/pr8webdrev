const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === 'GET' && reqUrl.pathname === '/missing-file') {
    const fileName = reqUrl.searchParams.get('fileName');

    if (!fileName) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Bad Request: fileName is required');
    }

    const filePath = path.join(process.cwd(), fileName);
    const readStream = fs.createReadStream(filePath);

    readStream.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal Server Error');
    });

    readStream.on('open', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      readStream.pipe(res);
    });

    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});