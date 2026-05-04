## 一 全局规范

-接口根地址：‘http:localhoast:3000/api"  
-提交方式：‘application/json’  
-验证方式：请求头携带 token  
-开发环境：node.js + express + mongodb

### 公共请求头

| 参数          | 类型   | 必传 | 说明                             |
| ------------- | ------ | ---- | -------------------------------- |
| Authorization | String | 是   | 登录令牌，格式："Bearer token值” |

### 统一返回格式

#### 成功响应

```json
{
  "code": 200,
  "message": "请求成功",
  "data": {}
}
```

#### 响应失败

```json
{
  "code": "400",
  "message": "业务错误提示",
  "data": null
}
```

#### 全局状态码

| 状态码 | 含义                   |
| ------ | ---------------------- |
| 200    | 业务请求成功           |
| 400    | 参数错误，业务校验失败 |
| 401    | 未登录。token过期      |
| 403    | 权限不足               |
| 500    | 服务端异常             |

## 二 业务集合

### 1 用户模块（User 集合）

1.1 用户注册
.请求方式:post  
.请求地址:api/user/resgister  
.鉴权:不需要

请求参数
| 参数名 | 类型 |必传 | 说明 |
| ------- | ----- | ------ | --- |
| username | Strinng | 是 | 用户名 |
| password | String | 是 | 密码 |

请求示例

```json
{
  "username": "user007",
  "password": "123456"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "id": "69eb03c82e7115cd79e2764e",
    "username": "user007"
  },
  "message": "注册成功",
  "requestTime": "2026-04-24T05:46:48.669Z"
}
```

1.2 用户登录
.请方式:post  
.请求地址:/api/user/login  
.鉴权:不需要

请求参数
| 参数名 | 类型 |必传 | 说明 |
| ------- | ----- | ------ | --- |
| account | Strinng | 是 | 账户 |
| password | String | 是 | 密码 |

请求示例

```json
{
  "account": "user007",
  "password": "123456"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "id": "69eb03c82e7115cd79e2764e",
    "username": "user007",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWIwM2M4MmU3MTE1Y2Q3OWUyNzY0ZSIsInVzZXJuYW1lIjoidXNlcjAwNyIsImlhdCI6MTc3NzAxMTIwNCwiZXhwIjoxNzc3NjE2MDA0fQ.kalFB0DH_bVs3Yt41J1gDwzg3hSxUF1fF0BV8KfSx1I"
  },
  "message": "登录成功",
  "requestTime": "2026-04-24T06:13:24.157Z"
}
```

1.3 退出登录  
.请求方式:post  
.请求地址:/api/user/logout  
.接口描述：注销当前登录用户令牌，清空登录状态  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|-----|-----|-----|----|
|null|

请求示例

```json
{}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "退出登录成功",
  "requestTime": "2026-04-24T07:34:15.977Z"
}
```

1.4 获取个人信息.  
.请求方式:get.
.请求地址:/api/auth/Info.  
.接口描述:  
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|----|---|---|---|
||

请求示例

```json
{}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69eb104d1c1c208d6cc11c94",
    "username": "user001",
    "role": "user",
    "createdAt": "2026-04-24T06:40:13.481Z"
  },
  "message": "获取信息成功",
  "requestTime": "2026-04-24T07:14:33.111Z"
}
```

1.5 管理员修改密码.  
.请求方式:post.  
.请求地址:/api/auth/updatePwd.
.接口描述：  
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|-----|----|----|---|
|newPwd|String|是|新密码|

请求示例.

```json
{
  "newPwd": "111111"
}
```

响应示例

```json
{
  "status": "success",
  "data": true,
  "message": "密码修改成功",
  "requestTime": "2026-05-01T06:42:10.346Z"
}
```

1.14用户修改密码.  
.请求方式:put.
.请求地址:/api/user/id/updatePassword
.接口描述：  
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|---|---|---|--|
|oldPwd|String|是｜旧密码|
|newPwd|String|是｜新密码|
请求示例

```json
{
  "newPWD": "0000"
}
```

响应示例

````json
{
  "status": "success",
  "data": true,
  "message": "密码修改成功",
  "requestTime": "2026-05-01T06:42:10.346Z"
}

1.6 忘记密码，发送验证码.
.请求方式:post.
.请求地址:/api/user/sendResetCode.
.接口描述:
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|-----|----|---|---|
|username|String|是|用户名|

请求示例

