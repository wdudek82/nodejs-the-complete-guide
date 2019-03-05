const express = require('express');
const path = require('path');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.resolve('views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  res.redirect('/');
  console.log(req.body);
});

module.exports = router;
