const Product = require('../models/product');

exports.getShopIndex = (req, res, next) => {
  Product.fetchAll()
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
  req.user.getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => new Error(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: [Product] })
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
  let orderedProducts;
  let fetchedCart;

  req.user.getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      orderedProducts = products;
      return req.user.createOrder();
    })
    .then((order) => {
      return order.addProducts(orderedProducts.map(((product) => {
        const updProduct = product;
        updProduct.orderItem = { quantity: updProduct.cartItem.quantity };
        return updProduct;
      })));
    })
    .then(() => {
      fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => new Error(err));
};
