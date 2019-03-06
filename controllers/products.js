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
    .catch(console.log);
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.id;

  Product.getById(productId)
    .then((product) => {
      console.log('Product detail:', productId, product);

      res.render('shop/product-detail', {
        path: `/products/${productId}`,
        pageTitle: `Product ${productId}`,
        productId,
        product,
      });
    })
    .catch(console.log);
};
