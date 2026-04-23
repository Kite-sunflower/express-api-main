const Supplier = require('../models/Supplier');

// 1. 创建供应商
exports.createSupplier = async (supplierData) => {
  const { name, phone, address } = supplierData;

  // 校验必填
  if (!name) throw new Error('供应商名称不能为空');
  if (!phone) throw new Error('供应商电话不能为空');
  if (!address) throw new Error('供应商地址不能为空');

  // 校验重复
  const nameExists = await Supplier.findOne({ name });
  if (nameExists) throw new Error('供应商名称已存在');

  const phoneExists = await Supplier.findOne({ phone });
  if (phoneExists) throw new Error('供应商电话已存在');

  // 创建
  return await Supplier.create(supplierData);
};

// 2. 查询所有供应商
exports.findAllSuppliers = async () => {
  return await Supplier.find().sort({ createdAt: -1 });
};

// 3. 根据ID查询单个供应商
exports.findSupplierById = async (id) => {
  const supplier = await Supplier.findById(id);
  if (!supplier) throw new Error('供应商不存在');
  return supplier;
};

// 4. 更新供应商
exports.updateSupplierById = async (id, updateData) => {
  const supplier = await Supplier.findById(id);
  if (!supplier) throw new Error('供应商不存在');

  return await Supplier.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// 5. 删除供应商
exports.deleteSupplierById = async (id) => {
  const supplier = await Supplier.findById(id);
  if (!supplier) throw new Error('供应商不存在');

  await Supplier.findByIdAndDelete(id);
  return true;
};
// 6.批量删除供应商
exports.deleteManySupplier = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('请选择要删除的数据');
  }
  const list = await Supplier.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }
  await Supplier.deleteMany({ _id: { $in: ids } });
  return true;
};
// ========== 修改供应商状态（able / disable） ==========
exports.updateSupplierStatus = async (id, status) => {
  // 1. 查找供应商
  const supplier = await Supplier.findById(id);
  if (!supplier) throw new Error('供应商不存在');

  // 2. 校验允许的状态
  const allowStatus = ['able', 'disable'];
  if (!allowStatus.includes(status)) {
    throw new Error('状态只能是 able 或 disable');
  }

  // 3. 如果状态一样，不用修改
  if (supplier.status === status) {
    throw new Error(`供应商状态已是 ${status}`);
  }

  // 4. 更新状态
  supplier.status = status;
  await supplier.save();

  return supplier;
};
