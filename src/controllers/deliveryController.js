const requestTime = require('../middlewares/requestTime');
const Delivery = require('../models/Delivery');

//生成发货单
function generateDeliveryNo() {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SHIP_${date}_${random}`;
}

exports.getAllDelivery = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, keyword = '', status = '' } = req.query;
    const query = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }

    if (status) {
      query.status = status;
    }

    const data = await Delivery.find(query)
      .skip((page - 1) * limit)
      .limit(+limit)
      .sort({ createAt: -1 });

    const total = await Delivery.countDocuments(query);
    res.status(200).json({
      status: 'success',
      total,
      page,
      limit,
      data: { data },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await Delivery.findById(req.params.id).populate('orderId');
    if (!delivery) {
      return res.status(404).json({
        status: 'fail',
        message: '用户没有找到',
      });
    }
    res.status(200).json({
      status: 'success',
      data: { delivery },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.createDelivery = async (req, res, next) => {
  try {
    const deliveryNo = generateDeliveryNo();

    const isExit = await Delivery.findone(deliveryNo);
    if (isExit) {
      return res.status(400).json({
        status: 'fail',
        message: '订单已存在',
      });
    }
    const newDelivery = await Delivery.create({ ...req.body, deliveryNo });
    res.status(201).json({
      status: 'success',
      data: { newDelivery },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateDeliveryById = async (req, res, next) => {
  try {
    const { address } = req.body;

    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { address },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!delivery) {
      return res.status(404).json({
        status: 'fail',
        message: '配送不存在',
      });
    }
    res.status(200).json({
      status: 'success',
      data: { delivery },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};

exports.cancelDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(400).json({
        status: 'fail',
        message: '配送不存在',
      });
    }
    if (delivery.status !== 'waiting') {
      return res.status.json({
        status: 'fail',
        message: '只有处理配送才可以发货',
      });
    }
    delivery.status = 'canceled';
    await delivery.save();
    res.ststus(200).json({
      status: 'success',
      data: { delivery },
    });
  } catch (error) {
    next();
  }
};

exports.deleteDeliveryById = async (req, res, next) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      return res.status(404).json({
        status: 'fail',
        message: '配送不存在',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'delete successful',
      data: null,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteManyDelivery = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: '请选择删除的配送订单',
      });
    }
    await Delivery.deleteMany({ _id: { $in: ids } });
    res.satatus(200).json({
      status: 'success',
      data: null,
      message: '配送订单批量删除成功',
    });
  } catch (error) {
    next(error);
  }
};

//修改交付状态的接口单独解偶
exports.startShipping = async (req, res, next) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({
        status: 'fail',
        message: '配送不存在',
      });
    }
    if (delivery.status !== 'waiting') {
      return res.status(400).json({
        status: 'fail',
        message: '只有处理配送才可以发货',
      });
    }
    delivery.status = 'shipping';
    await delivery.save();
    res.ststus(200).json({
      status: 'success',
      data: { delivery },
    });
  } catch (error) {
    next();
  }
};
exports.completeDelivery = async (req, res, next) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({
        status: 'fail',
        message: '配送不存在',
      });
    }
    if (delivery.status !== 'shipping') {
      return res.status(400).json({
        status: 'fail',
        message: '只有发货订单才可以配送',
      });
    }
    delivery.status = 'delivered';
    await delivery.save();
    res.ststus(200).json({
      status: 'success',
      data: { delivery },
    });
  } catch (error) {
    next();
  }
};
