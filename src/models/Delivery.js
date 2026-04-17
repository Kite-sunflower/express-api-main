const { required } = require('joi');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const deliverySchema = new mongoose.Schema(
  {
    deliveryNo: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: ObjectId,
      ref: 'Order',
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['waiting', 'shipping', 'delivered', 'canceled'],
      default: 'waiting',
    },
    deliveryTime: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Delivery', deliverySchema);
