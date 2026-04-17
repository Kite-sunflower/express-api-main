const { request } = require('../app');
const requestTime = require('../middlewares/requestTime');
const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, keyword = '', status = '' } = req.query;
    const query = {};

    if (keyword) query.name = { $regex: keyword, $options: 'i' };
    if (status) query.status = status;

    const data = await Model.find(query)
      .skip((page - 1) * limit)
      .limit(+limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

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
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplierId');
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: '产品不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { product },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      data: { newProduct },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateProductById = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: '产品不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { product },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: '产品不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: null,
        message: 'delete successful',
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteManyProduct = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: '请选择删除的产品',
      });
    } else {
      await Product.deleteMany({ _id: { $in: ids } });
      res.satatus(200).json({
        status: 'success',
        data: null,
        message: '产品批量删除成功',
      });
    }
  } catch (error) {
    next(error);
  }
};
