<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */


//获得数目，名字，头像
header('Access-Control-Allow-Origin: *');
$ssid=$_GET["ssid"];
Session_id($ssid);
session_start();

require ("DBHelper.php");
require("user.php");

 $username=$_SESSION["name"];

$avatarurl="http://127.0.0.1/userdata/avatar/";



$db=new MyDB();
$tempsql="select distinct user2,u.avatarlink from Friend f,User u where u.username=f.user2 and f.user1=";

$tempsql=$tempsql."\"".$username."\";";


$sql =<<<EOF
     $tempsql
EOF;


$friendname="";
$avatarlink="";


$ret = $db->query($sql);
$counter=0;

 $userarr =array();

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $friendname=$row['user2'];

  $avatarlink=$row['avatarlink'];

  $avatarlink=$avatarurl.$avatarlink;

  $user=new User($friendname,$avatarlink);

  array_push($userarr, $user);

  $counter=$counter+1;
}

$json_string = json_encode($userarr,JSON_UNESCAPED_UNICODE);
echo $json_string;


 ?>
