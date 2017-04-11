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

$userid=$_SESSION['id'];

$db=new MyDB();
$tempsql="select steps,duration,distance,date from Userwalk where userid=".$userid." order by date desc;";

$sql =<<<EOF
     $tempsql
EOF;


$result=array();


$steparr=array();

$durationarr=array();

$distancearr=array();

$datearr=array();

$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $steparr[]=$row['steps'];

  $durationarr[]=$row['duration'];

  $distancearr[]=$row['distance'];

  $lightdurationarr[]=$row['lightduration'];

  $datearr[]=$row['date'];
}



$stepresarr = array('avgstep'=>getAvgStep($steparr));

$distanceresarr = array('avgdistance'=>getAvgDis($distancearr));

$calresarr=array('avgcal'=>getAvgCal($distancearr));


array_push($result,$stepresarr);
array_push($result,$distanceresarr);
array_push($result,$calresarr);






$len=count($datearr);

$temparr=array();
for($x=0; $x<120; $x++){
  $strdate=strtotime($datearr[$x]." 00:00:00");


  $t=array();

  $t[]=$strdate*1000+3600*8*1000;
  $t[]=$steparr[$x];

  array_push($temparr,$t);
}

array_push($result,$temparr);



$json_string = json_encode($result,JSON_UNESCAPED_UNICODE);
echo $json_string;






function changemin2hour($min){
  $hour=$min/60;
  $minutes=$min%60;
  $hour=floor($hour);
  $str=$hour."小时".$minutes."分钟";
  return $str;
}


function getAvgStep($arr){
  return floor(array_sum($arr)/count($arr))."步";
}

function getAvgDis($arr){
  return floor(array_sum($arr)/count($arr))."km";
}

function getAvgCal($arr){
  $a=floor(array_sum($arr)/count($arr)*63.75);
  return $a."Cal";
}

 ?>
