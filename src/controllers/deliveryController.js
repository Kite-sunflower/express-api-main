const Delivery = require('../models/Delivery');

exports.getAllDelivery = async (req, res) => {
  const deliveries = await Delivery.find();
  res.json(deliveries);
};
exports.getDeliveryById = async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);
  res.json(delivery);
};
exports.createDelivery = async (req, res) => {
  const delivery = await Delivery.create(req.body);
  res.json(delivery);
};
exports.updateDelivery = async (req, res) => {
  const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body);
  res.json(delivery);
};
exports.deleteDelivery = async (req, res) => {
  await Delivery.findByIdAndDelete(req.params.id);
  res.json({ mes: 'delete successful' });
};
