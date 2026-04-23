const { createSupplier, findAllSuppliers, findSupplierById, updateSupplierById, deleteSupplierById, deleteManySupplier, updateSupplierStatus } = require('../services/supplierService');

// 1. 创建供应商
exports.create = async (req, res) => {
  try {
    const data = await createSupplier(req.body);
    res.sendSuccess(201, data, '创建供应商成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 2. 获取所有供应商
exports.getAll = async (req, res) => {
  try {
    const items = await findAllSuppliers();
    res.sendSuccess(200, { items }, '获取供应商列表成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 3. 获取单个供应商详情
exports.getOne = async (req, res) => {
  try {
    const data = await findSupplierById(req.params.id);
    res.sendSuccess(200, data, '获取供应商详情成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 4. 更新供应商
exports.update = async (req, res) => {
  try {
    const data = await updateSupplierById(req.params.id, req.body);
    res.sendSuccess(200, data, '更新供应商成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 5. 删除供应商
exports.deleteSupplier = async (req, res) => {
  try {
    await deleteSupplierById(req.params.id);
    res.sendSuccess(200, null, '删除供应商成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 6.批量删除供应商
exports.deleteMany = async (req, res) => {
  try {
    const { ids } = req.body;
    await deleteManySupplier(ids);
    res.sendSuccess(200, null, '批量删除成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};
// 修改供应商状态
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const supplier = await updateSupplierStatus(req.params.id, status);

    res.sendSuccess(200, supplier, '供应商状态修改成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};
