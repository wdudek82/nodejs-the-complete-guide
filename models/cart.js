const db = require('mysql2');

module.exports = class Cart {
  static addProduct(id) {
    db.execute(`INSERT INTO cart (productId) VALUES (${id})`);
  }

  static removeProduct(id) {
    db.execute(`DELETE FROM cart WHERE id=${id}`);
  }

  static async getCart() {
    return db.execute('SELECT * FROM cart');
  }
};