```json
{
  "username": "admin"
}
````

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "验证码已发送",
  "requestTime": "2026-04-27T17:50:19.610Z"
}
```

1.7 重置密码.  
.请求方式:post.  
.请求地址:/api/user/resetPwd.
.接口描述:  
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|----|---|----|----|
|usename|String|是|用户名|
|code|String|是|六位数验证码|
|newPwd|String|是|新密码|

请求示例

```json
{
  "username": "user01",
  "code": "000000",
  "newPwd": "333444"
}
```

响应示例

```json
{
  "status": "success",
  "message": "密码重置成功，请登录"
}
```

1.7 获取所有用户.  
.请求方式:get.
.请求地址:/api/user/  
.接口描述：  
.鉴权:需要token.

请求参数.  
|参数名|类型|必传|说明|
|----|---|---|---|
|null|

请求示例

```json
{}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "_id": "69eb104d1c1c208d6cc11c94",
        "username": "user001",
        "role": "user",
        "status": "active",
        "createdAt": "2026-04-24T06:40:13.481Z",
        "updatedAt": "2026-04-24T06:40:13.481Z",
        "__v": 0
      },
      {
        "_id": "69eb03c82e7115cd79e2764e",
        "username": "user007",
        "role": "user",
        "status": "active",
        "createdAt": "2026-04-24T05:46:48.687Z",
        "updatedAt": "2026-04-24T05:46:48.687Z",
        "__v": 0
      },
      {
        "_id": "69e9c7dbe068833ad103edd4",
        "username": "user008",
        "email": "123@qq.com",
        "role": "user",
        "status": "active",
        "createdAt": "2026-04-23T07:18:51.366Z",
        "updatedAt": "2026-04-23T07:18:51.366Z",
        "__v": 0
      },
      {
        "_id": "69eb2472ba5f8b88a6b1e0db",
        "username": "admin",
        "role": "admin",
        "status": "active"
      },
      {
        "_id": "69eb24d6ba5f8b88a6b1e0dd",
        "username": "saleperson",
        "role": "saleperson",
        "status": "active"
      }
    ]
  },
  "message": "获取用户列表成功",
  "requestTime": "2026-04-24T08:33:37.237Z"
}
```

1.8 获取用户详情.  
.请求方式:get.  
.请求地址:/api/user/getUserById  
.接口描述：  
.鉴权:需要token

请求参数  
|参数名|类型|必传|说明|
|----|---|--|--|
|userId|String|是|用户id|

请求示例

```json
{
  "urseId": "69eb104d1c1c208d6cc11c94"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69eb104d1c1c208d6cc11c94",
    "username": "user001",
    "role": "user",
    "status": "active",
    "createdAt": "2026-04-24T06:40:13.481Z",
    "updatedAt": "2026-04-24T06:40:13.481Z",
    "__v": 0
  },
  "message": "获取用户详情成功",
  "requestTime": "2026-04-24T08:35:44.623Z"
}
```

1.9 创建用户.  
.请求方式:post.  
.请求地址:/api/user/createUser.  
.接口描述:  
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|----|---|---|---|
|usename|String|是|用户名|
|Password|String|是|新密码|

请求示例

```json
{
  "username": "user0009",
  "password": "009"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "username": "user009",
    "password": "$2b$10$nsZXLOVKRUyyHGpPnsktZuEzsfiak3iSr34PrtUBSi8ifWGc/P8Cy",
    "role": "user",
    "status": "active",
    "_id": "69eba41570cdd7c6e73e3cd2",
    "createdAt": "2026-04-24T17:10:45.965Z",
    "updatedAt": "2026-04-24T17:10:45.965Z",
    "__v": 0
  },
  "message": "创建用户成功",
  "requestTime": "2026-04-24T17:10:45.957Z"
}
```

1.10 更新用户资料.  
.请求方式:put.
.请求地址:/api/user/id
.接口描述：  
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|---|---|---|--|
|updata|json|是|更新数据|

请求示例

```json
{
  "username": "user03"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69eb104d1c1c208d6cc11c94",
    "username": "user003",
    "role": "user",
    "status": "active",
    "createdAt": "2026-04-24T06:40:13.481Z",
    "updatedAt": "2026-04-24T16:38:42.436Z",
    "__v": 0
  },
  "message": "更新用户成功",
  "requestTime": "2026-04-24T16:38:42.434Z"
}
```

