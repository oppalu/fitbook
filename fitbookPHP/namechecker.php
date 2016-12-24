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

$username="";
if($_SESSION['name']==""){
  $username="tracy";
}else{
  $username=$_SESSION['name'];
}


$userid=$_SESSION['id'];


$db=new MyDB();
$tempsql="select exp from User where userid=$userid ;";


$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->query($sql);

$row = $ret->fetchArray(SQLITE3_ASSOC) ;

$exp=$row['exp'];

$maxexp=floor($exp/20)*20;

$array = array('username' =>$username, 'maxexp'=>$maxexp);


echo json_encode($array);





 ?>
