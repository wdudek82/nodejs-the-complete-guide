const db = require('../utils/database');

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {}

  static delete(id) {}

  static findById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }
};
