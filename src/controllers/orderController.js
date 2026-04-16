const requestTime = require('../middlewares/requestTime');
const Order = require('../models/Order');

exports.getAllorders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: { orders },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: '订单不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { order },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({
      data: { newOrder },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: '订单不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { order },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteOredr = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: '订单不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'delete successful',
        data: null,
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
