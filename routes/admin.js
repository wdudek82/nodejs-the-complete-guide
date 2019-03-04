const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.send(`
    <html>
      <head>
        <title>Add Product</title>
      </head>
      <body>
        <form action="/admin/product" method="POST">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      </body>
    </html>
  `);
});

router.post('/product', (req, res, next) => {
  res.redirect('/');
  console.log(`Product name: ${req.body.name}`);
});

module.exports = router;
