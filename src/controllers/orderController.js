const Order = require('../models/Order');

exports.getAllorders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
};
exports.createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
};
exports.updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body);
  res.json(order);
};
exports.deleteOredr = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ mes: 'delete successful' });
};
