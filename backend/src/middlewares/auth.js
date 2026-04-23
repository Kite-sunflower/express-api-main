const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. 登录校验（必须登录）
exports.protect = async (req, res, next) => {
  try {
    // 获取 token
    const authStr = req.headers.authorization;

    if (!authStr || !authStr.startsWith('Bearer ')) {
      return res.sendError(401, '未登录，请先登录');
    }

    const token = authStr.replace('Bearer ', '');

    // 解密 token（你之前用的是 userId，要对应 login 里的 sign 内容）
    const decode = jwt.verify(token, 'mySecretKey'); // 密钥和登录保持一致

    // 查询用户
    const user = await User.findById(decode.id); // 这里是 id，不是 userId
    if (!user) {
      return res.sendError(401, '用户不存在');
    }

    // 账号是否被禁用
    if (user.status !== 'active') {
      return res.sendError(401, '账号已被禁用，请联系管理员');
    }

    // 把用户信息挂载到 req
    req.user = user;
    next();
  } catch (error) {
    return res.sendError(401, '登录已失效，请重新登录');
  }
};

// 2. 售货员 + 管理员 权限
exports.requireSalesperson = (req, res, next) => {
  if (req.user.role !== 'salesperson' && req.user.role !== 'admin') {
    return res.sendError(403, '权限不足，仅售货员和管理员可操作');
  }
  next();
};

// 3. 仅管理员
exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.sendError(403, '权限不足，仅管理员可操作');
  }
  next();
};

// 4. 普通用户只能操作自己，管理员不受限
exports.onlySelf = (req, res, next) => {
  const loginUserId = req.user._id.toString();
  const targetId = req.params.id;

  if (req.user.role !== 'admin' && loginUserId !== targetId) {
    return res.sendError(403, '无权操作他人数据');
  }
  next();
};
