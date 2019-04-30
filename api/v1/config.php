<!-- 配置数据库的相关 -->
<?php
    $config =array(
        "host"      =>"localhoxt:3306",
        "username"  =>"root",
        "password"  =>"",
        "dbname"    =>"a"
    );
    // 跟数据库建立连接
    mysql_connect($config ["host"],$config["username"],$config["pasword"]);
    //选择数据库
    mysql_connect_db($config["dbname"]);
    //设置编码
    mysql_query("set_charset 'utf8'");
    mysql_query("set_character set 'utf8' ");
?>