const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /products => GET
router.get('/products', productsController.getProducts);

// /product/delete/:productId => DELETE
// router.delete('/product/delete/:productId');

// /products/:productId => GET
router.get('/products/:productId', productsController.getProduct);

module.exports = router;
