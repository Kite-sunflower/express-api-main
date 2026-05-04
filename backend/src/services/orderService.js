const Order = require('../models/Order');
const Product = require('../models/Product');

//生成订单号
function generateOrderNo() {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000); //4位随机数
  return `ORD_${date}_${random}`;
}

// 1. 创建订单
exports.createOrder = async (orderData, user) => {
  const { userId, items, address, payType, remark } = orderData;

  // 校验必填
  if (!userId) throw new Error('用户ID不能为空');
  if (!items || items.length === 0) throw new Error('订单商品不能为空');
  if (!address || !address.name || !address.phone || !address.address) {
    throw new Error('请填写完整收货地址');
  }
  //自动计算价格
  let totalPrice = 0;
  const processedItems = [];

  // 遍历商品，查库拿真实价格
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error(`商品${item.productId}不存在`);
    if (item.quantity < 1) throw new Error('购买数量不能小于1');

    // 单品价格累加
    totalPrice += product.price * item.quantity;

    processedItems.push({
      productId: product._id,
      productName: product.productName, // 商品名称（自动查）
      price: product.price, // 商品价格（自动查）
      quantity: item.quantity, // 购买数量
    });
  }

  // 自动赋值创建人 + 下单类型
  const createdBy = user._id;
  let createType = 'user';
  if (user.role === 'salesperson') createType = 'salesperson';

  //生成订单号
  const orderNo = generateOrderNo();

  // 检查订单号重复
  const exists = await Order.findOne({ orderNo });
  if (exists) throw new Error('订单号已存在');

  return await Order.create({
    orderNo,
    userId,
    createdBy: user._id,
    createType,
    items: processedItems,
    totalPrice,
    address,
    payType,
    remark,
  });
};

// 2. 查询所有订单（带关联）
exports.findAllOrders = async () => {
  const orders = await Order.find().populate('userId', 'username email').populate('createdBy', 'username').populate('items.productId', 'parductName price').sort({ createdAt: -1 }).lean();
  return orders.map((order) => ({
    id: order._id,
    orderNo: order.orderNo,
    userId: order.userId,
    createdBy: order.createdBy,
    createType: order.createType,
    items: order.items,
    totalPrice: order.totalPrice,
    address: order.address,
    payType: order.payType,
    remark: order.remark,
  }));
};

// 3. 根据ID查询单个订单
exports.findOrderById = async (id) => {
  const order = await Order.findById(id).populate('userId', 'username email').populate('createdBy', 'username').populate('items.productId', 'productName ').lean();

  if (!order) throw new Error('订单不存在');
  return {
    _id: order._id,
    orderNo: order.orderNo,
    userId: order.userId,
    createdBy: order.createdBy,
    createType: order.createType,
    items: order.items,
    totalPrice: order.totalPrice,
    address: order.address,
    payType: order.payType,
    remark: order.remark,
  };
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
