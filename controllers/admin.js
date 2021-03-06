const { Product } = require('../models/product');

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
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user._id,
  });

  product
    .save()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => {
      throw new Error(err);
    });
};

exports.postUpdateProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const { productId } = req.body;
  const query = { _id: productId };

  Product.update(query, { title, imageUrl, description, price })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => new Error(err));
};

exports.getAdminProducts = (req, res, next) => {
  Product.find()
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
  Product.deleteOne({ _id: productId })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => new Error(err));
};
