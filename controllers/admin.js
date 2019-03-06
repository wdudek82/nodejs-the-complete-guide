const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    path: '/admin/add-product',
    pageTitle: 'Add Product (Admin)',
  });
};

exports.postAddProduct = (req, res, next) => {
  res.redirect('/');

  const product = new Product(req.body.title);
  product.save();

  console.log(req.body);
};

exports.getAdminProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('admin/products', {
    products,
    path: '/admin/products',
    pageTitle: 'All Products (Admin)',
  });
};
