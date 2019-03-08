const db = require('../utils/database');

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    return db.execute(
      `INSERT INTO products (title, price, imageUrl, description)
      VALUES (?, ?, ?, ?)`,
      [this.title, this.price, this.imageUrl, this.description],
    );
  }

  static delete(id) {
    db.execute('DELETE FROM products WHERE id=?', [id]);
  }

  static findById(id) {
    console.log('findById');
    return db.execute('SELECT * FROM products WHERE id=?', [id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }
};
