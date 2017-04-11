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


$db=new MyDB();
$tempsql="select password,userid from User where username=";


$tempsql=$tempsql."\"".$name."\";";


$sql =<<<EOF
     $tempsql
EOF;


$ret = $db->query($sql);
$row = $ret->fetchArray(SQLITE3_ASSOC);
$realpass=$row['password'];
$uid=$row['userid'];

if($realpass==$pass){
$_SESSION['name']=$name;
$_SESSION['id']=$uid;

$arr = array('res' => 1, 'ssid'=>session_id());
echo json_encode($arr);
  // echo 1;
}else{
  $arr = array('res' => 0, 'ssid'=>session_id());
  echo json_encode($arr);
  // echo 0;
}


?>
