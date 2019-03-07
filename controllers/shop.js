const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getShopIndex = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render('shop/index', {
      path: '/',
      pageTitle: 'Main Page',
      products,
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart()
    .then((cart) => {
      Product.fetchAll()
        .then((products) => {
          const cartProducts = [];

          for (const product of products) {
            const cartProductData = cart.products.find((p) => p.id === product.id);
            if (cartProductData) {
              cartProducts.push({ ...product, quantity: cartProductData.quantity });
            }
          }

          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts,
            totalPrice: cart.totalPrice,
          });
        })
        .catch(console.log);
    })
    .catch(console.log);
};

exports.postCart = (req, res, next) => {
  const { deleting } = req.query;
  const { productId } = req.body;

  Product.findById(productId).then((product) => {
    if (deleting) {
      Cart.removeProduct(productId, product.price);
      res.redirect('/cart');
    } else {
      Cart.addProduct(productId, product.price);
      res.redirect('/products');
    }
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
