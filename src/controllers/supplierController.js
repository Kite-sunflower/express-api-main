const requestTime = require('../middlewares/requestTime');
const Supplier = require('../models/Supplier');

exports.getAllSuppliers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, keyword = '', status = '' } = req.query;
    const query = {};

    if (keyword) query.name = { $regex: keyword, $options: 'i' };
    if (status) query.status = status;

    const data = await Model.find(query)
      .skip((page - 1) * limit)
      .limit(+limit)
      .sort({ createdAt: -1 });

    const total = await Supplier.countDocuments(query);

    res.json({
      status: 'success',
      total,
      page,
      limit,
      data: { data },
      request: req.requestTime,
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
exports.updateSupplierById = async (req, res, next) => {
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
exports.deleteSupplierById = async (req, res, next) => {
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

exports.deleteManySupplier = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: '请选择删除的供应商',
      });
    } else {
      await Supplier.deleteMany({ _id: { $in: ids } });
      res.satatus(200).json({
        status: 'success',
        data: null,
        message: '供应商批量删除成功',
      });
    }
  } catch (error) {
    next(error);
  }
};
