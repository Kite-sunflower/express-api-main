const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
  },
  description: String,
  supplierId: {
    type: ObjectId,
    ref: 'supplier',
  },
});
module.exports = mongoose.model('Product', productSchema);
