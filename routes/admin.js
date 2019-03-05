const express = require('express');
const path = require('path');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.resolve('views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/product', (req, res, next) => {
  res.redirect('/');
  console.log(`Product name: ${req.body.name}`);
});

module.exports = router;
