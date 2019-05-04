var Tools={
	/*
	1.[]表示该参数可有可无
	2.@param 表示
	3. @return
	*/
	/* 查找DOM对象
	  @param  seletor <string> css基本选择器 
	  @param  [parent] <DOMobj>  父级元素对象
	  @return  <string>  样式的值
	 */
	$:function(selector,parent){
		parent=parent||document;
		//slice() 从已有的数组中返回选定的元素。
		//getElementsByTagName 获取标签名合集
		switch(selector.charAt(0)){
			case"#":
					return document.getElementById(selector.slice(1));
			case ".":
					return parent.getElementsByClassName(selector.slice(1));
			default:
					return parent.getElementsByTagName(selector);
					
		}
	},
	/* 获取元素外部样式
	  @param  obj <DOM Object> 要获取样式的元素对象
	  @param  attr <string>  要获取的属性名
	  @return  <string>  obj的attr属性值
	 */
	getStyle:function(obj,attr){
		//.currentStyle 是一个对象，也是计算后的样式的属性值对的集合
		//DOM 中 getComputedStyle 方法可用来获取元素中所有可用的css属性列表，以数组形式返回，并且是只读的。IE678 中则用 currentStyle 代替 。
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
		},
	/* 获取body宽高
	  @return  <>  
	 */
	getBody:function(){
		
	},
	/* 元素在body中绝对居中
	   @param  obj  <DOM Object> 居中的那个元素对象  
	 */
	Center:function(obj){
		var _this=this;
		//obj相对于body定位
		document.body.appendChild(obj);
		obj.style.position="absolute";
		function center(){
			var _left=(_this.getBody().width-obj.offsetWidth)/2,
				_top=(_this.getBody().height-obj.offsetHeight)/2;
			obj.style.left=_left+"px";
			obj.style.top=_top+"px";
		}
		center();
		//当浏览器被重置大小时执行center函数
		window.onresize=center;
	},
	/* 获取和设置元素外部样式
	  @param  obj <DOM Object> 要设置样式的元素对象
	  @param  str <obj>  设置css{left:"30px",top:"50px"}
	  @param  str  <string> 获取属性值
	  @return  <string>  str对应的属性值
	 */
	css:function(obj,str){
		if(typeof str==="string"){
			return obj.stylr[str];
		}else{
			 for(var key in str){
				 obj.style[key]=str[key];
			 }
		}
	},
	
	/*cookie的存，改，删。[]表示该参数可有可无
		1.只传key 获取
		2.key value 存、修改
		3.option 修改path 和expires，expires值为-1，表示代码删除
		*	@param	key 		<string> cookie属性名
		*	@param	[value ]	<string> cookie值
		*	@param	[option]	<object> {expries,path:"/"}
		* 	@return				<string> 取cookie的时候返回当前这条cookie值
	*/
   cookie:function(key,value,option){
	   //判断value是否有效
	   if(value===undefined){
		   //获取cookie
		   var cookie =document.cookie;
		   var arr=cookie.split(";");//切割
		   
		   var objCookie=arr.reduce(function(obj,item){
			   var subArr=item.split("=");
			   //取到的值解码，
			   obj[subArr[0]]=decodeURIComponent(subArr[1]);
			   //把obj返回，作为下一次reduce的obj继续归并
			   return obj;
		   },{});
		   return objCookie[key];
		   
		}else{
			//操作cookie,编码
			var str=key+"="+encodeURIComponent(value);
			//是否存在option
			if(option){
				if(option.path) 	str+=";path="+option.path;
				if(option.expires){
					//时间设为前一天
					var date=new Date();
					date.setDate(date.getDate() + option.expires);
					str +=";expires=" + date;
				}
			}
			document.cookie=str;
		}
			
		
	   
		   
   },
   /*ajaxGet：ajax请求   不传的参数，用null站位
		 *	@param	url 		<string> 请求的地址
		 *	@param	auery		<object> 请求携带的参数
		 *	@param	callback	<function> 数据get成功以后的回调函数
		 * 	@return	isJson		<boolean> 是否是json格式的数据,默认设置为true
		//html中的调用举例
		("01.php",{id:1},function(data){

		},function)
	*/
	
   ajaxGet:function(url,query,callback,isJson){
	   //isJson没有传递，则默认为true
	   	isJson=isJson===undefined ? true : isJson;
	    // 1.new 一个ajax核心对象
		var ajax=new XMLHttpRequest();
		/*如果有参数，就在url后面拼接query*/ 
		if(query){
			url +="?";
			for(var key in query){
				url +=key +"="+query[key]+"&";
			}
			//删除最后一个
			url = url.slice(0,-1);
		}
        //2.open(请求方式：get/post,请求地址：url;是否异步：true--是  false --否)
        ajax.open("GET",url,true);
        //3.发送请求
        ajax.send(null);
        //4.监听状态的变化
        ajax.onreadystatechange=function(){
            if(ajax.readyState === 4 && ajax.status === 200){
			   //如果交易成功调用回调函数
				   /*
					1、利用逻辑短路，有callback,才调用callback()函数
					2、根据isJon判断是否使用JSON.parse转换
					3、如果isJson为true,执行JSON.parse(ajax.responseText) ；
					   如果isJson为false，执行ajax.responseText
				   */
			   var res=isJson? JSON.parse(ajax.responseText) : ajax.responseText;
			   callback && callback(res);
            }
        }
   },
    /*ajax方法：get post都能执行
			 *@param	method		<string> "get"或者"post"
			 *@param	url			<string> 请求的地址
			 *@param	query		<object> 请求携带的参数
			 *@param	callback	<function> 数据获取成功以后的回调函数
			 *@return	isJson		<boolean> 是否是json格式的数据
	*/
	ajax:function(method,url,query,callback,isJson){
		if(method.toUpperCase() === "GET"){
			this.ajaxGet(url,query,callback,isJson);
		}else if(method.toUpperCase() ==="POST"){//用else if ，不用else是因为method可能会传错，传的不是get或post
		//1.new 一个ajax核心对象
			var ajax=new XMLHttpRequest();
			ajax.open("post",url,true);
			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			//通过query拼接send
			var str="";
			if (query){
				url +="?";
				for(var key in query){
					str+=key+"="+query[key]+"&";
				}
				/*删除最后一个*/
				str=str.slice(0,-1);
			}
			
			ajax.send(str);
			ajax.onreadystatechange = function(){
				if(ajax.readyState == 4 && ajax.status ==200){
					callback && callback(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
				}else {
					alert("请求失败！");
				}
			}
		}
		
	},
	 /*jsonp请求：请求jsonp数据
			*@param	url				<string> 请求的地址
			*@param	cb(callback)	<function> 数据获取成功以后的回调函数名
			*@param	[query]			<object> 请求携带的其他参数
	*/
	ajaxJsonp : function(url,cb,query){
		//创建script标签
		var script=document.createElement("script");
		//拼接路径 http://localhost/week5/day24%20Json/04.php ?cb=fn
		url+="?cb="+cb;
		if(query){
			for(var key in query){
				url+="&"+key +"="+query[key];	
			}
		}
		script.src=url;
		document.body.appendChild(script);
		/*请求产生过，就删除*/
		document.body.removeChild(script);
	},
	/*ajaxPostPromise:jsonp请求
			 *@param	url			<string> 请求的地址
			 *@param	query		<object> 请求携带的参数
			 *@return	isJson		<boolean> 是否是json格式的数据
	
	*/
	ajaxGetPromise:function(url,query,isJson){
		//isJson没有传递，则默认为true
		isJson=isJson===undefined ? true : isJson;
		if (query){
			url +="?";
			for(var key in query){
				url+=key+"="+query[key]+"&";
			}
			/*删除最后一个*/
			url=url.slice(0,-1);
		}
		
		return new Promise((resolve,reject)=>{
			let ajax = new XMLHttpRequest();
			ajax.open("GET",url,true);//true代表异步
			ajax.send(null);
			ajax.onreadystatechange = function(){
				if(ajax.readyState===4){
					if(ajax.status===200){
						/*数据返回成功*/
						resolve(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
					}else {
						reject();
					}
				}
			}
		})	
	}
}
// define(()=>{
// 	return Tools;
// })