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
    this.id = Math.random().toString();
    const products = await this.constructor.fetchAll();

    products.push(this);
    fs.writeFile(productsFile, JSON.stringify(products), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }

  static findById(productId) {
    return getProductsFromFile()
      .then((products) => {
        return products.find((product) => product.id === productId);
        // if (products.length > id) {
        //   return products[id];
        // }
        // return { title: `No product with id ${id}` };
      })
      .catch(console.log);
  }

  static fetchAll() {
    return getProductsFromFile();
  }
};
