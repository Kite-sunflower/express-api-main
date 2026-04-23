const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    //获取token
    const authStr = req.headers.authorization;
    if (!authStr) {
      return sendError(401, '未登录');
    }
    const token = authStr.replace('Bearer ', '');
    const decode = jwt.verify(token, '你的密钥');
    const user = await User.findById(decode.userId);
    if (!user) {
      throw new Error();
    }
    if (user.status !== 'active') {
      return sendError(401, '账号已被禁用，请联系管理员');
    }

    req.user = user;
    next();
  } catch (error) {
    sendError(401, 'token失效,请重新登录');
  }
};

//售货员权限判断
exports.requireSalesperson = (req, res, next) => {
  //假设：登陆后解密的用户信息挂载在req.user上
  if (req.user.role !== 'salesperson' && req.user.role !== 'admin') {
    return res.sendError(403, '权限不足，仅售货员和管理员可操作');
  }
  next();
};

//管理员权限判断
exports.requireAdmin = (req, res, next) => {
  //假设：登陆后解密的用户信息挂载在req.user上
  if (req.user.role !== 'admin') {
    return res.sendError(403, '权限不足，仅管理员可操作');
  }
  next();
};

//普通用户只能操作自己，管理员不受限制
exports.onlySelf = (req, res, next) => {
  const loginUserId = req.user._id.toString();
  const targetId = req.params.id;

  //不是管理员，且操作的不是自己->禁止
  if (req.user.role !== 'admin' && loginUserId !== targetId) {
    return res.sendError(403, '无权操作他人数据');
  }
  next();
};
