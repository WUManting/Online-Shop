<?php
    include("./config.php");
    $pageIndex= $_GET["pageIndex"];//确定条数
    $count=$_GET["count"];//确定页数

    $sqlAll ="select * from shop";
    $resAll=mysql_query($sqlAll);//
    $countAll=mysql_num_rows($resAll);//获取条数
    $pageCount=ceil($countAll/$count);//向上取整，确定页数


    $start = ($pageIndex-1)*$count;
    $sql ="select * from shop limit $start,$count";


    $res=mysql_query($sql);
    $shop=array();
    //mysqli_fetch_assoc() 函数从结果集中取得一行作为关联数组。该函数返回的字段名是区分大小写的。
    while($row =mysql_fetch_assoc($res)){
        // 将$row，push到shop中
        array_push($shop,$row);
    }
    //$shop长度为0，返回失败
    $json =array(
        "res_code"=>1,
        "res_message"=>"查询成功",
        "res_body" =>array(
            "data"      =>$shop,
            "pageCount"=>$pageCount
        )
   );
    echo json_encode($json);
    mysql_close();

?>