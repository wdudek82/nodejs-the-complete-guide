const fs = require('fs');

const requestHandler = (req, res) => {
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
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log('parsed body:', parsedBody);

      const message = parsedBody.split('=')[1];
      fs.writeFileSync('hello.txt', message, (err) => {
        if (err) throw err;

        res.writeHead(302, {
          Location: '/foo',
        });
        return res.end();
      });
    });
  }

  res.write('<html>');
  res.write('<head><title>Hello!</title></head>');
  res.write('<body><h1>Hello, World!</h1></form></body>');
  res.write('</html>');
  return res.end();
};


module.exports = {
  handler: requestHandler,
  someText: 'Some hardcoded text',
};
