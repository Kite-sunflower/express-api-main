const User = require('../models/User');

// 1. 创建用户（公共方法：注册 + 管理员创建都用这个）
exports.createUser = async (userData) => {
  const { username, email, password, role, status } = userData;

  // 1. 密码必填
  if (!password) {
    throw new Error('密码不能为空');
  }

  // 2. 严格二选一校验（核心）
  // 两个都没填 → 报错
  if (!username && !email) {
    throw new Error('用户名 和 邮箱 必须填写一个');
  }
  // 两个都填了 → 也报错
  if (username && email) {
    throw new Error('只能填写 用户名 或 邮箱 其中一个，不能同时填写');
  }

  // 3. 检查重复（只查用户填写的那个）
  let userExists;
  if (username) {
    userExists = await User.findOne({ username });
  } else if (email) {
    userExists = await User.findOne({ email });
  }

  if (userExists) {
    throw new Error('该账号已存在');
  }

  // 4. 创建用户
  return await User.create({
    ...userData,
    role: role || 'user',
    status: status || 'active',
  });
};

// 2. 查询所有用户
exports.findAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

// 3. 根据ID查询单个用户
exports.findUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('用户不存在');
  return user;
};

// 4. 根据邮箱查询用户（登录专用，带密码）
exports.findUserByEmail = async (email) => {
  return await User.findOne({ email }).select('+password');
};

// 5. 更新用户信息
exports.updateUserById = async (id, updateData) => {
  const user = await User.findById(id);
  if (!user) throw new Error('用户不存在');

  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// 6. 删除用户
exports.deleteUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('用户不存在');

  await User.findByIdAndDelete(id);
  return true;
};

// 7. 批量删除用户
exports.deleteManyUser = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('请选择要删除的数据');
  }
  const list = await User.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }
  await User.deleteMany({ _id: { $in: ids } });
  return true;
};

//  ========== 用户角色修改（仅允许 user / salesperson） ==========
exports.updateUserRole = async (userId, targetRole) => {
  // 1. 查找用户
  const user = await User.findById(userId);
  if (!user) throw new Error('用户不存在');

  // 2. 允许修改的角色
  const allowRoles = ['user', 'salesperson'];
  if (!allowRoles.includes(targetRole)) {
    throw new Error('仅支持修改为 user / salesperson');
  }

  // 3. 如果角色一样，不用改
  if (user.role === targetRole) {
    throw new Error(`用户角色已是 ${targetRole}`);
  }

  // 4. 修改角色并保存
  user.role = targetRole;
  await user.save();

  return user;
};
// ===================== 用户状态修改（公共函数）=====================
exports.updateUserStatus = async (userId, targetStatus) => {
  // 1. 查用户
  const user = await User.findById(userId);
  if (!user) throw new Error('用户不存在');

  // 2. 校验状态是否合法
  const allowStatus = ['active', 'inactive'];
  if (!allowStatus.includes(targetStatus)) {
    throw new Error('状态仅支持：active / inactive');
  }

  // 3. 如果状态一样，不用改
  if (user.status === targetStatus) {
    throw new Error(`用户状态已是 ${targetStatus}`);
  }

  // 4. 更新状态
  user.status = targetStatus;
  await user.save();

  return user;
};
