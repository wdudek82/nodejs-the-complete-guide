const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// index => GET
router.get('/', shopController.getShopIndex);

// /cart => GET
router.get('/cart', shopController.getCart);

// /checkout => GET
router.get('/checkout', shopController.getCheckout);

module.exports = router;
