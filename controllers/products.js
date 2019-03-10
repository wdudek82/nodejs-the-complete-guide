const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        path: '/products',
        pageTitle: 'All Products',
        products,
      });
    })
    .catch((err) => new Error(err));
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
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
