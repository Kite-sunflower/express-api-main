
## 一 全局规范

-接口根地址：‘http:localhoast:3000/api'   
-提交方式：‘application/json’   
-验证方式：请求头携带 token  
-开发环境：node.js + express + mongodb  

### 公共请求头

| 参数 | 类型 | 必传 | 说明 |
| --- | ------ | ---- | --- |
| Authorization | String | 是| 登录令牌，格式：“Bearer token值” |

### 统一返回格式

#### 成功响应

```json
{
“code“ :200,
”message“:"请求成功",
”data“:{}
}
```

#### 响应失败

```json
{
"code":"400",
"message":"业务错误提示",
"data":null
}
```

#### 全局状态码

| 状态码 | 含义|
| ------| ------ |
| 200 |业务请求成功 |
| 400 | 参数错误，业务校验失败 |
| 401 | 未登录。token过期 |
| 403 | 权限不足 |
| 500 | 服务端异常 |

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
"username":"user01",
"password":"123456"
}
```

响应示例
```json
{
"status": 'success',
"message":"注册成功",
"data":{
"userId":"777888"
"username":"user01"
}
```

1.2 用户登录
.请方式:post  
.请求地址:/api/user/login  
.鉴权:不需要  

请求参数
| 参数名 | 类型 |必传 | 说明 |
| ------- | ----- | ------ | --- |
| username | Strinng | 是 | 用户名 |
| password | String | 是 | 密码 |


请求示例
```json
{
"username":"user01",
"password":"123456"
}
```
响应示例
```json
{
"status": 'success',
"message":"登录成功",
"data":{
"token":"xxxx.xxxx.xxxx",
"userId":"666111"
"role":"user"
    }
}
```

1.3 退出登录  
.请求方式:post  
.请求地址:/api/user/loginout  
.接口描述：注销当前登录用户令牌，清空登录状态  
.鉴权:需要token  

请求参数
|参数名|类型|必传|说明|
|-----|-----|-----|----| 
|null|

请求示例
```json
{

}
```
响应示例
```json
{
"status": 'success',
"message":"退出登录成功",
"data":null
}
```

1.4 获取个人信息.   
.请求方式:get. 
.请求地址:/api/user/getInfo.   
.接口描述:  
.鉴权:需要token. 

请求参数
|参数名|类型|必传|说明|
|----|---|---|---|
|null|

请求示例
```json
{

}
```

响应示例
```json
{
"status": 'success',
"message":"获取信息成功",
"data":{
"id": "22223333",
"username": "user01",
"email": "123@qq.com",
"role": "user"
}
}
```

1.5 修改密码.   
.请求方式:post.  
.请求地址:/api/user/updatePwd. 
.接口描述：  
.鉴权:需要token. 

请求参数
|参数名|类型|必传|说明|
|-----|----|----|---|
|oldPwd|String|是|旧密码|
|newPwd|String|是|新密码|


请求示例.  

```json
{
“oldPwd”:“123456”,
"newPwd":"111111"
}
```
响应示例

```json
{
"status": 'success',
"message":"密码修改成功，请从新登录",
}
```

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
“username”:"user01
}
```
响应示例

```json
{
"status": 'success',
"message":"验证码已发送",
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
“username”:"user01",
"code":"000000“,
"newPwd":"333444"
}
```
响应示例
```json
{
"status": 'success',
"message":"密码重置成功，请登录",
}
```
1.7 获取所有用户.   
.请求方式:get. 
.请求地址:/api/user/getAllUsers.   
.接口描述：  
.鉴权:需要token. 

请求参数.  
|参数名|类型|必传|说明|
|----|---|---|---|
|null|

请求示例
```json
{

}
```
响应示例
```json
{
"status": 'success',
"total",
"page",
"limit",
data: { data },
request: req.requestTime,
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
|username|String|是|用户名|

请求示例
```json
{
"ursename":"user01"
}
```

响应示例
```json
{
" status": "success",
"data": “user” ,
"requestTime": “eq.requestTime”,
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
“username”:"user01",
"password":"333444"
}
```
响应示例
```json
{
"status":"success",
"message":"创建用户成功",
data:{ newUser:{
“username”:"user01",
"password":"333444"
} },
requestTime: req.requestTime,
}
```
1.10 更新用户资料.  
.请求方式:put. 
.请求地址:/api/user/updateUserById.   
.接口描述：  
.鉴权:需要token. 

请求参数
|参数名|类型|必传|说明|
|---|---|---|--|
|usename|String|是|用户名|

请求示例
```json
{
“username”:"user01",
}
```
响应示例
```json
{
"status":"success"
"message":"更新成功",
data: { user },
requestTime: req.requestTime,
}
```
1.11 删除单个用户.   
.请求方式:delete.   
.请求地址:/api/user/deleteUserById.   
.接口描述：  
.鉴权:需要token. 

请求参数
|参数名|类型|必传|说明|
|---|---|---|---|
|usename|String|是|用户名|

请求示例
```json
{
“username”:"user01",
}
```
响应示例
```json
{
"status": 'success',
"data": null,
"message": '用户已删除',
"requestTime": "req.requestTime",
}
```
1.12 批量删除用户  
.请求方式:delete.  
.请求地址:/api/user/deleteManyUser. 
.接口描述：  
.鉴权:需要token. 

请求参数  
|参数名|类型|必传|说明|
|---|---|---|--|
|ids|array|是|删除用户的数组|

请求示例
```json
{
“ids”:[
{“username”:"user01",},
{“username”:"user02",},
{“username”:"user03",}
]
}
```
响应示例
```json
{
"status": 'success',
"data": null,
"message": '用户批量删除成功',
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
|targetStatus|Sreing|是|目标状态|

请求示例
```json
{
“targetStatus”:"active"
}
```
响应示例
```json
{
”status“: “success”,
”message“:“ 状态修改成功”
"data": { user },
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
|targetRole|String|是|目标角色|

请求示例
```json
{
“targetRole”:"admin",
}
```
响应示例
```json
{
”status“: “success”,
”message“:“ 角色修改成功”
"data": { user },
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
{

}
```
响应示例
```json
{

    "status": 'success',
      "total",
      "page",
      limit,
      "data": "{ data }",
      "request": "req.requestTime"
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
"productId":"123456"
}
```
响应示例
```json
{
    "status": 'success',
      "data": "{ data }",
      "request": "req.requestTime"
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
|description|String|否|描述|
|status|String|否|上下架状态|

请求示例 
```json
{
"productName":"rose"
"price":"100",
"stock":"100"
"description":"玫瑰花"
"supplierId":"supplier01",
"status":"on"
}
```
响应示例 

```json
{
“message”:"创建产品成功"
"data": { newProduct },
"requestTime": "req.requestTime"
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
|name|String|是|商品名称|
|price|Number|是|价格|
|stock|Number|是|库存|
|supplierId|Object|是|供应商id|
|description|String|否|描述|

请求示例
```json
{
"productName":"tulip"
"price":"100",
"stock":"100"
"description":"郁金香"
"supplierId":"supplier01",
"status":"on"
}
```
响应示例
```json
{
“message”:"更新产品成功"
"data": { newProduct },
"requestTime": "req.requestTime"
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
"productId":"1233444"
}
```
响应示例
```json
{
     "status": "success",
      "data": null,
      "message": "删除成功",
      "requestTime": "req.requestTime",
}
```
2.6 批量删除产品.  
.请求方式:delete.   
.请求地址:/api/product/deleteManyProduct.   
.接口描述：
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|ids|Array|是|批量删除产品ID的数据集合|

请求示例
```json
{
"ids":[
{"productId":"123455"},
{"productId":"123456"},
{"productId":"123457"},
{"productId":"123458"},
]
}
```
响应示例
```json
{
"status": "success",
"data": null,
"message": "批量删除成功",
"requestTime": "req.requestTime",
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
"productId":"123455"，
on
}
```
响应示例
```json
{

    "status": 'success',
    "data": "{ data }",
    "request": "req.requestTime"
}
```

### 3 供应商模块 （Supplier）

3.1 获取所有供应商.  
.请求方式:get.   
.请求地址:/api/supplier/getAllsupplier.   
.接口描述：
.鉴权:需要token

请求参数  
|参数名|类型|必传|说明|
|----|----|---|----|
|null|

请求示例
```json
{

}
```
响应示例
```json
{
    "status": 'success',
      "total",
      "page",
      limit,
      "data": "{ data }",
      "request": "req.requestTime"
}
```
3.2 获取单个产品详情.  
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
"supplierId":"123456"
}
```
响应示例
```json
{
    "status": 'success',
      "data": "{ data }",
      "request": "req.requestTime"
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
|status|String|否|启用/禁用状态|

请求示例
```json
{
"name":"supplier1"
"phone":"+375255079778",
"address":"vitebsk"
}
```
响应示例
```json
{
“message”:"创建供应商成功"
"data": { newProduct },
"requestTime": "req.requestTime"
}
```
3.4 更新供应商  
.请求方式:put.  
.请求地址:/api/supplier/updateSupplier.  
.接口描述：  
.鉴权:需要token

请求参数 
|参数名|类型|必传|说明|
|----|----|---|---|
|supplierId|String|是|供应商id|
|name|String|是|商品名称|
|phone|String|是|电话|
|address|String|是|地址|
|status|String|否|启用/禁用状态|

请求示例
```json
{
"supplierId":"111122333",
"name":"supplier1"
"phone":"+375255079778",
"address":"minsk"
}
```
响应示例
```json
{
“message”:"更新供应商成功"
"data": { newProduct },
"requestTime": "req.requestTime"
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
"supplierId":"1233444"
}
```
响应示例
```json
{
     "status": "success",
      "data": null,
      "message": "删除成功",
      "requestTime": "req.requestTime",
}
```
3.6 批量删除供应商.  
.请求方式:delete.   
.请求地址:/api/psupplier/deleteManySupplier.  
.接口描述：   
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|---|---|---|---|
|ids|Array|是|批量删除产品ID的数据集合|

请求示例
```json
{
"ids":[
{"productId":"123455"},
{"productId":"123456"},
{"productId":"123457"},
{"productId":"123458"},
]
}
```
响应示例
```json
{
"status": "success",
"data": null,
"message": "批量删除成功",
"requestTime": "req.requestTime",
}
```
3.7 改变供应商启用/禁用状态.   
.请求方式:post.   
.请求地址:/api/supplier/changeStatus.  
.接口描述：   
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|---|---|---|---|
|supplierId|String|是|产品id|
|active|String|是| 启用|
|inactive|String|是|禁用|

请求示例
```json
{
"supplierId":"123455"，
"active"
}
```
响应示例
```json
{
    "status": 'success',
    "data": "{ data }",
    "request": "req.requestTime"
}
```
### 4 订单模块（Oder 集合）

4.1 获取所有订单.  
.请求方式:get.  
.请求地址:/api/oredr/getAllorder.  
.接口描述：   
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|---|---|----|
|null|

请求示例
```json
{

}
```
响应示例
```json
{
    "status": 'success',
      "total",
      "page",
      limit,
      "data": "{ data }",
      "request": "req.requestTime"
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
"orderId":"123456"
}
```
响应示例
```json
{

    "status": 'success',
      "data": "{ data }",
      "request": "req.requestTime"
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
|createdBy|Object|是|创建订单的id|
|items|Array|是|商品数组|
|createType|String|否|创建类型[用户/售货员]
|totalPrice|Number|是|金额合计|
|status|String|是|订单状态|
|address|String|是|收件人地址|
|payType|支付类型|否|支付类型|
|remark|String|否|订单备注|

请求示例
```json
{
"userId":"iser01",
"createBy":"user01",
"createType":"user",
"items":[
{"productId":"123344"},
{"productId":"223344"}
],
"status":"pending"
"address":{
"name": "name1",
"phone": "255079778"
"address": "minsk",
}
}
```
响应示例
```json
{
"orderNo":"112233445566",
"userid":"userId",
"createdBy": "user01"
"createType": 'user',
items: orderItems,
totalPrice,
address,
payType: 'card',
remark: '',
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
"orderId":"1122333"
}
```
响应示例
```json
{
“message”:"订单产品成功"
"data": { newProduct },
"requestTime": "req.requestTime"
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
|productId|String|是|商品id|

请求示例
```json
{
"productId":"1233444"
}
```
响应示例
```json
{

     "status": "success",
      "data": null,
      "message": "删除成功",
      "requestTime": "req.requestTime",
}
```
4.6 批量删除订单.  
.请求方式:delete.  
.请求地址:/api/order/ids.  
.接口描述：   
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|---|
|ids|Array|是|批量删除产品ID的数据集合|

请求示例
```json
{
"ids":[
{"orderId":"123455"},
{"orderId":"123456"},
{"orderId":"123457"},
{"orderId":"123458"},
]
}
```
响应示例
```json
{
"status": "success",
"data": null,
"message": "批量删除成功",
"requestTime": "req.requestTime",

}
```
4.7 改变订单状态.  
.请求方式:post.  
.请求地址:/api/order/id/{pay/ship,complete,cancel}.  
.接口描述：   
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|orderId|String|是|产品id|
|pending|String|是|待处理|
|paid|String|是|支付|
|shipped|String|是|配送|
|completed|String|是|完成|
|camceled|String|是|取消|

请求示例

```json
{
"productId":"123455"，
"pay"
}
```
响应示例

```json
{

    "status": 'success',
    "data": "{ data }",
    "request": "req.requestTime"
}
```

### 5 配送模块（Delivery 集合）

5.1 获取所有产品.  
.请求方式:get.  
.请求地址:/api/product/getAllProducts.  
.接口描述：   
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|---|---|
|null|

请求示例
```json
{

}
```
响应示例

```json
{

    "status": 'success',
      "total",
      "page",
      limit,
      "data": "{ data }",
      "request": "req.requestTime"
}
```
5.2 获取单个产品详情.  
.请求方式:get.   
.请求地址:/api/product/getProduct.   
.接口描述：   
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|-----|----|----|----|
|productId|String|是|产品id|

请求示例
```json
{
"productId":"123456"
}
```

响应示例

```json
{

    "status": 'success',
      "data": "{ data }",
      "request": "req.requestTime"
}
```
5.3 创建一个产品.  
.请求方式:post.  
.请求地址:/api/product/createProduct.  
.接口描述：   
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|-----|----|----|----|
|name|String|是|商品名称|
|price|Number|是|价格|
|stock|Number|是|库存|
|supplierId|Object|是|供应商id|
|description|String|否|描述|
|status|String|否|上下架状态|

请求示例

```json
{
"productName":"rose"
"price":"100",
"stock":"100"
"description":"玫瑰花"
"supplierId":"supplier01",
"status":"on"
}
```
响应示例

```json
{
“message”:"创建产品成功"
"data": { newProduct },
"requestTime": "req.requestTime"
}
```
5.4 更新产品.  
.请求方式:put.   
.请求地址:/api/product/updateProduct.  
.接口描述：    
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|----|----|
|name|String|是|商品名称|
|price|Number|是|价格|
|stock|Number|是|库存|
|supplierId|Object|是|供应商id|
|description|String|否|描述|

请求示例
```json
{
"productName":"tulip"
"price":"100",
"stock":"100"
"description":"郁金香"
"supplierId":"supplier01",
"status":"on"
}
```
响应示例
```json
{

“message”:"更新产品成功"
"data": { newProduct },
"requestTime": "req.requestTime"
}
```
5.5 删除单个产品.  
.请求方式:delete.   
.请求地址:/api/product/deleteProduct.  
.接口描述：    
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|---|---|
|productId|String|是|商品id|

请求示例
```json
{
"productId":"1233444"
}
```
响应示例
```json
{

     "status": "success",
      "data": null,
      "message": "删除成功",
      "requestTime": "req.requestTime",

}
```
5.6 批量删除产品.  
.请求方式:delete.  
.请求地址:/api/product/deleteManyProduct.   
.接口描述：  
.鉴权:需要token. 

请求参数  
|参数名|类型|必传|说明|
|----|---|---|---|
|ids|Array|是|批量删除产品ID的数据集合|

请求示例
```json
{
"ids":[
{"productId":"123455"},
{"productId":"123456"},
{"productId":"123457"},
{"productId":"123458"},
]
}
```
响应示例
```json
{
"status": "success",
"data": null,
"message": "批量删除成功",
"requestTime": "req.requestTime",
}
```
5.7 改变产品上下架状态.   
.请求方式:post.  
.请求地址:/api/product/changeStatus.  
.接口描述：   
.鉴权:需要token

请求参数
|参数名|类型|必传|说明|
|----|----|---|---|
|productId|String|是|产品id|
|on|String|是|上架|
|off|String|是|下架|

请求示例
```json
{
"productId":"123455"，
on
}
```
响应示例
```json
{

    "status": 'success',
    "data": "{ data }",
    "request": "req.requestTime"

}
```