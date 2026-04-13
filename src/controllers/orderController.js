const requestTime = require('../middlewares/requestTime');
const Order = require('../models/Order');

exports.getAllorders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json({
      orders,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json({
      order,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.json({
      order,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      order,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteOredr = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({
      mes: 'delete successful',
    });
  } catch (error) {
    next(error);
  }
};
