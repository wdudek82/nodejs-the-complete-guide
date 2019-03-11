const { Product } = require('../models/product');
// const User = require('../models/user');

exports.getShopIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('shop/index', {
        path: '/',
        pageTitle: 'Main Page',
        products,
      });
    })
    .catch((err) => new Error(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then((products) => {
      let totalPrice = 0;
      for (const product of products) {
        totalPrice += product.price * product.quantity;
      }

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products,
        totalPrice,
      });
    })
    .catch((err) => new Error(err));
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;

  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => new Error(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  req.user.deleteItemFromCart(productId);
  req.user.save()
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => new Error(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders,
      });
    })
    .catch((err) => new Error(err));
};

exports.postOrder = (req, res, next) => {
  req.user.addOrder()
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => new Error(err));
};
