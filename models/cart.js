const fs = require('fs');
const path = require('path');

const cartFile = path.resolve('data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(cartFile, (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }

      const existingProductIndex = cart.products.findIndex((product) => product.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id,
          quantity: 1,
        };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += parseFloat(price);

      fs.writeFile(cartFile, JSON.stringify(cart), (err2) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    });
  }
};
