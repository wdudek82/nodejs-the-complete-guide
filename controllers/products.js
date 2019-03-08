const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        path: '/products',
        pageTitle: 'All Products',
        products,
      });
    })
    .catch(console.log);
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  // Product.findByPk(productId)
  Product.findByPk(productId)
    .then((product) => {
      if (!product) return res.redirect('/products');

      return res.render('shop/product-detail', {
        path: '/products',
        pageTitle: `Product :: ${product.title}`,
        product,
      });
    })
    .catch(console.log);
};
