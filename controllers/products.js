const products = [];

exports.getProducts = (req, res, next) => {
  console.log(products);
  res.render('shop', { products, pageTitle: 'Shop', path: '/', activeShop: true });
};

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  res.redirect('/');
  products.push({ title: req.body.title });
  console.log(req.body);
};
