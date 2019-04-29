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
        tr.remove();
    }
}
/*确定*/
okBtnClick(tr){
    //把input的内容给对应的span
    Array.from(tr.querySelectorAll("span")).forEach(span=>{
        span.innerHTML=span.nextElementSibling.value;
    })
    //发送后台
    //tr移除class:edit属性
    tr.classList.remove("edit");
}
/*取消*/
cancelBtnClick(tr){
    tr.classList.remove("edit");
}
}
new EditTable("#tbody");