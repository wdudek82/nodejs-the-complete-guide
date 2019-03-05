const express = require('express');

const router = express.Router();
const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    activeAddProduct: true,
  });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  res.redirect('/');
  products.push({ title: req.body.title });
  console.log(req.body);
});

module.exports.routes = router;
module.exports.products = products;
