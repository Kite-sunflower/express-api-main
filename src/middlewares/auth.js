const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    //获取tken
    const authStr = req.headers.authorization;
    if (!authStr) {
      return res.status(401).json({
        sataus: 'fail',
        message: '未登录',
      });
    }
    const token = authStr.replace('Bearer', '');
    const decode = jwt.verify(token, '你的密钥');
    const user = await User.findById(decode.userId);
    if (!user) {
      throw new Error();
    } else {
      req.user = user;
    }
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'token失效,请重新登录',
    });
  }
};

//管理员权限判断
exports.restrictToAdmin = (req, res, next) => {
  //假设：登陆后解密的用户信息挂载在req.user上
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'fail',
      message: '权限不足，仅管理员可操作',
    });
  }
  next();
};

//普通用户只能操作自己，管理员不受限制
exports.onlySelf = (req, res, nexxt) => {
  const loginUserId = req.user._id.toString();
  const targetId = req.params.id;

  //不是管理员，且操作的不是自己->禁止
  if (req.user.role !== 'admin' && loginUserId !== targetId) {
    return res.status(403).json({
      status: 'fail',
      message: '无权操作他人数据',
    });
  }
};
