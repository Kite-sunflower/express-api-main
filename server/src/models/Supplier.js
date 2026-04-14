const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Supplier', supplierSchema);