1.11 删除单个用户.  
.请求方式:delete.  
.请求地址:/api/user/id/delete
.接口描述：  
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|---|---|---|---|
|userid|String|是|用户id|

请求示例

```json
{
  "userid": "69e9c7dbe068833ad103edd4"
}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "删除用户成功",
  "requestTime": "2026-04-24T17:04:53.864Z"
}
```

1.12 批量删除用户  
.请求方式:delete.  
.请求地址:/api/user/batch/delete
.接口描述：  
.鉴权:需要token.

请求参数  
|参数名|类型|必传|说明|
|---|---|---|--|
|ids|array|是|删除用户的数组|

请求示例

```json
{
  "ids": ["69eb104d1c1c208d6cc11c94", "69eb03c82e7115cd79e2764e"]
}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "批量删除成功",
  "requestTime": "2026-04-27T16:34:24.904Z"
}
```

1.13 用户状态(启用/禁用)  
.请求方式:post.  
.请求地址:/api/user/status.
.接口描述：  
.鉴权:需要token.

请求参数  
|参数名|类型|必传|说明|
|----|---|---|---|
|userid|String|是|用户id|
|targetStatus|Sreing|是|目标状态|

请求示例

```json
{
  "targetStatus": "active"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69eba41570cdd7c6e73e3cd2",
    "username": "user009",
    "role": "user",
    "status": "inactive",
    "createdAt": "2026-04-24T17:10:45.965Z",
    "updatedAt": "2026-04-25T05:41:01.833Z",
    "__v": 0
  },
  "message": "状态修改成功：inactive",
  "requestTime": "2026-04-25T05:41:01.811Z"
}
```

1.13 用户角色（用户/售货员/管理员）  
.请求方式:post  
.请求地址:/api/user/role  
.接口描述：
.鉴权:需要token

请求参数  
|参数名|类型|必传|说明|
|----|---|---|---|
|userId|----|----|----|
|targetRole|String|是|目标角色|

请求示例

```json
{
  "targetRole": "salesperson"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69eba41570cdd7c6e73e3cd2",
    "username": "user009",
    "role": "salesperson",
    "status": "inactive",
    "createdAt": "2026-04-24T17:10:45.965Z",
    "updatedAt": "2026-04-26T06:14:12.189Z",
    "__v": 0
  },
  "message": "角色修改成功：salesperson",
  "requestTime": "2026-04-26T06:14:12.183Z"
}
```

1.14用户修改密码.  
.请求方式:put.
.请求地址:/api/user/id/updatePassword
.接口描述：  
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|---|---|---|--|
|oldPwd|String|是｜旧密码|
|newPwd|String|是｜新密码|
请求示例

```json
{
  "newPWD": "0000"
}
```

响应示例

```json
{
  "status": "success",
  "data": true,
  "message": "密码修改成功",
  "requestTime": "2026-05-01T06:42:10.346Z"
}
```

### 2 产品模块（Product 集合）

2.1 获取所有产品.  
.请求方式:get.  
.请求地址:/api/product/getAllProducts.  
.接口描述：  
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|----|---|---|---|
|null|

请求示例

```json
{}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "_id": "69edb0132b428049d1094d91",
        "name": "product01",
        "price": 100,
        "stock": 0,
        "supplierId": "69edaf3d2b428049d1094d90",
        "status": "on",
        "createdAt": "2026-04-26T06:26:27.960Z",
        "updatedAt": "2026-04-26T06:26:27.960Z",
        "__v": 0
      }
    ]
  },
  "message": "获取商品列表成功",
  "requestTime": "2026-04-26T06:28:20.651Z"
}
```

2.2 获取单个产品详情  
.请求方式:get.  
.请求地址:/api/product/getProduct.  
.接口描述：  
.鉴权:需要token

请求参数.  
|参数名|类型|必传|说明|
|----|---|---|--|
|productId|String|是|产品id|

请求示例

```json
{
  "productId": "69edb0132b428049d1094d91"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69edb0132b428049d1094d91",
    "name": "product01",
    "price": 100,
    "stock": 0,
    "supplierId": null,
    "status": "on",
    "createdAt": "2026-04-26T06:26:27.960Z",
    "updatedAt": "2026-04-26T06:26:27.960Z",
    "__v": 0
  },
  "message": "获取商品详情成功",
  "requestTime": "2026-04-27T16:20:49.009Z"
}
```

2.3 创建一个产品.  
.请求方式:post.  
.请求地址:/api/product/createProduct.  
.接口描述：  
.鉴权:需要token

