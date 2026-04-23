const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 登录：根据账号查找用户
exports.findUserByAccount = async (account) => {
  const user = await User.findOne({
    $or: [{ username: account }, { email: account }],
  }).select('+password');

  if (!user) throw new Error('用户不存在');
  return user;
};

// 密码校验
exports.verifyPassword = async (inputPwd, hashedPwd) => {
  const isMatch = await bcrypt.compare(inputPwd, hashedPwd);
  if (!isMatch) throw new Error('密码错误');
  return true;
};

// 生成 JWT
exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, 'mySecretKey', { expiresIn: '7d' });
};

// 修改密码
exports.updatePassword = async (userId, oldPwd, newPwd) => {
  const user = await User.findById(userId).select('+password');
  if (!user) throw new Error('用户不存在');

  const isMatch = await bcrypt.compare(oldPwd, user.password);
  if (!isMatch) throw new Error('旧密码错误');

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPwd, salt);
  await user.save();

  return true;
};

// 发送验证码（忘记密码）
exports.sendResetCode = async (username) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('账号不存在');

  const code = Math.floor(100000 + Math.random() * 900000);
  const expireTime = Date.now() + 5 * 60 * 1000;

  user.resetcode = code;
  user.restCodeExpire = expireTime;
  await user.save();

  return code;
};

// 重置密码（忘记密码）
exports.resetPassword = async (username, code, newPwd) => {
  const user = await User.findOne({
    username,
    resetcode: code,
    restCodeExpire: { $gt: Date.now() },
  });

  if (!user) throw new Error('验证码错误或已过期');

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPwd, salt);

  user.resetcode = undefined;
  user.restCodeExpire = undefined;
  await user.save();

  return true;
};
