class PagINation{
    constructor(){
        
        this.ul =document.querySelector("#page-container");
        this.next =document.querySelector("#next-page");
        this.bindEvent();

    }
    /*在select,js中调用 */
    render(selectList){
        //console.log(pageCount);
        //得到查询对象
        this.selectList=selectList;
        //删除上一次生成的分页
        Array.from(this.ul.querySelectorAll(".page-li")).forEach(li=>{
            li.remove();
        })
        //生成页面的li
        for(let i=1;i<=this.selectList.pageCount;i++){
            let li =document.createElement("li");
            li.className= i === this.selectList.pageIndex ? "active page-li" : "page-li";
            li.innerHTML = `<a href="javascript:;" class="page">${i}</a>`;
            // 将li添加带next之前
            this.ul.insertBefore(li, this.next);
        }
    }
    bindEvent(){
        this.ul.onclick = e =>{
            let target=e.target;
            //类数组，classList 放入数组中
            let targetClass =[...target.classList];
            if(targetClass.includes("page")){
                // 点击了页码数的分页
                this.selectList.pageIndex = Number(target.innerHTML);
                this.selectList.init();
              }else if(targetClass.includes("prev-page")){//点击上一页
                if(--this.selectList.pageIndex < 1){
                  this.selectList.pageIndex = 1;
                  return;
                }
                //
                this.selectList.init();
            }else if(targetClass.includes("next-page")){//点击下一页
                if(++this.selectList.pageIndex > this.selectList.pageCount){
                  this.selectList.pageIndex = this.selectList.pageCount;
                  return;
                }
                this.selectList.init();
            }

        }
    }



}
var pagination=new PagINation();