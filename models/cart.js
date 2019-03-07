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
      cart.totalPrice = parseFloat((cart.totalPrice + parseFloat(price)).toFixed(2));

      fs.writeFile(cartFile, JSON.stringify(cart), (err2) => {
        if (err2) throw err;
      });
    });
  }

  static removeProduct(id, price) {
    fs.readFile(cartFile, (err, data) => {
      const cart = JSON.parse(data);
      if (err) return;
      const updProducts = cart.products
        .map((product) => {
          const updProduct = product;
          if (product.id === id) {
            updProduct.quantity -= 1;
            cart.totalPrice = parseFloat((cart.totalPrice - parseFloat(price)).toFixed(2));
            return updProduct;
          }
          return product;
        })
        .filter((product) => product.quantity > 0);

      const updCart = {
        products: updProducts,
        totalPrice: cart.totalPrice,
      };

      fs.writeFile(cartFile, JSON.stringify(updCart), (err2) => {
        if (err2) throw err;
      });
    });
  }

  static async getCart() {
    return new Promise((resolve, reject) => {
      fs.readFile(cartFile, (err, data) => {
        if (err) return resolve({ products: [], totalPrice: 0 });
        return resolve(JSON.parse(data));
      });
    });
  }
};
