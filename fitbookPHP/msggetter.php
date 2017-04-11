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
require ("message.php");



$username=$_SESSION["name"];

$userid=$_SESSION["id"];
$avatarurl="http://127.0.0.1/userdata/avatar/";


$db=new MyDB();
$tempsql="select u.username,u.avatarlink,aty.title,m.id,m.state,aty.challangename from Message m, Activity aty,User u where  aty.atyid=m.atyid and u.userid=m.senderid and m.getterid=";

$tempsql=$tempsql.$userid." ;";



$sql =<<<EOF
     $tempsql
EOF;


$sendername="";
$senderavatar="";
$msgtitle="";
$msgid=0;
$msgstate=-2;
$challangename="";

$msgarr=array();

$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){

  $sendername=$row['username'];
  $senderavatar=$row['avatarlink'];
  $msgtitle=$row['title'];
  $msgid=$row['id'];
  $msgstate=$row['state'];
  $challangename=$row['challangename'];


  $senderavatar=$avatarurl.$senderavatar;

  $message=new Msg($sendername,$senderavatar,$msgtitle,$msgid,$msgstate,$challangename);

  array_push($msgarr, $message);
}
$json_string = json_encode($msgarr,JSON_UNESCAPED_UNICODE);
echo $json_string;
 ?>
