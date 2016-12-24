<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
 header('Access-Control-Allow-Origin: *');

$username=$_GET["username"];
require ("DBHelper.php");
$db=new MyDB();

$username="\"".$username."\"";


$tempsql="DELETE FROM User WHERE username=$username;";



$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);


if(!$ret){
  $arr = array('issucc' => 0);
  echo json_encode($arr);
   } else {
     $arr = array('issucc' => 1);
     echo json_encode($arr);
   }









 ?>
