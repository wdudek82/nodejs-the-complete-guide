const { Product } = require('../models/product');
const { Order } = require('../models/order');

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
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(({ cart }) => {
      const { items } = cart;
      const totalPrice = items.reduce(
        (acc, p) => p.productId.price * p.quantity,
        0,
      );

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: items.map((p) => p.productId),
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
  req.user.removeFromCart(productId);
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      console.log('Orders', orders);
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders,
      });
    })
    .catch((err) => new Error(err));
};

// TODO: It's not working at the moment
exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return {
          quantity: i.quantity,
          product: { ...i.productId._doc },
        };
      });

      console.log('products', products);

      const order = new Order({
        user: {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          userId: req.user,
        },
        products,
      });

      console.log('Foo', 'order');

      return order.save();
    })
    .then(() => {
      console.log('Bar', 'order');
      // return req.user.clearCart();
      res.redirect('/');
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => new Error(err));
};
