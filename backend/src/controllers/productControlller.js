const { createProduct, findAllProducts, findProductById, updateProductById, deleteProductById, deleteManyProduct, updateProductStatus } = require('../services/productService');
// 1. 创建商品
exports.create = async (req, res) => {
  try {
    const data = await createProduct(req.body);
    res.sendSuccess(201, data, '创建商品成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 2. 获取所有商品
exports.getAll = async (req, res) => {
  try {
    const items = await findAllProducts();
    res.sendSuccess(200, { items }, '获取商品列表成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 3. 获取单个商品详情
exports.getOne = async (req, res) => {
  try {
    const data = await findProductById(req.params.id);
    res.sendSuccess(200, data, '获取商品详情成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 4. 更新商品
exports.update = async (req, res) => {
  try {
    const data = await updateProductById(req.params.id, req.body);
    res.sendSuccess(200, data, '更新商品成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 5. 删除商品
exports.deleteProduct = async (req, res) => {
  try {
    await deleteProductById(req.params.id);
    res.sendSuccess(200, null, '删除商品成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};
// 6.批量删除商品
exports.deleteMany = async (req, res) => {
  try {
    const { ids } = req.body;
    await deleteManyProduct(ids);
    res.sendSuccess(200, null, '批量删除成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};
// 修改商品状态
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const data = await updateProductStatus(req.params.id, status);
    res.sendSuccess(200, data, '商品状态修改成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};
