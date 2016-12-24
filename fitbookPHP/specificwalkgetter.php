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

$userid=$_SESSION['id'];


require ("DBHelper.php");


$date=$_GET["date"];

$date="\"".$date."\"";



$db=new MyDB();
$tempsql="select steps,duration,distance from Userwalk where userid=$userid and date=$date ;";


$sql =<<<EOF
     $tempsql
EOF;


$steps="";
$duration="";
$distance="";



$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $steps=$row['steps'];

  $duration=$row['duration'];

  $distance=$row['distance'];
}





//use while avoid empty
if($steps==""){
  $arr = array('isava'=>0,'totalsleep' => 1, 'sleeptime'=>session_id(),'getuptime'=>1,'deeptime'=>1,'lighttime'=>1);
  echo json_encode($arr);
}else{
  $strduration=changemin2hour($duration);
  $cal=getCalories($distance)."卡";
  $strdistance=$distance."公里";
  $strsteps=$steps."步";


  $arr = array('isava'=>1,'steps' => $strsteps, 'duration'=>$strduration,'distance'=>$strdistance,'cal'=>$cal);
  echo json_encode($arr);
}



function changemin2hour($min){
  $hour=$min/60;
  $minutes=$min%60;
  $hour=floor($hour);
  $str=$hour."小时 ".$minutes."分钟";
  return $str;
}

function getCalories($distance){
  return 63.75*$distance;
}




 ?>
