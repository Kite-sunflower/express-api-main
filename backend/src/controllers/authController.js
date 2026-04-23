const { findUserByAccount, verifyPassword, generateToken, updatePassword, sendResetCode, resetPassword } = require('../services/authService');

// 注册接口
exports.register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.sendSuccess(
      201,
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      '注册成功'
    );
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 登录接口
exports.login = async (req, res) => {
  try {
    const { account, password } = req.body;

    if (!account) return res.sendError(400, '请输入用户名或邮箱');
    if (!password) return res.sendError(400, '请输入密码');

    const user = await findUserByAccount(account);
    await verifyPassword(password, user.password);

    const token = generateToken(user);

    res.sendSuccess(
      200,
      {
        id: user._id,
        username: user.username,
        token,
      },
      '登录成功'
    );
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 退出登录
exports.logout = (req, res) => {
  res.sendSuccess(200, null, '退出登录成功');
};

// 获取当前登录信息
exports.getInfo = async (req, res) => {
  try {
    const user = req.user;
    res.sendSuccess(
      200,
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      '获取信息成功'
    );
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 修改密码
exports.updatePwd = async (req, res) => {
  try {
    const { oldPwd, newPwd } = req.body;
    await updatePassword(req.user._id, oldPwd, newPwd);
    res.sendSuccess(200, null, '密码修改成功，请重新登录');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 发送验证码
exports.sendResetCode = async (req, res) => {
  try {
    const { username } = req.body;
    await sendResetCode(username);
    res.sendSuccess(200, null, '验证码已发送');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 重置密码
exports.resetPwd = async (req, res) => {
  try {
    const { username, code, newPwd } = req.body;
    await resetPassword(username, code, newPwd);
    res.sendSuccess(200, null, '密码重置成功，请前往登录');
  } catch (err) {
    res.sendError(400, err.message);
  }
};
