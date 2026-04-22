后端接口文档
一 全局规范
接口根地址：http://localhost:3000/api
提交方式：Content-Type: application/json
验证方式：请求头携带 Token
开发环境：Node.js + Express + MongoDB
公共请求头
表格
参数 是否必传 类型 说明
Authorization 是 String 登录令牌，格式：Bearer token值
统一返回格式
成功响应
json
{
"code": 200,
"message": "请求成功",
"data": {}
}
响应失败
json
{
"code": 400,
"message": "业务错误提示",
"data": null
}
全局状态码
表格
状态码 含义
200 业务请求成功
400 参数错误，业务校验失败
401 未登录，Token 过期
403 权限不足
500 服务端异常
二 业务集合
1 用户模块（User 集合）
1.1 用户注册
请求方式：POST
请求地址：/api/user/register
鉴权：不需要
请求参数
表格
参数名 类型 必选 说明
username String 是 用户名
password String 是 密码
请求示例
json
{
"username": "user01",
"password": "123456"
}
响应示例
json
{
"code": 200,
"message": "注册成功",
"data": {
"userId": "777888",
"username": "user01"
}
}
1.2 用户登录
请求方式：POST
请求地址：/api/user/login
鉴权：不需要
请求参数
表格
参数名 类型 必选 说明
username String 是 用户名
password String 是 密码
请求示例
json
{
"username": "user01",
"password": "123456"
}
响应示例
json
{
"code": 200,
"message": "登录成功",
"data": {
"token": "xxxx.xxxx.xxxx",
"userId": "666111",
"role": "user"
}
}
1.3 退出登录
请求方式：POST
请求地址：/api/user/logout
接口描述：注销当前登录用户令牌，清空登录状态
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
无 - - -
响应示例
json
{
"code": 200,
"message": "退出登录成功",
"data": null
}
1.4 获取个人信息
请求方式：GET
请求地址：/api/user/getInfo
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
无 - - -
响应示例
json
{
"code": 200,
"message": "获取信息成功",
"data": {
"id": "22223333",
"username": "user01",
"email": "123@qq.com",
"role": "user"
}
}
1.5 修改密码
请求方式：POST
请求地址：/api/user/updatePwd
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
oldPwd String 是 旧密码
newPwd String 是 新密码
请求示例
json
{
"oldPwd": "123456",
"newPwd": "111111"
}
响应示例
json
{
"code": 200,
"message": "密码修改成功，请重新登录",
"data": null
}
1.6 忘记密码，发送验证码
请求方式：POST
请求地址：/api/user/sendResetCode
鉴权：不需要
请求参数
表格
参数名 类型 必选 说明
username String 是 用户名
响应示例
json
{
"code": 200,
"message": "验证码已发送",
"data": null
}
1.7 重置密码
请求方式：POST
请求地址：/api/user/resetPwd
鉴权：不需要
请求参数
表格
参数名 类型 必选 说明
username String 是 用户名
code String 是 六位数验证码
newPwd String 是 新密码
响应示例
json
{
"code": 200,
"message": "密码重置成功，请登录",
"data": null
}
1.8 获取所有用户
请求方式：GET
请求地址：/api/user/getAllUsers
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
page Number 否 页码
limit Number 否 每页条数
响应示例
json
{
"code": 200,
"message": "请求成功",
"data": {
"total": 0,
"page": 1,
"limit": 10,
"list": []
}
}
1.9 获取用户详情
请求方式：GET
请求地址：/api/user/getUserById
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
userId String 是 用户 ID
1.10 创建用户
请求方式：POST
请求地址：/api/user/createUser
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
username String 是 用户名
password String 是 密码
1.11 更新用户资料
请求方式：PUT
请求地址：/api/user/updateUserById
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
userId String 是 用户 ID
username String 否 用户名
1.12 删除单个用户
请求方式：DELETE
请求地址：/api/user/deleteUserById
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
userId String 是 用户 ID
1.13 批量删除用户
请求方式：DELETE
请求地址：/api/user/deleteManyUser
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
ids Array 是 用户 ID 数组
1.14 用户状态（启用 / 禁用）
请求方式：POST
请求地址：/api/user/status
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
userId String 是 用户 ID
targetStatus String 是 目标状态
1.15 用户角色（用户 / 售货员 / 管理员）
请求方式：POST
请求地址：/api/user/role
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
userId String 是 用户 ID
targetRole String 是 目标角色
2 产品模块（Product 集合）
2.1 获取所有产品
请求方式：GET
请求地址：/api/product/getAllProducts
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
page Number 否 页码
limit Number 否 每页条数
2.2 获取单个产品详情
请求方式：GET
请求地址：/api/product/getProduct
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
productId String 是 产品 id
2.3 创建一个产品
请求方式：POST
请求地址：/api/product/createProduct
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
name String 是 商品名称
price Number 是 价格
stock Number 是 库存
supplierId String 是 供应商 id
description String 否 描述
status String 否 上下架状态
2.4 更新产品
请求方式：PUT
请求地址：/api/product/updateProduct
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
productId String 是 产品 ID
name String 是 商品名称
price Number 是 价格
stock Number 是 库存
supplierId String 是 供应商 id
description String 否 描述
2.5 删除单个产品
请求方式：DELETE
请求地址：/api/product/deleteProduct
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
productId String 是 商品 id
2.6 批量删除产品
请求方式：DELETE
请求地址：/api/product/deleteManyProduct
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
ids Array 是 批量删除产品 ID 集合
2.7 改变产品上下架状态
请求方式：POST
请求地址：/api/product/changeStatus
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
productId String 是 产品 id
status String 是 on 上架 /off 下架
3 供应商模块（Supplier）
3.1 获取所有供应商
请求方式：GET
请求地址：/api/supplier/getAllSupplier
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
page Number 否 页码
limit Number 否 每页条数
3.2 获取单个供应商详情
请求方式：GET
请求地址：/api/supplier/getSupplier
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
supplierId String 是 供应商 id
3.3 创建一个供应商
请求方式：POST
请求地址：/api/supplier/createSupplier
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
name String 是 供应商名称
phone String 是 电话
address String 是 地址
status String 否 启用 / 禁用状态
3.4 更新供应商
请求方式：PUT
请求地址：/api/supplier/updateSupplier
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
supplierId String 是 供应商 id
name String 是 供应商名称
phone String 是 电话
address String 是 地址
status String 否 启用 / 禁用状态
3.5 删除单个供应商
请求方式：DELETE
请求地址：/api/supplier/deleteSupplier
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
supplierId String 是 供应商 id
3.6 批量删除供应商
请求方式：DELETE
请求地址：/api/supplier/deleteManySupplier
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
ids Array 是 批量删除 ID 集合
3.7 改变供应商启用 / 禁用状态
请求方式：POST
请求地址：/api/supplier/changeStatus
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
supplierId String 是 供应商 id
status String 是 active 启用 /inactive 禁用
4 订单模块（Order 集合）
4.1 获取所有订单
请求方式：GET
请求地址：/api/order/getAllOrder
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
page Number 否 页码
limit Number 否 每页条数
4.2 获取单个订单详情
请求方式：GET
请求地址：/api/order/getOrderById
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
orderId String 是 订单 id
4.3 创建一个订单
请求方式：POST
请求地址：/api/order/createOrder
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
userId String 是 顾客 id
createdBy String 是 创建订单人 id
items Array 是 商品数组
createType String 否 创建类型 [user/salesperson]
totalPrice Number 是 金额合计
status String 是 订单状态
address Object 是 收件人地址
payType String 否 支付类型
remark String 否 订单备注
4.4 更新订单
请求方式：PUT
请求地址：/api/order/updateOrder
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
orderId String 是 订单 id
4.5 删除单个订单
请求方式：DELETE
请求地址：/api/order/deleteOrder
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
orderId String 是 订单 id
4.6 批量删除订单
请求方式：DELETE
请求地址：/api/order/deleteManyOrder
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
ids Array 是 订单 ID 数组
4.7 改变订单状态
请求方式：POST
请求地址：/api/order/changeStatus
鉴权：需要 Token
请求参数
表格
参数名 类型 必选 说明
orderId String 是 订单 id
status String 是 订单状态枚举
5 配送模块（Delivery 集合）
接口规范、表格、代码块与产品模块保持一致
