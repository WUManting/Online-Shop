#管理系统

api:放php代码

### 系统功能

* 登录
* 注册
* 商品展示
* 商品修改
* 商品删除
* 商品录入



### 使用的技术

* HTML 5
* CSS3
* javascript
* ajax  -- 请求数据
* bootstrap
* php
* mysql

### 接口文档

##### 查询所有数据

* url:api/v1/select.php

* method:get

* query:null

* data:

  ```
  data:{
  	res_code:1,,//状态、响应码。1代表成功，0代表失败
  	res_body:{
  			data:{
  				{id,name,price,num},
  				{id,name,price,num}
  			}
  	     }
        }
  ```

  



