<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */

header('Access-Control-Allow-Origin: *');
require ("DBHelper.php");
require ("user.php");
require ("aty.php");
$avatarurl="http://127.0.0.1/userdata/avatar/";

$keyword = $_GET["keyword"];

if($keyword=="@@"){
  $keyword="";
}


$wkeyword="\"%".$keyword."%\"";

$db=new MyDB();



$tempsql="select username,avatarlink from User where username like ".$wkeyword;


$sql =<<<EOF
     $tempsql
EOF;


$userarr=array();

$ret = $db->query($sql);
while($row = $ret->fetchArray(SQLITE3_ASSOC) ){

  $sendername=$row['username'];
  $senderavatar=$row['avatarlink'];


  $senderavatar=$avatarurl.$senderavatar;

  $user=new User($sendername,$senderavatar);

  array_push($userarr, $user);
}


$tempsql="select atyid,title from Activity where title like ".$wkeyword." or intro like ".$wkeyword." ;";


$sql =<<<EOF
     $tempsql
EOF;

$atyarr=array();

$ret = $db->query($sql);
while($row = $ret->fetchArray(SQLITE3_ASSOC) ){

  $atyid=$row['atyid'];
  $title=$row['title'];

  $aty=new Aty($title,$atyid);

  array_push($atyarr, $aty);
}

$totalarr=array();

array_push($totalarr, $userarr);
array_push($totalarr, $atyarr);

$json_string = json_encode($totalarr,JSON_UNESCAPED_UNICODE);
echo $json_string;



 ?>
