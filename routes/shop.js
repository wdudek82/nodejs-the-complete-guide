const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(adminData.products);
  const { products } = adminData;
  res.render('shop', { products, pageTitle: 'Shop', path: '/', activeShop: true });
});

module.exports = router;
