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
$db=new MyDB();

$username="";
if($_SESSION['name']==""){
  $username="tracy";
}else{
  $username=$_SESSION['name'];
}

$postid=$_GET["postid"];
$action=$_GET["action"];
$userid=0;


$tempsql="select userid from User where username=";
$tempsql=$tempsql."\"".$username."\";";
$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->query($sql);
$row = $ret->fetchArray(SQLITE3_ASSOC);
$userid=$row['userid'];





$id=rand(1,100000);

if($action==1){
$tempsql="INSERT INTO LikeRec VALUES ($id, $postid, $userid);";
}else {
  $tempsql="DELETE FROM LikeRec WHERE postid=$postid and likeuserid=$userid";
}


$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);

if(!$ret){
      echo "0";
   } else {
      echo "1";
   }









 ?>
