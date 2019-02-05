const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { url, method } = req;

  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('hello.txt', 'Hello from the Browser!:)');
    res.writeHead(302, {
      Location: '/foo',
    });
    return res.end();
  }

  res.write('<html>');
  res.write('<head><title>Hello!</title></head>');
  res.write('<body><h1>Hello, World!</h1></form></body>');
  res.write('</html>');
  return res.end();
});

server.listen(3000);