请求参数  
|参数名|类型|必传|说明|
|----|----|----|---|
|name|String|是|商品名称|
|price|Number|是|价格|
|stock|Number|是|库存|
|supplierId|Object|是|供应商id|

请求示例

```json
{
  "name": "product01",
  "price": "100",
  "supplierid": "69edaf3d2b428049d1094d90"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "name": "product01",
    "price": 100,
    "stock": 0,
    "supplierId": "69edaf3d2b428049d1094d90",
    "status": "on",
    "_id": "69edb0132b428049d1094d91",
    "createdAt": "2026-04-26T06:26:27.960Z",
    "updatedAt": "2026-04-26T06:26:27.960Z",
    "__v": 0
  },
  "message": "创建商品成功",
  "requestTime": "2026-04-26T06:26:27.956Z"
}
```

2.4 更新产品.  
.请求方式:put.  
.请求地址:/api/product/updateProduct.  
.接口描述：  
.鉴权:需要token.

请求参数
|参数名|类型|必传|说明|
|-----|----|----|----|
|productId|String|是|商品id|
|updateData|json|是|更新数据|

请求示例

```json
{
  "stock": 10
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69edb0132b428049d1094d91",
    "name": "product01",
    "price": 100,
    "stock": 10,
    "supplierId": "69edaf3d2b428049d1094d90",
    "status": "on",
    "createdAt": "2026-04-26T06:26:27.960Z",
    "updatedAt": "2026-04-27T16:24:19.175Z",
    "__v": 0
  },
  "message": "更新商品成功",
  "requestTime": "2026-04-27T16:24:19.158Z"
}
```

2.5 删除单个产品.  
.请求方式:delete.  
.请求地址:/api/product/deleteProduct.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|productId|String|是|商品id|

请求示例

```json
{
  "productId": "69edb0132b428049d1094d91/"
}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "删除商品成功",
  "requestTime": "2026-04-27T16:26:10.147Z"
}
```

2.6 批量删除产品.  
.请求方式:delete.  
.请求地址:/api/product/batch/delete.  
.接口描述：
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|ids|Array|是|批量删除产品ID的数据集合|

请求示例

```json
{
  "ids": ["69edc8b707ce576a454b93fe", "69edc8d407ce576a454b93ff"]
}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "批量删除成功",
  "requestTime": "2026-04-27T16:28:55.862Z"
}
```

2.7 改变产品上下架状态.  
.请求方式:post.  
.请求地址:/api/product/changeStatus.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|-----|----|----|----|
|productId|String|是|产品id|
|on|String|是|上架|
|off|String|是|下架|

请求示例

```json
{
  "status": "off"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69edc8e207ce576a454b9401",
    "name": "product04",
    "price": 300,
    "stock": 100,
    "supplierId": "69edc667b6e997e4c321a2cb",
    "status": "off",
    "createdAt": "2026-04-26T08:12:18.326Z",
    "updatedAt": "2026-04-27T16:31:03.646Z",
    "__v": 0
  },
  "message": "更新商品成功",
  "requestTime": "2026-04-27T16:31:03.643Z"
}
```

### 3 供应商模块 （Supplier）

3.1 获取所有供应商.  
.请求方式:get.  
.请求地址:/api/supplier/  
.接口描述：
.鉴权:需要token

请求参数  
|参数名|类型|必传|说明|
|----|----|---|----|
|null|

请求示例

```json
{}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "_id": "69edc681b6e997e4c321a2cd",
        "name": "supplier003",
        "phone": "2552",
        "address": "moscow",
        "status": "able",
        "createdAt": "2026-04-26T08:02:09.340Z",
        "updatedAt": "2026-04-27T16:15:12.063Z",
        "__v": 0
      },
      {
        "_id": "69edc674b6e997e4c321a2cc",
        "name": "supplier002",
        "phone": "2551",
        "address": "vitebsk",
        "status": "able",
        "createdAt": "2026-04-26T08:01:56.022Z",
        "updatedAt": "2026-04-26T08:01:56.022Z",
        "__v": 0
      },
      {
        "_id": "69edc667b6e997e4c321a2cb",
        "name": "supplier001",
        "phone": "2550",
        "address": "minsk",
        "status": "able",
        "createdAt": "2026-04-26T08:01:43.247Z",
        "updatedAt": "2026-04-26T08:01:43.247Z",
        "__v": 0
      }
    ]
  },
  "message": "获取供应商列表成功",
  "requestTime": "2026-04-27T16:18:23.760Z"
}
```

