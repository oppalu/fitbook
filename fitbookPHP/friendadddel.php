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
$friendname=$_GET["friend"];
$reply=$_GET["reply"];

$ownername=$_SESSION["name"];

$db=new MyDB();

$friendname="\"".$friendname."\"";
$ownername="\"".$ownername."\"";



$tempsql="";
if($reply==0){//delete
  $tempsql="delete from Friend where (user1=$friendname and user2=$ownername) or (user2=$friendname and user1=$ownername) ;";
}else{//add
  $id1=rand(1,100000);
  $id2=rand(1,100000);

  $tempsql="insert into Friend VALUES ($id1,$friendname,$ownername),($id2,$ownername,$friendname) ;";
}

$sql =<<<EOF
     $tempsql
EOF;


$ret = $db->exec($sql);

if(!$ret){
  echo 0;
}else{
  echo 1;
}


 ?>
