const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: ObjectId,
    ref: 'Order',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['waiting', 'shipping', 'delivered', 'canceled'],
    default: 'waiting',
  },
  deliveryTime: Date,
  createTime: {
    type: Date,
    dafault: Date.now,
  },
});

module.exports = mongoose.model('Delivery', deliverySchema);