3.2 获取单个供应商详情.  
.请求方式:get.  
.请求地址:/api/supplier/getSupplier.  
.接口描述：
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|-----|----|---|---|
|supplierId|String|是|供应商id|

请求示例

```json
{
  "supplierId": "69edc681b6e997e4c321a2cd"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69edc681b6e997e4c321a2cd",
    "name": "supplier003",
    "phone": "2552",
    "address": "moscow",
    "status": "able",
    "createdAt": "2026-04-26T08:02:09.340Z",
    "updatedAt": "2026-04-27T16:15:12.063Z",
    "__v": 0
  },
  "message": "获取供应商详情成功",
  "requestTime": "2026-04-27T16:19:14.226Z"
}
```

3.3 创建一个供应商.  
.请求方式:post.  
.请求地址:/api/supplier/createSupplier.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|name|String|是|商品名称|
|phone|String|是|电话|
|address|String|是|地址|

请求示例

```json
{
  "name": "supplier001",
  "phone": "255079778",
  "address": "minsk"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "name": "supplier001",
    "phone": "255079778",
    "address": "minsk",
    "status": "able",
    "_id": "69edaf3d2b428049d1094d90",
    "createdAt": "2026-04-26T06:22:53.947Z",
    "updatedAt": "2026-04-26T06:22:53.947Z",
    "__v": 0
  },
  "message": "创建供应商成功",
  "requestTime": "2026-04-26T06:22:53.932Z"
}
```

3.4 更新供应商  
.请求方式:put.  
.请求地址:/api/supplier/id/update
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|---|---|
|supplierId|String|是|供应商id|
|update|json|是|更新数据|

请求示例

```json
{
  "status": "able"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69edc681b6e997e4c321a2cd",
    "name": "supplier003",
    "phone": "2552",
    "address": "moscow",
    "status": "able",
    "createdAt": "2026-04-26T08:02:09.340Z",
    "updatedAt": "2026-04-27T16:15:12.063Z",
    "__v": 0
  },
  "message": "更新供应商成功",
  "requestTime": "2026-04-27T16:15:12.061Z"
}
```

3.5 删除单个供应商.  
.请求方式:delete.  
.请求地址:/api/supplier/deleteSupplier.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|supplierId|String|是|商品id|

请求示例

```json
{
  "supplierId": "69ef8964e8b99293e843be97"
}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "删除供应商成功",
  "requestTime": "2026-04-27T16:11:32.865Z"
}
```

3.6 批量删除供应商.  
.请求方式:delete.  
.请求地址:/api/psupplier/batch/delete  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|---|---|---|---|
|ids|Array|是|批量删除供应商ID的数据集合|

请求示例

```json
{
  "ids": ["69ef8972e8b99293e843be99", "69ef896be8b99293e843be98"]
}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "批量删除成功",
  "requestTime": "2026-04-27T16:06:53.335Z"
}
```

3.7 改变供应商启用/禁用状态.  
.请求方式:post.  
.请求地址:/api/supplier/id/status
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|---|---|---|---|
|supplierId|String|是|产品id|
|status|String|是|供应商状态|

请求示例

```json
{
  "status": "disable"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69edc681b6e997e4c321a2cd",
    "name": "supplier003",
    "phone": "2552",
    "address": "moscow",
    "status": "disable",
    "createdAt": "2026-04-26T08:02:09.340Z",
    "updatedAt": "2026-04-27T15:51:23.902Z",
    "__v": 0
  },
  "message": "供应商状态修改成功",
  "requestTime": "2026-04-27T15:51:23.893Z"
}
```

### 4 订单模块（Oder 集合）

4.1 获取所有订单.  
.请求方式:get.  
.请求地址:/api/oredr/
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|---|---|----|
|null|

请求示例

