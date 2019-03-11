// const { ObjectId } = require('mongodb');
// const { getDb } = require('../utils/mongodb-setup');
//
//
// class User {
//   constructor(firstName, lastName, email, cart, id) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.cart = cart;
//     this._id = id ? new ObjectId(id) : null;
//   }
//
//   save() {
//     if (this._id) {
//       return getDb().collection('users')
//         .updateOne({ _id: this._id }, { $set: this });
//     }
//
//     return getDb().collection('users')
//       .insertOne(this);
//   }
//
//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];
//
//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }
//
//     const updatedCart = {
//       items: updatedCartItems,
//     };
//
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updatedCart } },
//       );
//   }
//
//   getCart() {
//     const productIds = this.cart.items.map((cp) => cp.productId);
//
//     return getDb().collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products
//           .map((p) => {
//             return {
//               ...p,
//               quantity: this.cart.items.find((i) => {
//                 const isMatch = i.productId.toString() === p._id.toString();
//                 const isEnough = i.quantity <= p.quantity;
//                 return isMatch;
//               }).quantity,
//             };
//           });
//       });
//   }
//
//   deleteItemFromCart(id) {
//     this.cart.items
//       .map((cp) => {
//         const updCartProduct = cp;
//         if (updCartProduct.productId.toString() === id) {
//           updCartProduct.quantity -= 1;
//         }
//         return cp;
//       })
//       .filter((cp) => cp.quantity > 0);
//   }
//
//   addOrder() {
//     return this.getCart()
//       .then((products) => {
//         const items = [];
//
//         for (const item of this.cart.items) {
//           const product = products.find((p) => {
//             return p._id.toString() === item.productId.toString();
//           });
//           if (product) {
//             items.push(product);
//           }
//         }
//
//         return {
//           items,
//           user: {
//             _id: this._id,
//             firstName: this.firstName,
//             lastName: this.lastName,
//             email: this.email,
//           },
//         };
//       })
//       .then((order) => {
//         return getDb().collection('orders')
//           .insertOne(order)
//           .then(() => {
//             this.cart = { items: [] };
//             this.save();
//           });
//       })
//       .catch((err) => new Error(err));
//   }
//
//   getOrders() {
//     return getDb().collection('orders')
//       .find({ 'user._id': new ObjectId(this._id) })
//       .toArray();
//   }
//
//   static findById(id) {
//     return getDb().collection('users')
//       .findOne({ _id: new ObjectId(id) })
//       .then((user) => {
//         return user;
//       })
//       .catch((err) => new Error(err));
//   }
// }
//
// module.exports = User;
