const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/mongodb-setup');


class User {
  constructor(firstName, lastName, email, id, userId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this._id = id ? new ObjectId(id) : null;
  }

  save() {
    if (this._id) {
      return getDb().collection('users')
        .updateOne({ _id: this._id }, { $set: this });
    }

    return getDb().collection('users')
      .insertOne(this);
  }

  static findById(id) {
    return getDb().collection('users')
      .find({ _id: new ObjectId(id) })
      .next();
  }
}

module.exports = User;
