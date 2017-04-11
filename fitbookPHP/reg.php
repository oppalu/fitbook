<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
session_start();
header('Access-Control-Allow-Origin: *');
require ("DBHelper.php");


$name = $_GET["username"];
$pass = $_GET["password"];
$email=$_GET["email"];



$db=new MyDB();
$tempsql="select count(*) from User where username=";


$tempsql=$tempsql."\"".$name."\";";


$sql =<<<EOF
     $tempsql
EOF;


$ret = $db->query($sql);
$row = $ret->fetchArray(SQLITE3_ASSOC);
$usernum=$row['count(*)'];


$tempsql="select count(*) from User where email=";


$tempsql=$tempsql."\"".$email."\";";


$sql =<<<EOF
     $tempsql
EOF;


$ret = $db->query($sql);
$row = $ret->fetchArray(SQLITE3_ASSOC);
$emailnum=$row['count(*)'];


$res="";

if($emailnum==0&&$usernum==0){
  $uid=rand(1,100000);


  $inssql="insert into User VALUES(".$uid.",\"".$name."\",\"".$email."\","."20,"."\"男\","."\"\","."0,"."\"".$pass."\");";

  // echo $inssql;


  $ret = $db->exec($inssql);
  if(!$ret){
      echo $db->lastErrorMsg();
   } else {
      $res="00";
      $_SESSION["name"]=$_GET["username"];
      $arr = array('res' => $res, 'ssid'=>session_id());
      echo json_encode($arr);
   }



}else{
  //first 1 is dup of user second is email
  if($usernum!=0){
    $res="1";
  }else{
    $res="0";
  }

  if($emailnum!=0){
    $res=$res."1";
  }else{
    $res=$res."0";
  }
  $arr = array('res' => $res, 'ssid'=>session_id());
  echo json_encode($arr);
}


 ?>
