const fs = require('fs');
const path = require('path');

const productsFile = path.resolve('data', 'products.json');

const getProductsFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(productsFile, 'utf8', (err, data) => {
      if (err) return resolve([]);
      return resolve(JSON.parse(data));
    });
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    let products = await this.constructor.fetchAll();

    if (!this.id) {
      this.id = Math.random().toString();
    } else {
      products = products.filter((product) => product.id !== this.id);
    }

    products.push(this);

    fs.writeFile(productsFile, JSON.stringify(products), (err) => {
      if (err) throw err;
    });
  }

  static delete(productId) {
    getProductsFromFile()
      .then((products) => {
        const updProducts = products.filter((product) => product.id !== productId);
        fs.writeFile(productsFile, JSON.stringify(updProducts), (err) => {
          if (err) throw err;
        });
      })
      .catch(console.log);
  }

  static findById(productId) {
    return getProductsFromFile()
      .then((products) => {
        return products.find((product) => product.id === productId);
      })
      .catch(console.log);
  }

  static fetchAll() {
    return getProductsFromFile();
  }
};
