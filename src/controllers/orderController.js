const requestTime = require('../middlewares/requestTime');
const Order = require('../models/Order');

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
    res.status(200).json({
      status: 'success',
      total,
      page: Number(page),
      limit: Number(limit),
      data: { orders },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('productId').populate('userId');
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: '订单不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { order },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.createOrder = async (req, res, next) => {
  try {
    const orderNo = generateOrderNo();

    const isExit = await Order.findOne({ orderNo });
    if (isExit) {
      return res.status(400).json({
        status: 'fail',
        message: '订单已存在',
      });
    } else {
      const newOrder = await Order.create({ ...isExitreq.body, orderNo });
      res.status(201).json({
        status: 'success',
        data: { newOrder },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.updateOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: '订单不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { order },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.deleteOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: '订单不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'delete successful',
        data: null,
        requestTime: req.requestTime,
      });
    }
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
    } else {
      await Order.deleteMany({ _id: { $in: ids } });
      res.satatus(200).json({
        status: 'success',
        data: null,
        message: '订单批量删除成功',
      });
    }
  } catch (error) {
    next(error);
  }
};
