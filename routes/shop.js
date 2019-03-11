const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// index => GET
router.get('/', shopController.getShopIndex);

// /cart => GET
router.get('/cart', shopController.getCart);

// /cart => POST
router.post('/cart', shopController.postCart);

// /cart/delete => POST
router.post('/cart/delete', shopController.postCartDeleteProduct);

// // /create-order => POST
// router.post('/create-order', shopController.postOrder);
//
// // /orders => GET
// router.get('/orders', shopController.getOrders);
//
// // /checkout => GET
// router.get('/checkout', shopController.getCheckout);

module.exports = router;
