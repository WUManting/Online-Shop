class SelectList{
    constructor(tbody){
        this.tbody=document.querySelector(tbody);
        /* 分页 */
        this.pageIndex=1;//默认第一页
        Object.defineProperty(this,"count",{
            writable:false,
            value:3
        });//一页的数量(固定)
        this.pageCount=1;//默认页面开始时共一页(后面改变)

        this.init();
    }
    //渲染页面
    init(){
        let {pageIndex,count} =this;//解构赋值
        Tools.ajaxGetPromise("api/v1/select.php",{pageIndex,count}).then(txt =>{
             if(txt.res_code === 1){
                 this.render(txt.res_body.data);
                 this.pageCount=txt.res_body.pageCount;
                 //调用pageINation中的render()函数，根据总页数渲染分页，并确定当前是第几页
                 /* this指当前select.js创建的对象，
                    将this传递给  pagINation.js  创建的对象 pageination,
                    在 pagINation.js的 render 中使用selectList参数接收 */
                 pagination.render(this);
             }else{
                 //查询失败
                 alert(txt.res_message);
             }
        })
    }
    render(list){
        let html="";
        list.forEach((shop,index) =>{
            html+=`<tr data-id="${shop.id}">
            <td>${(this.pageIndex-1)*this.count+index+1}</td>
            <td>${shop.name}</td>
            <td>
              <span>${shop.price}</span>
              <input type="text" class="inputPrice">
            </td>
            <td>
                <span>${shop.num}</span>
                <input type="text" class="inputNum">
            </td>
            <td>
              <button type="button" class="btn btn-xs btn-edit    btn-primary">编辑</button>
              <button type="button" class="btn btn-xs btn-del     btn-danger">删除</button>
              <button type="button" class="btn btn-xs btn-ok      btn-success">确定</button>           
              <button type="button" class="btn btn-xs btn-cancel  btn-info">取消</button>
    
            </td>
          </tr>`;
        });
        this.tbody.innerHTML=html;
    }
}
let getShop=new SelectList("#tbody");
