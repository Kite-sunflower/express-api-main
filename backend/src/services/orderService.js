const Order = require('../models/Order');

//生成订单号
function generateOrderNo() {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000); //4位随机数
  return `ORD_${date}_${random}`;
}

// 1. 创建订单
exports.createOrder = async (orderData) => {
  const { userId, createdBy, items, totalPrice } = orderData;

  // 校验必填
  if (!userId) throw new Error('用户ID不能为空');
  if (!createdBy) throw new Error('创建人ID不能为空');
  if (!items || items.length === 0) throw new Error('订单商品不能为空');
  if (totalPrice === undefined || totalPrice < 0) throw new Error('订单金额无效');

  //生成订单号
  const orderNo = generateOrderNo();

  // 检查订单号重复
  const exists = await Order.findOne({ orderNo });
  if (exists) throw new Error('订单号已存在');

  return await Order.create({ ...orderData, orderNo });
};

// 2. 查询所有订单（带关联）
exports.findAllOrders = async () => {
  return await Order.find().populate('userId', 'username email').sort({ createdAt: -1 });
};

// 3. 根据ID查询单个订单
exports.findOrderById = async (id) => {
  const order = await Order.findById(id).populate('userId', 'username email').populate('createdBy', 'username').populate('items.productId', 'productName price');

  if (!order) throw new Error('订单不存在');
  return order;
};

// 4. 更新订单（状态、地址、支付方式、备注等）
exports.updateOrderById = async (id, updateData) => {
  const order = await Order.findById(id);
  if (!order) throw new Error('订单不存在');

  return await Order.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// 5. 删除订单
exports.deleteOrderById = async (id) => {
  const order = await Order.findById(id);
  if (!order) throw new Error('订单不存在');

  await Order.findByIdAndDelete(id);
  return true;
};
// 6.批量删除订单
exports.deleteManyOrder = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('请选择要删除的数据');
  }
  const list = await Order.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }
  await Order.deleteMany({ _id: { $in: ids } });
  return true;
};

// ========== 修改订单状态 ==========
exports.updateOrderStatus = async (id, status) => {
  const order = await Order.findById(id);
  if (!order) throw new Error('订单不存在');

  const allowStatus = ['pending', 'paid', 'shipped', 'completed', 'canceled'];
  if (!allowStatus.includes(status)) {
    throw new Error('无效的订单状态');
  }

  order.status = status;
  await order.save();

  return order;
};
