
const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getShopIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/index', {
        path: '/',
        pageTitle: 'Main Page',
        products,
      });
    });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  console.log('Product added to cart:', productId);

  Product.findById(productId)
    .then((product) => {
      Cart.addProduct(productId, product.price);
      res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
