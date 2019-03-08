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
  Product.create({
    title,
    imageUrl,
    description,
    price,
  })
    .then((result) => {
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(console.log);
};

exports.getAdminProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        path: '/admin/products',
        pageTitle: 'All Products (Admin)',
        products,
      });
    })
    .catch(console.log);
};

exports.getEditProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findByPk(productId)
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
  Product.destroy({ where: { id: productId } });
  res.redirect('/admin/products');
};
