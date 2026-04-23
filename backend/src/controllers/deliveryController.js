const { createDelivery, findAllDeliveries, findDeliveryById, updateDeliveryById, deleteDeliveryById, deleteManyDelivery, updateDeliveryStatus } = require('../services/deliveryService');

// 1. 创建配送单
exports.create = async (req, res) => {
  try {
    const data = await createDelivery(req.body);
    res.sendSuccess(201, data, '创建配送单成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 2. 获取所有配送单
exports.getAll = async (req, res) => {
  try {
    const items = await findAllDeliveries();
    res.sendSuccess(200, { items }, '获取配送单列表成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 3. 获取单个配送单详情
exports.getOne = async (req, res) => {
  try {
    const data = await findDeliveryById(req.params.id);
    res.sendSuccess(200, data, '获取配送单详情成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 4. 更新配送单
exports.update = async (req, res) => {
  try {
    const data = await updateDeliveryById(req.params.id, req.body);
    res.sendSuccess(200, data, '更新配送单成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 5. 删除配送单
exports.deleteDelivery = async (req, res) => {
  try {
    await deleteDeliveryById(req.params.id);
    res.sendSuccess(200, null, '删除配送单成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 6. 批量删除配送单
exports.deleteMany = async (req, res) => {
  try {
    const { ids } = req.body; // 前端传数组 [id1, id2, id3]
    await deleteManyDelivery(ids);
    res.sendSuccess(200, null, '批量删除成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};
// 修改配送状态
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const data = await updateDeliveryStatus(req.params.id, status);
    res.sendSuccess(200, data, '配送状态修改成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};
