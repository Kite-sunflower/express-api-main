const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
  orderNo: {
    type: Number,
    required: true,
    unique: true,
  },
  productId: {
    type: ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  username: String,
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'completed'],
    default: 'pending',
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
