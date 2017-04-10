<?php
/**
 * Created by PhpStorm.
 * User: phoebegl
 * Date: 2017/4/10
 * Time: 11:22
 */
header('Access-Control-Allow-Origin: *');
$ssid=$_GET["postid"];

require ("DBHelper.php");
$db=new MyDB();

$userid=1;
if($_SESSION['id']!=null) {
    $username = $_SESSION['id'];
}
$content=addmark($_GET["content"]);
$date=addmark(date("Y-m-d"));
$commentid=rand(1,100000);

$sql="INSERT INTO Comment VALUES ($commentid,$ssid,$userid,$content,$date);";

$ret = $db->exec($sql);

if(!$ret){
    echo "0";
} else {
    echo "1";
}

function addmark($str){
    $nstr="\"".$str."\"";
    return $nstr;
}
