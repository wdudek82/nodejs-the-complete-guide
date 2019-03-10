const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/mongodb-setup');

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const dbOperation = getDb().collection('products');

    if (this._id) {
      return dbOperation
        .updateOne({ _id: this._id }, { $set: this });
    }

    return dbOperation
      .insertOne(this);
  }

  update() {
    return this.save;
  }

  static fetchAll() {
    return getDb().collection('products')
      .find()
      .toArray(); // Only for a small amount of items!
  }

  static findById(id) {
    return getDb().collection('products')
      .find({ _id: new ObjectId(id) });
  }

  static deleteById(id) {
    return getDb().collection('products')
      .deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Product;
