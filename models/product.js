const { getDb } = require('../utils/mongodb-setup');

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    return getDb()
      .collection('product')
      .insertOne(this);
  }

  static fetchAll() {
    return getDb().collection('products')
      .find()
      .toArray() // Only for small amount of items!
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

module.exports = Product;
