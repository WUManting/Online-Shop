class SelectLixt{
    constructor(tybody){
        this.tybody=document.querySelector(tybody);
        init();
    }
    init(){
        Tools.ajaxGetPromise("api/v1/select.php").then(data=>{
            console.log(data);
        });
    }
}