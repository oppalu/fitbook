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



$username=$_SESSION["name"];
$updatename=$_GET["name"];

$updategender=$_GET["gender"];

$updateage=$_GET["age"];

//先检查有没有重名，再插入
$db=new MyDB();

$checksql="select count(*) from User where username=";
$checksql=$checksql."\"".$updatename."\" ;";
$sql =<<<EOF
     $checksql
EOF;


$ret = $db->query($sql);
$row = $ret->fetchArray(SQLITE3_ASSOC);
$usernum=$row['count(*)'];

if($updatename!=$username){
  if($usernum!=0){
    $arr = array('isdup' => 1);
    echo json_encode($arr);
    return;
  }

}










$tempsql="UPDATE User set username="."\"".$updatename."\",gender="."\"".$updategender."\",age=$updateage"." where username=";
$tempsql=$tempsql."\"".$username."\";";



$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);


//update Friend user1
$tempsql="UPDATE Friend set user1="."\"".$updatename."\""." where user1=";
$tempsql=$tempsql."\"".$username."\";";



$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);


//update Friend user2
$tempsql="UPDATE Friend set user2="."\"".$updatename."\""." where user2=";
$tempsql=$tempsql."\"".$username."\";";



$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);







if(!$ret){
  $arr = array('isdup' => 1);
  echo json_encode($arr);
   } else {
$_SESSION["name"]=$updatename;

     $arr = array('isdup' => 0);
     echo json_encode($arr);
   }









 ?>
