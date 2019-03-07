const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    path: '/admin/edit-product',
    pageTitle: 'Add Product (Admin)',
    editing: false,
    product: {},
  });
};

exports.postCreateOrUpdateProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const { productId } = req.body;
  const product = new Product(title, imageUrl, description, price);
  if (productId) {
    product.id = productId;
  }
  product.save();

  res.redirect('/admin/products');
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render('admin/products', {
      path: '/admin/products',
      pageTitle: 'All Products (Admin)',
      products,
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        res.redirect('/admin/products');
      }

      res.render('admin/edit-product', {
        path: '/admin/products',
        pageTitle: `Edit Product :: ${product.title}`,
        editing: true,
        product,
      });
    })
    .catch(console.log);
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.delete(productId);
  res.redirect('/admin/products');
};
