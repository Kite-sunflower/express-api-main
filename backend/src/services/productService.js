const Product = require('../models/Product');

// 1. 创建商品
exports.createProduct = async (productData) => {
  const { name, price, supplierId } = productData;

  // 校验必填
  if (!name) throw new Error('商品名称不能为空');
  if (price === undefined || price < 0) throw new Error('商品价格不能小于0');
  if (!supplierId) throw new Error('供应商ID不能为空');

  // 检查名称重复
  const exists = await Product.findOne({ name });
  if (exists) throw new Error('商品名称已存在');

  return await Product.create(productData);
};

// 2. 查询所有商品（关联供应商）
exports.findAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

// 3. 根据ID查询单个商品
exports.findProductById = async (id) => {
  const product = await Product.findById(id).populate('supplierId', 'name phone');
  if (!product) throw new Error('商品不存在');
  return product;
};

// 4. 更新商品
exports.updateProductById = async (id, updateData) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('商品不存在');

  return await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// 5. 删除商品
exports.deleteProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('商品不存在');

  await Product.findByIdAndDelete(id);
  return true;
};
// 6.批量删除商品
exports.deleteManyProduct = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('请选择要删除的数据');
  }
  const list = await Product.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }
  await Product.deleteMany({ _id: { $in: ids } });
  return true;
};
// ========== 修改商品状态 ==========
exports.updateProductStatus = async (id, status) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('商品不存在');

  const allowStatus = ['on', 'off'];
  if (!allowStatus.includes(status)) {
    throw new Error('状态只能是 on 或 off');
  }

  if (product.status === status) {
    throw new Error(`商品状态已是 ${status}`);
  }

  product.status = status;
  await product.save();

  return product;
};
