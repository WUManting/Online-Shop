let unloginUl=document.querySelector("#unlogin-ul"),
    loginUl=document.querySelector("#login-ul"),
    usernameSpan=document.querySelector("#username-span"),
    username=Tools.cookie("username");
if(username){
    unloginUl.classList.add("hidden");
    usernameSpan.innerHTML = username;
    loginUl.classList.remove("hidden");
}


