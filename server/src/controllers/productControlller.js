const requestTime = require('../middlewares/requestTime');
const Product = require('../models/Product');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({
      products,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({
      product,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      product,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      product,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ mes: 'delete successful' });
  } catch (error) {
    next(error);
  }
};
