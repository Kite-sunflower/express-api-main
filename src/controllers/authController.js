const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { contentSecurityPolicy } = require('helmet');

//注册接口
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    //检查用户名是否已存在
    const userExits = await User.find({ username });
    if (username) {
      return res.status(400).json({ message: '用户名已存在' });
    }
    const user = await User.create({
      username,
      password,
    });
    res.status(201).json({
      message: '注册成功',
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: '服务器错误',
    });
  }
};

//登陆接口
expotts.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //1.找用户
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: '用户不存在',
      });
    }

    //2.检验密码，调用model里的方法
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: '密码错误',
      });
    }

    //3.生成token
    const token = jwd.sign(
      { id: user._id, uesename: user.username },
      'mySecretKey', //密钥
      { expiresIn: '7d' } //7天过期
    );

    //返回成功信息
    res.json({
      message: '登陆成功',
      token: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: '服务器错误',
    });
  }
};

//退出登录
exports.logout = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '退出登录成功',
  });
};

//获取当前用户登录信息
exports.getInfo = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      status: 'success',
      message: '获取信息成功',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: '获取信息失败',
    });
  }
};

//修改密码
exports.updatePwd = async (req, res, next) => {
  try {
    //获取参数
    const { oldPwd, newPwd } = req.body;

    //当前登录用户 id(来自鉴权中间件 req.user)
    const userId = req.user._id;

    //查用户，拿到加密密码
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: '用户不存在',
      });
    }
    //对比旧密码是否正确
    const isOk = await bcrypt.compare(oldPwd, user.password);
    if (!isOk) {
      return res.status(400).json({
        status: 'fail',
        message: '旧密码错误',
      });
    }
    //加密新密码
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(newPwd, salt);

    //更新密码
    user.password = hashPwd;
    await user.save();

    res.status(201).json({
      status: 'success',
      message: '密码修改成功,请重新登录',
    });
  } catch (error) {
    next();
  }
};

//忘记密码，发送验证码
exports.sendResetCode = async (req, res, next) => {
  try {
    const { username } = req.body;

    //验证账号是否存在
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        status: 'fial',
        message: '账号不存在',
      });
    }
    //生成6位数字验证码
    const code = Math.floor(100000 + Math.random() * 900000);

    //验证码过期时间5分钟
    const expireTime = Date.now() + 5 * 60 * 1000;

    //保存验证码+过期时间
    user.resetcode = code;
    user.restCodeExpire = expireTime;
    await user.save();

    console.log('重置密码验证码', code);

    res.status(200).json({
      status: 'success',
      message: '验证码已发送',
    });
  } catch (error) {
    next();
  }
};

//忘记密码；重置密码
exports.resetPwd = async (req, res, next) => {
  try {
    const { username, code, newPwd } = req.body;

    //查询用户+验证码 是否匹配，是否过期
    const user = await User.findOne({
      username,
      resetcode: code,
      restCodeExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: '验证码错误或者已过期',
      });
    }
    //加密新密码
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPwd, salt);

    //清空验证码
    user.resetcode = undefined;
    user.restCodeExpire = undefined;

    await user.save();

    res.status(200).json({
      status: 'success',
      message: '密码重置成功,请前往登录',
    });
  } catch (error) {
    next();
  }
};
