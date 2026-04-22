const requestTime = require('../middlewares/requestTime');
const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, keyword = '', status = '' } = req.query;
    const query = {};

    if (keyword) query.name = { $regex: keyword, $options: 'i' };
    if (status) query.status = status;

    const data = await Model.find(query)
      .skip((page - 1) * limit)
      .limit(+limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      status: 'success',
      total,
      page,
      limit,
      data: { data },
      request: req.requestTime,
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
    }
    res.status(200).json({
      status: 'success',
      data: { user },
      requestTime: req.requestTime,
    });
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
    }
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { newUser },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUserById = async (req, res, next) => {
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
    }
    res.status(200).json({
      status: 'success',
      data: { user },
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: '用户不存在',
      });
    }
    res.status(200).json({
      status: 'success',
      data: null,
      message: '用户已删除',
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteManyUser = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: '请选择删除的用户',
      });
    }
    const data = await User.deleteMany({ _id: { $in: ids } });
    res.satatus(200).json({
      status: 'success',
      data: null,
      message: '用户批量删除成功',
    });
  } catch (error) {
    next(error);
  }
};

//用户权限接口解偶
exports.activeUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: '用户不存在',
      });
    }

    if (user.status === 'active') {
      return res.status(400).json({
        status: 'fail',
        message: '用户已是启用状态',
      });
    }

    user.status = 'active';
    await user.save();
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

exports.inactiveUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: '用户不存在',
      });
    }

    if (user.role == 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: '管理员不可禁用',
      });
    }

    if (user.status === 'inactive') {
      return res.status(400).json({
        status: 'fail',
        message: '用户已是禁用状态',
      });
    }

    user.status = 'inactive';
    await user.save();
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

//用户角色设置
exports.roleSetup = async (req, res, next) => {
  try {
    const { targetRole } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: '用户不存在',
      });
    }

    const allowRole = ['user', 'salesperson'];

    if (!allowRole.includes(targetRole)) {
      return res.status(400).json({
        status: 'fail',
        message: '仅支持 user/salesperson',
      });
    }

    if (user.role === targetRole) {
      return res.status(400).json({
        status: 'fail',
        message: `用户角色已是 ${targetRole}`,
      });
    }

    user.role = targetRole;
    await user.save();
    res.status(200).json({
      status: 'success',
      message: '角色修改成功',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