```json
{}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "id": "69ef781d5690a21e55659a40",
        "orderNo": "ORD_20260427_1757",
        "userId": {
          "_id": "69eb03c82e7115cd79e2764e",
          "username": "user007"
        },
        "createdBy": {
          "_id": "69eb2472ba5f8b88a6b1e0db",
          "username": "admin"
        },
        "createType": "user",
        "items": [
          {
            "productId": {
              "_id": "69edb0132b428049d1094d91",
              "price": 100
            },
            "price": 100,
            "quantity": 3,
            "_id": "69ef781d5690a21e55659a41"
          }
        ],
        "totalPrice": 300,
        "address": {
          "name": "purchaser01",
          "phone": "255079798",
          "address": "berlin"
        },
        "payType": "card"
      },
      {
        "id": "69ef75238a7a711215c20f6c",
        "orderNo": "ORD_20260427_8043",
        "userId": {
          "_id": "69eb2472ba5f8b88a6b1e0db",
          "username": "admin"
        },
        "createdBy": {
          "_id": "69eb2472ba5f8b88a6b1e0db",
          "username": "admin"
        },
        "createType": "user",
        "items": [
          {
            "productId": {
              "_id": "69edc8db07ce576a454b9400",
              "price": 200
            },
            "price": 200,
            "quantity": 3,
            "_id": "69ef75238a7a711215c20f6d"
          }
        ],
        "totalPrice": 600,
        "address": {
          "name": "purchaser01",
          "phone": "255079798",
          "address": "warsaw"
        },
        "payType": "card"
      },
      {
        "id": "69edc95f07ce576a454b9406",
        "orderNo": "ORD_20260426_7904",
        "userId": {
          "_id": "69eba41570cdd7c6e73e3cd2",
          "username": "user009"
        },
        "createdBy": {
          "_id": "69eb2472ba5f8b88a6b1e0db",
          "username": "admin"
        },
        "createType": "user",
        "items": [
          {
            "productId": {
              "_id": "69edc8e207ce576a454b9401",
              "price": 300
            },
            "price": 300,
            "quantity": 4,
            "_id": "69edc95f07ce576a454b9407"
          }
        ],
        "totalPrice": 1200,
        "address": {
          "name": "purchaser03",
          "phone": "255079710",
          "address": "moscow"
        },
        "payType": "card"
      }
    ]
  },
  "message": "获取订单列表成功",
  "requestTime": "2026-04-27T15:43:41.830Z"
}
```

4.2 获取单个订单详情
.请求方式:get
.请求地址:/api/oredr/id
.接口描述：
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|orderId|String|是|订单id|

请求示例

```json
{
  "orderId": "69ef781d5690a21e55659a40"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69ef781d5690a21e55659a40",
    "orderNo": "ORD_20260427_1757",
    "userId": {
      "_id": "69eb03c82e7115cd79e2764e",
      "username": "user007"
    },
    "createType": "user",
    "items": [
      {
        "productId": {
          "_id": "69edb0132b428049d1094d91",
          "price": 100
        },
        "price": 100,
        "quantity": 3,
        "_id": "69ef781d5690a21e55659a41"
      }
    ],
    "totalPrice": 300,
    "address": {
      "name": "purchaser01",
      "phone": "255079798",
      "address": "berlin"
    },
    "payType": "card"
  },
  "message": "获取订单详情成功",
  "requestTime": "2026-04-27T15:15:13.071Z"
}
```

4.3 创建一个订单  
.请求方式:post.  
.请求地址:/api/order/createOrder.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|userId|String|是|顾客id|
|items|Array|是|商品数组|
|address|String|是|收件人信息|

请求示例

```json
{
  "userId": "69eb03c82e7115cd79e2764e",
  "items": [
    {
      "productId": "69edb0132b428049d1094d91",
      "quantity": 1
    }
  ],
  "address": {
    "name": "purchaser01",
    "phone": "255079798",
    "address": "berlin"
  }
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "orderNo": "ORD_20260427_4797",
    "userId": "69eb03c82e7115cd79e2764e",
    "createdBy": "69eb2472ba5f8b88a6b1e0db",
    "createType": "user",
    "items": [
      {
        "productId": "69edb0132b428049d1094d91",
        "price": 100,
        "quantity": 1,
        "_id": "69ef730f9f9570e5c5fa3ed4"
      }
    ],
    "totalPrice": 100,
    "status": "pending",
    "address": {
      "name": "purchaser01",
      "phone": "255079798",
      "address": "berlin"
    },
    "payType": "card",
    "_id": "69ef730f9f9570e5c5fa3ed3",
    "createdAt": "2026-04-27T14:30:39.457Z",
    "updatedAt": "2026-04-27T14:30:39.457Z",
    "__v": 0
  },
  "message": "创建订单成功",
  "requestTime": "2026-04-27T14:30:39.447Z"
}
```

4.4 更新订单.  
.请求方式:put.  
.请求地址:/api/order/updateorder.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|orderId|String|是|订单id|

请求示例

