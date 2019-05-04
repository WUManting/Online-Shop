class AddShop{
    constructor(){
        this.inputName=document.querySelector("#inputName");
        this.inputPrice=document.querySelector("#inputPrice");
        this.inputNum=document.querySelector("#inputNum");
        this.addBtn=document.querySelector("#btn-shop-add");
        this.init();
    }
    init(){
        this.addBtn.onclick=()=>{
            let name=this.inputName.value,
                price=this.inputPrice.value,
                num=this.inputNum.value;
            //表单验证是否为空
        if(name===""||price===""||num===""){
            alert("输入不能为空");
            return;
        }
            Tools.ajaxGetPromise("api/v1/add.php",{name,price,num}).then(txt =>{
                if(txt.res_code===1){
                    alert(txt.res_message);
                    //清空输入的value值
                    this.inputName.value=inputPrice.value=inputNum.value="";
                    //让模态框隐藏
                    $('#addModal').modal('hide');
                    //重新渲染页面(使用select.js中的init方法)
                    getShop.init();
                }
            })
        }
    }
}
new AddShop();