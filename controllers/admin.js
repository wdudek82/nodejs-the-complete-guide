const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    path: '/admin/edit-product',
    pageTitle: 'Add Product (Admin)',
    editing: false,
    product: {},
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, price, description, imageUrl } = req.body;
  const product = new Product(title, price, description, imageUrl, null, req.user._id);

  product.save()
    .then(() => {
      console.log('Product added to Shop Database');
      res.redirect('/admin/products');
    })
    .catch((err) => {
      throw new Error(err);
    });
};

exports.postCreateOrUpdateProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const { productId } = req.body;

  new Product(title, price, description, imageUrl, productId)
    .save()
    .then(() => {
      console.log('Product created/updated');
      res.redirect('/admin/products');
    }).catch((err) => new Error(err));
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('admin/products', {
        path: '/admin/products',
        pageTitle: 'All Products (Admin)',
        products,
      });
    })
    .catch((err) => {
      throw new Error(err);
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
    .catch((err) => new Error(err));
};

exports.deleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.deleteById(productId)
    .then(() => {
      console.log('Product deleted');
      res.redirect('/admin/products');
    })
    .catch((err) => new Error(err));
};
