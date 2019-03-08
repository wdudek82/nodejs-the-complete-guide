const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        path: '/products',
        pageTitle: 'All Products',
        products: rows,
      });
    })
    .catch(console.log);
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then(([rows]) => {
      const product = rows[0];
      if (!product) return res.redirect('/products');

      return res.render('shop/product-detail', {
        path: '/products',
        pageTitle: `Product :: ${product.title}`,
        product,
      });
    })
    .catch(console.log);
};
