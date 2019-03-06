const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /products => GET
router.get('/products', productsController.getProducts);

// /products/:id => GET
router.get('/products/:id', productsController.getProductDetails);

module.exports = router;
