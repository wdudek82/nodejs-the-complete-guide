const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/mongodb-setup');

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? ObjectId(id) : null;
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
      .find({ _id: ObjectId(id) })
      .next();
  }

  static deleteById(id) {
    return getDb().collection('products')
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Product;
