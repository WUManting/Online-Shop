class Login{
    constructor(){
        this.inputUsername=document.querySelector("#inputUsername");
        this.inputPassword=document.querySelector("#inputPassword");
        this.checkbox = document.querySelector("#checkbox");
        this.btn=document.querySelector("#btn");
        this.bindEvent();
    }
    bindEvent(){
        this.btn.onclick=()=>{
            let username =this.inputUsername.value,
                password=this.inputPassword.value;
            //表单验证
            // var regName = /[~#^$@%&!*()<>:;'"{}【】  ]/;
            // var regPassword=/^[0-9a-zA-Z]*$/; 
            // if(username==""||username.length>2 || regName.text (username)){
            //    alert(" 姓名非空，长度6位以上，不包含特殊字符！");
            //     // $.append("<span class='msg onError'>" + errorMsg + "</span>");
            // }else if(password!=""&&!regPassword.test(password)){ 
            //     alert("只能输入是字母或者数字,请重新输入");
            // }else{
                Tools.ajax("POST", "../api/v1/login.php", {username, password},data => {
                    if(data.res_code===1){
                        //将用户名存入cookie
                        if(this.checkbox.checked){
                             Tools.cookie("username",username,{expires:7,path:"/"});
                        }
                    }else{
                        Tools.cookie("username",username,{path:"/"});
                    }
                    alert(data.res_message);
                    window.location.href="../index.html";
                  })
                return false;
            // }
            
            
            
       
        
           
        }
    }
}
new Login();