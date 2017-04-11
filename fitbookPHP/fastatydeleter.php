<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
 header('Access-Control-Allow-Origin: *');

$atyid=$_GET["atyid"];
require ("DBHelper.php");
$db=new MyDB();



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
  $arr = array('issucc' => 0);
  echo json_encode($arr);
   } else {
     $arr = array('issucc' => 1);
     echo json_encode($arr);
   }









 ?>
