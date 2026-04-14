const requestTime = require('../middlewares/requestTime');
const Delivery = require('../models/Delivery');

exports.getAllDelivery = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find();
    res.json({
      deliveries,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    res.json({
      delivery,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.createDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.create(req.body);
    res.json({
      delivery,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      delivery,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteDelivery = async (req, res, next) => {
  try {
    await Delivery.findByIdAndDelete(req.params.id);
    res.json({ mes: 'delete successful' });
  } catch (error) {
    next(error);
  }
};
