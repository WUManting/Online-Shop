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

##### 	当前页数据查询的接口

* url  :  api/v1/select.php

* method  :  get

* query  : {pageIndex,count}//条数，页数

* data:

  ```
  data:{
  	res_code:1,//状态、响应码。1代表成功，0代表失败
  	res_message
  	res_body:{
  			data:{
  				{id,name,price,num},
  				{id,name,price,num}
  			}
  	     }
        }
  ```

  ##### 添加商品的接口

* url  :  api/v1/select.php
* method  :  get
* query  :  {name,price,num}
* data:

```
data:{
	res_code:1,//状态、响应码。1代表成功，0代表失败
	res_message:"添加成功"  or  "添加失败，请重试"，
	res_body:{id,name,price,num}
      }
```




#####  		商品删除接口的接口

* url  :  api/v1/delete.php
* method  ：  get
* query  :  {id}
* data:

```
data:{
	res_code:1,//状态、响应码。1代表成功，0代表失败
	res_message:"删除成功"  or  "删除失败，请重试"		

  }
```




	##### 	商品确定按钮的接口

* url   :  api/v1/ok.php

* method  :  get

* query  :  {id,price,num}

* data:

    ```
        data:{
      	res_code:1,//状态、响应码。1代表成功，0代表失败
      	res_message:更新成功"  or  "更新失败，请重试"
      	}
    ```

    ##### 注册接口

* url   :  api/v1/register.php

* method  ：  get

* query  :  {username,password}

* data:

    ```
     data:{
      	res_code:1,//状态、响应码。1代表成功，0代表失败
      	res_message:"注册成功"  or  "注册失败，请重试"
      	}
    ```

    

    ##### 登录接口

* url   :  api/v1/login.php

* method  ：  get

* query  :  {username,password}

* data:

    ```
     data:{
      	res_code:1,//状态、响应码。1代表成功，0代表失败
      	res_message:"登录成功"  or  "登录失败，请重试"
      	}
    ```

    