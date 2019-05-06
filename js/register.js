class Register{
    constructor(){
        this.inputUsername=document.querySelector("#inputUsername");
        this.inputPassword=document.querySelector("#inputPassword");
        this.btn=document.querySelector("#btn");
        this.bindEvent();
    }
    bindEvent(){
        this.btn.onclick=()=>{
            let username =this.inputUsername.value,
                password=this.inputPassword.value;
                
            //验证表单
            //发送请求
            Tools.ajax("POST", "../api/v1/register.php", {username, password},data => {
                console.log(data);
              })
            return false;
        }
    }
}
new Register();