```json
{
  "address": {
    "name": "purchaser01",
    "phone": "255079798",
    "address": "new yourk"
  }
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "address": {
      "name": "purchaser01",
      "phone": "255079798",
      "address": "new yourk"
    },
    "_id": "69edc8fa07ce576a454b9402",
    "orderNo": "ORD_20260426_5863",
    "userId": "69eb03c82e7115cd79e2764e",
    "createdBy": "69eb2472ba5f8b88a6b1e0db",
    "createType": "user",
    "items": [
      {
        "productId": "69edb0132b428049d1094d91",
        "price": 100,
        "quantity": 1,
        "_id": "69edc8fa07ce576a454b9403"
      }
    ],
    "totalPrice": 100,
    "status": "pending",
    "payType": "card",
    "createdAt": "2026-04-26T08:12:42.491Z",
    "updatedAt": "2026-04-27T14:27:09.637Z",
    "__v": 0
  },
  "message": "更新订单成功",
  "requestTime": "2026-04-27T14:27:09.633Z"
}
```

4.5 删除单个产品.  
.请求方式:delete.  
.请求地址:/api/order/deleteorder.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|orderId|String|是|商品id|

请求示例

```json
{
  "orderId": "69edc434b6e997e4c321a2c0"
}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "删除订单成功",
  "requestTime": "2026-04-27T14:20:43.915Z"
}
```

4.6 批量删除订单.  
.请求方式:delete.  
.请求地址:/api/order/batch/delete  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|---|
|ids|Array|是|批量删除产品ID的数据集合|

请求示例

```json
{
  "ids": ["69edc693b6e997e4c321a2ce", "69edc694b6e997e4c321a2d0"]
}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "批量删除成功",
  "requestTime": "2026-04-27T14:24:33.650Z"
}
```

4.7 改变订单状态.  
.请求方式:post.  
.请求地址:/api/order/id/status.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|orderId|String|是|产品id|
|status|String|是|订单状态|

请求示例

```json
{
  "status": "paid"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "address": {
      "name": "purchaser03",
      "phone": "255079710",
      "address": "moscow"
    },
    "_id": "69edc95f07ce576a454b9406",
    "orderNo": "ORD_20260426_7904",
    "userId": "69eba41570cdd7c6e73e3cd2",
    "createdBy": "69eb2472ba5f8b88a6b1e0db",
    "createType": "user",
    "items": [
      {
        "productId": "69edc8e207ce576a454b9401",
        "price": 300,
        "quantity": 4,
        "_id": "69edc95f07ce576a454b9407"
      }
    ],
    "totalPrice": 1200,
    "status": "paid",
    "payType": "card",
    "createdAt": "2026-04-26T08:14:23.346Z",
    "updatedAt": "2026-04-27T14:18:04.236Z",
    "__v": 0
  },
  "message": "订单状态修改成功",
  "requestTime": "2026-04-27T14:18:04.190Z"
}
```

### 5 配送模块（Delivery 集合）

5.1 获取所有配送单  
.请求方式:get.  
.请求地址:/api/delivery/  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|---|---|
|null|

请求示例

```json
{}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "_id": "69edcd9ae7134f08b8ede6cc",
        "deliveryNo": "ORD_20260426_6622",
        "orderId": {
          "_id": "69edc95f07ce576a454b9406",
          "orderNo": "ORD_20260426_7904",
          "totalPrice": 1200
        },
        "status": "waiting",
        "createdAt": "2026-04-26T08:32:26.156Z",
        "updatedAt": "2026-04-26T08:32:26.156Z",
        "__v": 0
      },
      {
        "_id": "69edcd85e7134f08b8ede6ca",
        "deliveryNo": "ORD_20260426_3230",
        "orderId": {
          "_id": "69edc693b6e997e4c321a2ce",
          "orderNo": "ORD_20260426_7036",
          "totalPrice": 100
        },
        "status": "waiting",
        "createdAt": "2026-04-26T08:32:05.383Z",
        "updatedAt": "2026-04-26T08:32:05.383Z",
        "__v": 0
      },
      {
        "_id": "69edcc77e7134f08b8ede6c8",
        "deliveryNo": "ORD_20260426_4627",
        "orderId": {
          "_id": "69edc434b6e997e4c321a2c0",
          "orderNo": "ORD_20260426_1304",
          "totalPrice": 100
        },
        "status": "waiting",
        "createdAt": "2026-04-26T08:27:35.364Z",
        "updatedAt": "2026-04-26T08:27:35.364Z",
        "__v": 0
      }
    ]
  },
  "message": "获取配送单列表成功",
  "requestTime": "2026-04-26T08:32:40.411Z"
}
```

