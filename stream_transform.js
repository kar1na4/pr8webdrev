const http = require('http');
const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === 'GET' && reqUrl.pathname === '/upper') {
    const fileName = reqUrl.searchParams.get('fileName');

    if (!fileName) {
      res.writeHead(400);
      return res.end('Bad Request: fileName is required');
    }

    const filePath = path.join(process.cwd(), fileName);
    const readStream = fs.createReadStream(filePath);

    const upperTransform = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
      }
    });

    readStream.on('open', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      readStream.pipe(upperTransform).pipe(res);
    });

    readStream.on('error', () => {
      res.writeHead(400);
      res.end('Bad Request: file not found');
    });

    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});