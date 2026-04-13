const requestTime = require('../middlewares/requestTime');
const Supplier = require('../models/Supplier');

exports.getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find();
    res.json({
      suppliers,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.getSupplierById = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.json({
      supplier,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.createSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.json({
      supplier,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      supplier,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteSupplier = async (req, res, next) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ mes: 'delete successful' });
  } catch (error) {
    next(error);
  }
};
