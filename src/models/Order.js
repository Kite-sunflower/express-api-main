const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    createType: {
      type: String,
      enum: ['user', 'salesperson'],
      default: 'user',
    },
    items: [
      {
        productId: {
          type: ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'completed', 'canceled'],
      default: 'pending',
    },

    address: {
      name: String,
      phone: String,
      address: String,
    },
    payType: {
      type: String,
      enum: ['card', 'cash', 'other'],
      default: 'card',
    },
    remark: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
