const { createOrder, findAllOrders, findOrderById, updateOrderById, deleteOrderById, deleteManyOrder, updateOrderStatus } = require('../services/orderService');
// 1. 创建订单
exports.create = async (req, res) => {
  try {
    const data = await createOrder(req.body);
    res.sendSuccess(201, data, '创建订单成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 2. 获取所有订单
exports.getAll = async (req, res) => {
  try {
    const items = await findAllOrders();
    res.sendSuccess(200, { items }, '获取订单列表成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 3. 获取单个订单详情
exports.getOne = async (req, res) => {
  try {
    const data = await findOrderById(req.params.id);
    res.sendSuccess(200, data, '获取订单详情成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 4. 更新订单
exports.update = async (req, res) => {
  try {
    const data = await updateOrderById(req.params.id, req.body);
    res.sendSuccess(200, data, '更新订单成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 5. 删除订单
exports.deleteOrder = async (req, res) => {
  try {
    await deleteOrderById(req.params.id);
    res.sendSuccess(200, null, '删除订单成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 6.批量删除订单
exports.deleteMany = async (req, res) => {
  try {
    const { ids } = req.body;
    await deleteManyOrder(ids);
    res.sendSuccess(200, null, '批量删除成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};
// 修改订单状态
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const data = await updateOrderStatus(req.params.id, status);
    res.sendSuccess(200, data, '订单状态修改成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};
