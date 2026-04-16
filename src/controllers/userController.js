const requestTime = require('../middlewares/requestTime');
const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({
      status: 'success',
      results: allUsers.length,
      data: { allUsers },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: '用户不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { user },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const existUser = await User.findOne({
      username: req.body.username,
    });

    if (existUser) {
      return res.status(400).json({
        status: 'fail',
        message: '用户名已存在',
      });
    } else {
      const newUser = await User.create(req.body);
      res.status(201).json({
        status: 'success',
        data: { newUser },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: '用户不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: { user },
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: '用户不存在',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: null,
        message: '用户已删除',
        requestTime: req.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};
