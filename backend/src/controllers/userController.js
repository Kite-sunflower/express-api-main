const { createUser, findAllUsers, findUserById, updateUserById, deleteUserById, deleteManyUser, updateUserStatus, updateUserRole } = require('../services/userService');

// 1. 创建用户（管理员）
exports.create = async (req, res) => {
  try {
    const data = await createUser(req.body);
    res.sendSuccess(201, data, '创建用户成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 2. 获取所有用户
exports.getAll = async (req, res) => {
  try {
    const items = await findAllUsers();
    res.sendSuccess(200, { items }, '获取用户列表成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 3. 获取单个用户详情
exports.getOne = async (req, res) => {
  try {
    const data = await findUserById(req.params.id);
    res.sendSuccess(200, data, '获取用户详情成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 4. 更新用户
exports.update = async (req, res) => {
  try {
    const data = await updateUserById(req.params.id, req.body);
    res.sendSuccess(200, data, '更新用户成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 5. 删除用户
exports.deleteUser = async (req, res) => {
  try {
    await deleteUserById(req.params.id);
    res.sendSuccess(200, null, '删除用户成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 6.批量删除用户
exports.deleteMany = async (req, res) => {
  try {
    const { ids } = req.body;
    await deleteManyUser(ids);
    res.sendSuccess(200, null, '批量删除成功');
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 用户状态设置
exports.updateStatus = async (req, res) => {
  try {
    const { targetStatus } = req.body;
    const userId = req.params.id;

    // 调用公共函数
    const user = await updateUserStatus(userId, targetStatus);

    res.sendSuccess(200, user, `状态修改成功：${targetStatus}`);
  } catch (err) {
    res.sendError(400, err.message);
  }
};

// 用户角色设置
exports.updateRole = async (req, res) => {
  try {
    const { targetRole } = req.body;
    const userId = req.params.id;

    // 调用 service 公共函数
    const user = await updateUserRole(userId, targetRole);

    res.sendSuccess(200, user, `角色修改成功：${targetRole}`);
  } catch (err) {
    // 错误统一捕获
    res.sendError(400, err.message);
  }
};
