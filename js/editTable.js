//面向对象 表格编辑
class EditTable{
    constructor(tbody){
        this.tbody=document.querySelector(tbody);
        this.bindEvents();
    }
    bindEvents(){
        //事件委托给tbody;箭头函数this指向外层this
        this.tbody.onclick=e=>{
            let target=e.target;
            //点击事件源的父级的父级就是tr
            let tr=target.parentNode.parentNode;
            console.log(tr);
            //事件源的classList,并将class 列表放入数组
            let classList=Array.from(e.target.classList);
            //通过数组中class的名字，判断当前按钮是什么按钮
            if(classList.includes("btn-edit")){
                this.editBtnClick(tr);
            }else if(classList.includes("btn-cancel")){
                this.cancelBtnClick(tr);
            }else if(classList.includes("btn-del")){
                this.delBtnClick(tr);
            }else if(classList.includes("btn-ok")){
                this.okBtnClick(tr);
            }
            
            
        }
    }
/*编辑*/
editBtnClick(tr){
    //把span的内容给对应的input
    Array.from(tr.querySelectorAll("span")).forEach(span=>{
        span.nextElementSibling.value = span.innerHTML;
    })
    //tr添加class:edit属性
    tr.classList.add("edit");
}
/*删除*/
delBtnClick(tr){
    //发送后台，数据库中删除
    if(confirm("确定删除？")){
       //请求后端做删除功能
       let id=tr.getAttribute("data-id");
       Tools.ajaxGetPromise("api/v1/delete.php",{id}).then(txt=>{
           if(txt.res_code===1){
               alert(txt.res_message);
               //后台数据操作完成，前端重新请求查询接口
               getShop.init();
           }else{
               alert(txt.res_message);
           }
       })

    }
}
/*确定*/
okBtnClick(tr){
    let inputPrice=tr.querySelector(".inputPrice"),
        inputNum=tr.querySelector(".inputNum"),
        id=tr.getAttribute("data-id"),
        price=inputPrice.value,
        num=inputNum.value;
    /* 
        //把input的内容给对应的span
        Array.from(tr.querySelectorAll("span")).forEach(span=>{
            span.innerHTML=span.nextElementSibling.value;
        })
    
    */
    
    //给后台发送更新请求
   Tools.ajaxGetPromise("api/v1/ok.php",{id,price,num}).then(txt=>{
       if(txt.res_code===1){
           alert(txt.res_message);
           inputPrice.previousElementSibling.innerHTML=inputPrice.value;
           inputNum.previousElementSibling.innerHTML=inputNum.value;
           //tr移除class:edit属性
           tr.classList.remove("edit");
       }else{
           alert(txt.res_message);
            //tr移除class:edit属性
            tr.classList.remove("edit");
       }
   })
   
}
/*取消*/
cancelBtnClick(tr){
    tr.classList.remove("edit");
}
}
new EditTable("#tbody");