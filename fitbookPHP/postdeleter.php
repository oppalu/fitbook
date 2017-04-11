<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
 header('Access-Control-Allow-Origin: *');


require ("DBHelper.php");
$db=new MyDB();

$postid=$_GET["postid"];

$tempsql="DELETE FROM Post WHERE postid=$postid ;";



$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);



$tempsql="DELETE FROM LikeRec WHERE postid=$postid and likeuserid=-1;";



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