5.2 获取单个配送单详情.  
.请求方式:get.  
.请求地址:/api/delivery/
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|-----|----|----|----|
|orderId|String|是|订单id|

请求示例

```json
{
  "deliveryId": "69edcc77e7134f08b8ede6c8"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69edcc77e7134f08b8ede6c8",
    "deliveryNo": "ORD_20260426_4627",
    "orderId": {
      "_id": "69edc434b6e997e4c321a2c0",
      "orderNo": "ORD_20260426_1304",
      "totalPrice": 100
    },
    "status": "waiting",
    "createdAt": "2026-04-26T08:27:35.364Z",
    "updatedAt": "2026-04-26T08:27:35.364Z",
    "__v": 0
  },
  "message": "获取配送单详情成功",
  "requestTime": "2026-04-26T08:33:53.118Z"
}
```

5.3 创建一个配送单.  
.请求方式:post.  
.请求地址:/api/delivery/create  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|-----|----|----|----|
|orderId|String|是|订单Id|

请求示例

```json
{
  "orderId": "69edc434b6e997e4c321a2c0"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "deliveryNo": "ORD_20260426_4627",
    "orderId": "69edc434b6e997e4c321a2c0",
    "status": "waiting",
    "_id": "69edcc77e7134f08b8ede6c8",
    "createdAt": "2026-04-26T08:27:35.364Z",
    "updatedAt": "2026-04-26T08:27:35.364Z",
    "__v": 0
  },
  "message": "创建配送单成功",
  "requestTime": "2026-04-26T08:27:35.337Z"
}
```

5.4 更新配送单.  
.请求方式:put.  
.请求地址:/api/product/id/update.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|deliveryId|String|是|配送单Id|

请求示例

```json
{
  "address": {
    "name": "purchaser01",
    "phone": "255079798",
    "address": "london"
  }
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "address": {
      "name": "purchaser01",
      "phone": "255079798",
      "address": "london"
    },
    "_id": "69edd2cc97802dd5cece5196",
    "deliveryNo": "ORD_20260426_7807",
    "orderId": "69edc694b6e997e4c321a2d0",
    "status": "waiting",
    "createdAt": "2026-04-26T08:54:36.194Z",
    "updatedAt": "2026-04-26T09:01:19.776Z",
    "__v": 0
  },
  "message": "更新配送单成功",
  "requestTime": "2026-04-26T09:01:19.759Z"
}
```

5.5 删除单个产品.  
.请求方式:delete.  
.请求地址:/api/product/id/delete.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|---|---|
|deliveryId|String|是|配送单id|

请求示例

```json
{
  "deliveryId": "69edd2cc97802dd5cece5196"
}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "删除配送单成功",
  "requestTime": "2026-04-26T09:05:44.945Z"
}
```

5.6 批量删除配送单.  
.请求方式:delete.  
.请求地址:/api/product/batch/delete.  
.接口描述：  
.鉴权:需要token.

请求参数  
|参数名|类型|必传|说明|
|----|---|---|---|
|ids|Array|是|批量删配送单ID的数据集合|

请求示例

```json
{
  "ids": ["69edd1f897802dd5cece5194", "69edcd9ae7134f08b8ede6cc"]
}
```

响应示例

```json
{
  "status": "success",
  "data": null,
  "message": "批量删除成功",
  "requestTime": "2026-04-26T09:16:56.691Z"
}
```

5.7 改变配送单状态.  
.请求方式:post.  
.请求地址:/api/delivery/id/status.  
.接口描述：  
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|---|---|
|deliveryId|String|是|配送单id|
|status|string|是|配送单状态｜

请求示例

```json
{
  "status": "delivered"
}
```

响应示例

```json
{
  "status": "success",
  "data": {
    "_id": "69edcc77e7134f08b8ede6c8",
    "deliveryNo": "ORD_20260426_4627",
    "orderId": "69edc434b6e997e4c321a2c0",
    "status": "delivered",
    "createdAt": "2026-04-26T08:27:35.364Z",
    "updatedAt": "2026-04-26T09:23:22.224Z",
    "__v": 0
  },
  "message": "配送状态修改成功",
  "requestTime": "2026-04-26T09:23:22.214Z"
}
```
