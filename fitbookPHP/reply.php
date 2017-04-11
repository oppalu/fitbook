<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
 header('Access-Control-Allow-Origin: *');



require ("DBHelper.php");
 $msgid=$_GET["msgid"];
  $reply=$_GET["reply"];

$db=new MyDB();
$tempsql="update Message set state=$reply where id=".$msgid;


$sql =<<<EOF
     $tempsql
EOF;


$ret = $db->exec($sql);

if($reply==0){
  if(!$ret){
    echo 0;
  }else{
    echo 1;
  }
  return;
}else{
  $tempsql="select * from Message where id=".$msgid;

$sql =<<<EOF
    $tempsql
EOF;


  $ret = $db->query($sql);

$row = $ret->fetchArray(SQLITE3_ASSOC);
$atyid=$row['atyid'];
$userid=$row['getterid'];

//
$atyuid=rand(1,100000);

$tempsql="insert into AtyUser VALUES (".$atyuid.",".$atyid.",".$userid.");";

$sql =<<<EOF
  $tempsql
EOF;


$ret = $db->exec($sql);
if(!$ret){
  echo 0;
}else{
  echo 1;
}







}

 ?>
