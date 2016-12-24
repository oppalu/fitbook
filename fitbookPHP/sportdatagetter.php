<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */

 header('Access-Control-Allow-Origin: *');
 //取出该用户的所有po文
 $ssid=$_GET["ssid"];
Session_id($ssid);
 session_start();

require ("DBHelper.php");
require ("post.php");

$username="";
if($_SESSION['name']==""){
  $username="tracy";
}else{
  $username=$_SESSION['name'];
}

 $type=$_GET["type"];

 $userid=$_SESSION['id'];
$tempsql="";

$strdate="\"".date("Y-m-d")."\"";

 if($type==2){//walk
   $tempsql="select steps from Userwalk where date=".$strdate." and userid=".$userid." ;";

 }elseif ($type==3) {//run
  $tempsql="select distance from Userrun where date=".$strdate." and userid=".$userid." ;";
 }elseif ($type==4) {//ride
   $tempsql="select distance from Userride where date=".$strdate." and userid=".$userid." ;";
 }



$db=new MyDB();

$sql =<<<EOF
     $tempsql
EOF;


$ret = $db->query($sql);
$row = $ret->fetchArray(SQLITE3_ASSOC);


if($type==2){//walk
  $steps=$row['steps'];
  if($steps==""){
    $steps="0";
  }

  $strsteps=$steps." 步";
  echo ($strsteps);
}else{
  $distance=$row['distance'];
  if($distance==""){
    $distance="0";
  }

  $strdistance=$distance." km";
  echo ($strdistance);
}


 ?>
