<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */


//获得是否是leader，成员名字，cover
header('Access-Control-Allow-Origin: *');
$ssid=$_GET["ssid"];
Session_id($ssid);
session_start();
$realusername=$_SESSION["name"];

$coverurl="http://127.0.0.1/userdata/cover/";

require ("DBHelper.php");
require("usercover.php");
require("leader.php");


$atyid=$_GET["atyid"];


$userarr =array();

$leadername="";

$db=new MyDB();


$tempsql="select username,challangename from Activity aty,User u where aty.leaderid=u.userid and aty.atyid=";

$tempsql=$tempsql.$atyid.";";


$sql =<<<EOF
     $tempsql
EOF;
$ret = $db->query($sql);
$row = $ret->fetchArray(SQLITE3_ASSOC) ;
$leadername=$row['username'];

$challangename=$row['challangename'];

$judge=0;
if($leadername==$realusername){
  $judge=1;
}else{
  $judge=0;
}

$leader=new Leader($judge);

array_push($userarr, $leader);

$cha=new Leader($challangename);

array_push($userarr, $cha);




$tempsql="select username,coverlink from AtyUser atyu,Cover c,User u where c.type=\"user\" and atyu.userid=c.id and u.userid=c.id and atyu.atyid=";

$tempsql=$tempsql.$atyid.";";


$sql =<<<EOF
     $tempsql
EOF;

$username="";
$coverlink="";

$isleader=0;


$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $username=$row['username'];

  $coverlink=$row['coverlink'];

  $coverlink="url(".$coverurl.$coverlink.")";



  if($username==$leadername){
    $isleader=1;
  }else{
    $isleader=0;
  }

  $user=new UserCover($username,$coverlink,$isleader);

  array_push($userarr, $user);

}

$json_string = json_encode($userarr,JSON_UNESCAPED_UNICODE);
echo $json_string;



//use while avoid empty
// if($steps==""){
//   $arr = array('isava'=>0,'totalsleep' => 1, 'sleeptime'=>session_id(),'getuptime'=>1,'deeptime'=>1,'lighttime'=>1);
//   echo json_encode($arr);
// }else{
//   $strduration=changemin2hour($duration);
//   $cal=getCalories($distance)."卡";
//   $strdistance=$distance."公里";
//   $strsteps=$steps."步";
//
//
//   $arr = array('isava'=>1,'steps' => $strsteps, 'duration'=>$strduration,'distance'=>$strdistance,'cal'=>$cal);
//   echo json_encode($arr);
// }
 ?>
