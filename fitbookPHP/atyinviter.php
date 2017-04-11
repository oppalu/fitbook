<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */

 //获得信息，目前的用户是否加入，是否为管理员
 header('Access-Control-Allow-Origin: *');

 $ssid=$_GET["ssid"];
Session_id($ssid);
session_start();
 require ("DBHelper.php");
$ownername=$_SESSION["name"];
$ownerid=$_SESSION["id"];

$atyid=$_GET["atyid"];
$list=$_GET["list"];

$title=$_GET["title"];

$listarr=explode(",",$list);



$checksql="select userid from User where ";


$wherepart="username=\"";
$len=count($listarr);
for($x=0; $x<$len; $x++){
  $checksql=$checksql.$wherepart.$listarr[$x]."\" ";

  if($x==$len-1){

  }else{
    $checksql=$checksql."or ";
  }

}

  $checksql=$checksql." ;";

$db=new MyDB();

$sql =<<<EOF
     $checksql
EOF;

$ret = $db->query($sql);

$friendIDarr=array();



while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $friendIDarr[]=$row['userid'];
}

$checksql="insert into Message values ";



$len=count($listarr);
for($x=0; $x<$len; $x++){

  $uid=rand(1,100000);



  $str="(".$uid.",".$ownerid.",".$friendIDarr[$x].",".$atyid.","."-1) ";
  $checksql=$checksql.$str;

  if($x==$len-1){

  }else{
    $checksql=$checksql.", ";
  }

}
$checksql=$checksql." ;";

$db=new MyDB();

$sql =<<<EOF
     $checksql
EOF;

$ret = $db->exec($sql);

if(!$ret){
  echo 0;
}else{
  echo 1;
}



 ?>
