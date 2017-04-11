<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
 header('Access-Control-Allow-Origin: *');
 $ssid=$_GET["ssid"];
 Session_id($ssid);
 session_start();


require ("DBHelper.php");
$atyid=$_GET["atyid"];
$reply=$_GET["reply"];

$userid=$_SESSION["id"];

$db=new MyDB();

$tempsql="";
if($reply==0){//quit
  $tempsql="delete from AtyUser where atyid=".$atyid." and userid=".$userid." ;";
}else{//join
  $id=rand(1,100000);

  $tempsql="insert into AtyUser VALUES (".$id.",".$atyid.",".$userid.") ;";
}

$sql =<<<EOF
     $tempsql
EOF;


$ret = $db->exec($sql);

if(!$ret){
  echo 0;
}else{
  echo 1;
}


 ?>
