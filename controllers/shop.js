const Product = require('../models/product');

exports.getShopIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        path: '/',
        pageTitle: 'Main Page',
        products,
      });
    })
    .catch(console.log);
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      const totalPrice = products.reduce((acc, curVal) => acc + curVal.price, 0);

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products,
        totalPrice,
      });
    })
    .catch(console.log);
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  let fetchedCart;
  let newQuantity = 1;

  req.user.getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];

      if (product) {
        newQuantity += product.cartItem.quantity;
        console.log(newQuantity);
        return 1;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(console.log);
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
    .catch(console.log);
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: [Product] })
    .then((orders) => {
      console.log('Orders: ', orders);
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders,
      });
    })
    .catch(console.log);
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
    .catch(console.log);
};
