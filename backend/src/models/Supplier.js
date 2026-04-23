const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['able', 'disable'],
      default: 'able',
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Supplier', supplierSchema);
