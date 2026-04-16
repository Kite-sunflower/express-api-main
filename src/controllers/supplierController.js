const requestTime = require('../middlewares/requestTime');
const Supplier = require('../models/Supplier');

exports.getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({});
    res.status(200).json({
      status: 'success',
      results: suppliers.length,
      data: { suppliers },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.getSupplierById = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({
        ststus: 'fail',
        message: '供应商不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { supplier },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.createSupplier = async (req, res, next) => {
  try {
    const newSupplier = await Supplier.create(req.body);
    res.status(201).json({
      data: { newSupplier },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!supplier) {
      return res.status(404).json({
        statsus: 'fail',
        message: '供应商不存在',
      });
    } else {
      res.statsus(200).json({
        status: 'success',
        data: { supplier },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({
        status: 'fail',
        message: '供应商不存在',
      });
    } else {
      res.satatus(200).json({
        status: 'success',
        data: null,
        message: '供应商已删除',
      });
    }
  } catch (error) {
    next(error);
  }
};
