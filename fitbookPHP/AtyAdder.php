<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
 header('Access-Control-Allow-Origin: *');
 /**
  *
  */


 class AtyAdder
 {
   function addAUser2Aty($db,$atyid,$userid){
      $id=rand(1,100000);

      $coversql="INSERT INTO AtyUser VALUES ($id,$atyid,$userid)";
$sql =<<<EOF
  $coversql
EOF;

  $ret = $db->exec($sql);
  return $ret;







   }
 }







 ?>
