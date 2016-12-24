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

$username="";
if($_SESSION['name']==""){
  $username="tracy";
}else{
  $username=$_SESSION['name'];
}



$db=new MyDB();
$tempsql="select maxspeed,speed,duration,distance
from User u,Userride us where u.userid=us.userid and us.date=";

$todaydate= date("Y-m-d") ;


$tempsql=$tempsql."\"".$todaydate."\""." and u.username=\"".$username."\";";


$sql =<<<EOF
     $tempsql
EOF;


$maxspeed="";
$speed="";
$distance="";
$duration="";



$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $maxspeed=$row['maxspeed'];

  $speed=$row['speed'];

  $distance=$row['distance'];

  $duration=$row['duration'];
}





//use while avoid empty
if($maxspeed==""){
  $arr = array('isava'=>0,'totalsleep' => 1, 'sleeptime'=>session_id(),'getuptime'=>1,'deeptime'=>1,'lighttime'=>1);
  echo json_encode($arr);
}else{
  $strmaxspeed=$maxspeed;
  $strduration=changemin2hour($duration);
  $strdistance=$distance."公里";
  $strspeed=$speed;

  $cal=getCalories($duration,$speed);


  $arr = array('isava'=>1,'maxspeed' => $strmaxspeed, 'duration'=>$strduration,'distance'=>$strdistance,'cal'=>$cal,'speed'=>$strspeed);
  echo json_encode($arr);
}



function changemin2hour($min){
  $hour=$min/60;
  $minutes=$min%60;
  $hour=floor($hour);
  if($hour==0){
  $str=$minutes."分钟";
}else{
  $str=$hour."小时 ".$minutes."分钟";
}
  return $str;
}

function getCalories($duration,$speed){
  $cal=0;
  if($speed<=10){
    $cal=201;
  }elseif ($speed>10&&$speed<=14) {
    $cal=335;
  }elseif ($speed>14&&$speed<=16) {
    $cal=603;
  }elseif ($speed>16&&$speed<=20) {
    $cal=737;
  }elseif ($speed>20) {
    $cal=1005;
  }

  $rcal=$cal*$duration/60;



  return round($rcal,2)."千卡";



}




 ?>
