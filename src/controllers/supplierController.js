const Supplier = require('../models/Supplier');

exports.getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
};
exports.getSupplierById = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.json(supplier);
};
exports.createSupplier = async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.json(supplier);
};
exports.updateSupplier = async (req, res) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body);
  res.json(supplier);
};
exports.deleteSupplier = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.json({ mes: 'delete successful' });
};
