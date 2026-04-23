const Delivery = require('../models/Delivery');

function generateDeliveryNo() {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000); //4位随机数
  return `ORD_${date}_${random}`;
}

// 1. 创建配送单
exports.createDelivery = async (deliveryData) => {
  const { deliveryNo, orderId, address } = deliveryData;

  // 校验必填
  if (!orderId) throw new Error('订单ID不能为空');

  //生成配送订单号
  const ddeliveryNo = generateDeliveryNo();

  // 检查单号重复
  const exists = await Delivery.findOne({ deliveryNo });
  if (exists) throw new Error('配送单号已存在');

  return await Delivery.create({ ...deliveryData, deliveryNo });
};

// 2. 查询所有配送单
exports.findAllDeliveries = async () => {
  return await Delivery.find()
    .populate('orderId', 'orderNo totalPrice') // 关联订单信息
    .sort({ createdAt: -1 });
};

// 3. 根据ID查询单个配送单
exports.findDeliveryById = async (id) => {
  const delivery = await Delivery.findById(id).populate('orderId', 'orderNo totalPrice');

  if (!delivery) throw new Error('配送单不存在');
  return delivery;
};

// 4. 更新配送单（状态、地址、配送时间）
exports.updateDeliveryById = async (id, updateData) => {
  const delivery = await Delivery.findById(id);
  if (!delivery) throw new Error('配送单不存在');

  return await Delivery.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// 5. 删除配送单
exports.deleteDeliveryById = async (id) => {
  const delivery = await Delivery.findById(id);
  if (!delivery) throw new Error('配送单不存在');

  await Delivery.findByIdAndDelete(id);
  return true;
};
// 6. 批量删除配送单
exports.deleteManyDelivery = async (ids) => {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new Error('请选择要删除的配送单');
  }
  const deliveries = await Delivery.find({ _id: { $in: ids } });

  if (deliveries.length !== ids.length) {
    throw new Error('部分配送单不存在，删除失败');
  }

  await Delivery.deleteMany({ _id: { $in: ids } });

  return true;
};

// ========== 修改配送状态 ==========
exports.updateDeliveryStatus = async (id, status) => {
  const delivery = await Delivery.findById(id);
  if (!delivery) throw new Error('配送单不存在');

  const allowStatus = ['waiting', 'shipping', 'delivered', 'canceled'];
  if (!allowStatus.includes(status)) {
    throw new Error('无效的配送状态');
  }

  delivery.status = status;
  await delivery.save();

  return delivery;
};
