const requestTime = require('../middlewares/requestTime');
const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
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
exports.updateProduct = async (req, res, next) => {
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
exports.deleteProduct = async (req, res) => {
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
