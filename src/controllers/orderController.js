const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

//生成订单号
function generateOrderNo() {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000); //4位随机数
  return `ORD_${date}_${random}`;
}

exports.getAllorders = async (req, res, next) => {
  try {
    // 获取前端传的分页，搜索，筛选参数
    const {
      page = 1, //当前页码，默认第一页
      limit = 10, //每页条数，默认10条
      keyword = '', //搜索关键词(订单号/地址)
      status = '', //刷选订单状态
    } = req.query;

    //拼接查询条件(支持搜索+筛选)
    const query = {};

    //搜索：订单号模糊搜索
    if (keyword) {
      query.orderNo = { $regex: keyword, $options: 'i' };
    }

    //筛选：按照订单状态筛选
    if (status) {
      query.status = status;
    }

    //分页计算
    const skip = (page - 1) * limit;

    //查询数据库：分页+排序
    const orders = await Order.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }) //按照创建时间排序，最新的在前
      .populate('userId productId'); //关联查询用户和商品(可选)

    //查询总条数(用于前端分页)
    const total = await Order.countDocuments(query);

    //返回数据
    res.sendSuccess(200, { total, page, limit, orders }, '获取订单列表成功');
  } catch (error) {
    next(error);
  }
};
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('productId').populate('userId');
    if (!order) {
      return res.sendError(400, '订单不存在');
    }
    res.sendSuccess(200, order, '获取订单详情成功');
  } catch (error) {
    next(error);
  }
};
exports.createOrder = async (req, res, next) => {
  // 用户自己下单
  const session = await mongoose.startSession();
  session.startTransaction(); // 开启事务

  try {
    const { items, address, payType, remark } = req.body;

    const userId = req.user._id; // 从token获取自己的ID

    // ================= 2. 校验所有商品 + 库存（只检查，不扣！）=================
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          stock: { $gte: item.quantity },
        },
        { $inc: { stock: -item.quantity } }, // 原子扣减：不会超卖
        { new: true, session } // 绑定事务
      );

      if (!product) {
        return res.sendError(400, '商品不存在');
      }

      // 存入订单商品快照
      orderItems.push({
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
      });

      // 计算总价
      totalPrice += product.price * item.quantity;
    }

    // ================= 3. 生成订单号 =================
    const orderNo = generateOrderNo();

    // ================= 4. 【先创建订单】 =================
    const order = await Order.create(
      [
        {
          orderNo,
          userId, // 购买人：自己
          createdBy: userId, // 创建人：自己
          createType: 'user', // 标记：用户自己下单
          items: orderItems,
          totalPrice,
          address,
          payType: payType || 'card',
          remark: remark || '',
        },
      ],
      { session }
    );

    // ================= 5. 提交事务 =================
    await session.commitTransaction();
    session.endSession();

    // ================= 6. 返回成功 =================
    return sendSuccess(200, order, '订单创建成功');
  } catch (error) {
    // 失败 → 全部回滚
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

exports.updateOrderById = async (req, res, next) => {
  try {
    const { address, payType, remark } = req.body;

    const updateData = {
      address,
      payType,
      remark,
    };

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.sendError(404, '订单不存在');
    }

    const update = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.res.sendSuccess(200, update, '订单修改成功');
  } catch (error) {
    next(error);
  }
};
exports.deleteOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.sendError(404, '订单不存在');
    }

    res.sendSuccess(200, order, '订单删除成功');
  } catch (error) {
    next(error);
  }
};

exports.deleteManyOrder = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: '请选择删除的订单',
      });
    }
    await Order.deleteMany({ _id: { $in: ids } });
    res.satatus(200).json({
      status: 'success',
      data: null,
      message: '订单批量删除成功',
    });
  } catch (error) {
    next(error);
  }
};

// 修改订单状态的接口单独解偶
exports.payOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.ststus(400).json({
        status: 'fail',
        message: '订单不存在',
      });
    }
    if (order.status !== 'pending') {
      return res.status(400).json({
        status: 'fail',
        message: '只有代付款订单才可以付款',
      });
    }
    order.status = 'paid';
    await order.save();
    res.status(200).json({
      status: 'success',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

exports.shipOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(400).json({
        status: 'fail',
        message: '订单不存在',
      });
    }

    if (order.status !== 'paid') {
      return res.status(400).json({
        status: 'fail',
        message: '只有付款订单才可以发货',
      });
    }
    order.status = 'shipped';
    await order.save();
    res.status(200).json({
      status: 'success',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};
exports.completeOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.pqrams.id);
    if (!order) {
      return res.status(400).json({
        status: 'fail',
        message: '订单不存在',
      });
    }
    if (order.status !== 'shipped') {
      return res.status(400).json({
        status: 'fail',
        message: '只有发货订单才可以完成',
      });
    }
    order.status = 'completed';
    await order.save();
    res.status(200).json({
      status: 'success',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(400).json({
        status: 'fail',
        message: '订单不存在',
      });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        status: 'fail',
        message: '只有处理订单才可以取消',
      });
    }
    order.status = 'canceled';
    await order.save();
    res.status(200).json({
      status: 'success',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};
