const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
  try {
    //获取tken
    const authStr = req.headers.authorization;
    if (!authStr) {
      return res.status(401).json({
        sataus: 'fail',
        message: '未登录',
      });
    } else {
      const token = authStr.replace('Bearer', '');
      const decode = jwt.verify(token, '你的密钥');
      const user = await User.findById(decode.userId);
      if (!user) {
        throw new Error();
      } else {
        req.user = user;
      }
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'token失效,请重新登录',
    });
  }
};
