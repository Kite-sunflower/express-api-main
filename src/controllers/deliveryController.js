const requestTime = require('../middlewares/requestTime');
const Delivery = require('../models/Delivery');

exports.getAllDelivery = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json({
      status: 'success',
      results: deliveries.length,
      data: { deliveries },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({
        status: 'fail',
        message: '用户没有找到',
      });
    } else {
      res.status(200).json({
        status: 'success',
        results: delivery.length,
        data: { delivery },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.createDelivery = async (req, res, next) => {
  try {
    const newDelivery = await Delivery.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { newDelivery },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!delivery) {
      return res.status(404).json({
        status: 'fail',
        message: '配送不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { delivery },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      return res.status(404).json({
        status: 'fail',
        message: '配送不存在',
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
