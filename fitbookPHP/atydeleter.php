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

$username=$_SESSION["name"];

require ("DBHelper.php");
$db=new MyDB();

$atyid=$_GET["atyid"];

$tempsql="DELETE FROM Activity WHERE atyid=$atyid ;";



$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);



$tempsql="DELETE FROM Cover WHERE type=\"aty\" and id=$atyid ;";



$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);





if(!$ret){
  $arr = array('issucc' => 0,'username'=>$username);
  echo json_encode($arr);
   } else {
     $arr = array('issucc' => 1,'username'=>$username);
     echo json_encode($arr);
   }









 ?>
