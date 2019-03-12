const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  products: [
    {
      productsData: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
});

module.exports = {
  Order: model('Order', orderSchema),
};
