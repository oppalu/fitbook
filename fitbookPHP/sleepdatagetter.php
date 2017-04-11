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
$tempsql="select sleeptime,getuptime,date,deepduration,lightduration from Usersleep where userid=".$userid." order by date desc;";

$sql =<<<EOF
     $tempsql
EOF;


$sleeptime="";
$getuptime="";
$deepduration="";
$lightduration="";

$result=array();

$sleeptimearr=array();

$getuptimearr=array();

$deepdurationarr=array();

$lightdurationarr=array();

$datearr=array();

$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $sleeptimearr[]=$row['sleeptime'];

  $getuptimearr[]=$row['getuptime'];

  $deepdurationarr[]=$row['deepduration'];

  $lightdurationarr[]=$row['lightduration'];

  $datearr[]=$row['date'];
}



$sleepresarr = array('sleepavgtime'=>substr(getAvgSleepTime($sleeptimearr),0,5));

$getupresarr = array('getupavgtime'=>substr(getAvgGetupTime($getuptimearr),0,5));

$durationresarr=array('totalduration'=>getTotalDuration($deepdurationarr,$lightdurationarr));


array_push($result,$sleepresarr);
array_push($result,$getupresarr);
array_push($result,$durationresarr);




$len=count($datearr);

$temparr=array();
for($x=0; $x<120; $x++){
  $strdate=strtotime($datearr[$x]." 00:00:00");


$yres="";

if(substr($sleeptimearr[$x],0,1)=='0'){
    $yres=strtotime("1999-01-02 ".$sleeptimearr[$x].":00");
}else {
  $yres=strtotime("1999-01-01 ".$sleeptimearr[$x].":00");
}

  $t=array();

  $t[]=$strdate*1000+3600*8*1000;
  $t[]=$yres*1000+3600*8*1000;

  array_push($temparr,$t);
}

array_push($result,$temparr);
//getup

$gettemp=array();
for($x=0; $x<120; $x++){
  $strdate=strtotime($datearr[$x]." 00:00:00");


$yres="";

$yres=strtotime("1999-01-01 ".$getuptimearr[$x].":00");

  $t=array();

  $t[]=$strdate*1000+3600*8*1000;
  $t[]=$yres*1000+3600*8*1000;

  array_push($gettemp,$t);
}
array_push($result,$gettemp);







$json_string = json_encode($result,JSON_UNESCAPED_UNICODE);
echo $json_string;






function changemin2hour($min){
  $hour=$min/60;
  $minutes=$min%60;
  $hour=floor($hour);
  $str=$hour."小时".$minutes."分钟";
  return $str;
}


function getAvgSleepTime($arr){
  $len=count($arr);


  $sum=0;
  for($x=0; $x<$len; $x++){


    if(substr($arr[$x],0,1)=='0'){
      $sum=$sum+strtotime("1999-01-02 ".$arr[$x].":00");
    }else {
      $sum=$sum+strtotime("1999-01-01 ".$arr[$x].":00");
    }

  }
  // return floor($sum/$len);

  return substr(date('Y-m-d H:i:s',floor($sum/$len)),11);
}

function getAvgGetupTime($arr){
  $len=count($arr);


  $sum=0;
  for($x=0; $x<$len; $x++){

      $sum=$sum+strtotime("1999-01-01 ".$arr[$x].":00");

  }
  // return floor($sum/$len);

  return substr(date('Y-m-d H:i:s',floor($sum/$len)),11);
}


function getTotalDuration($deeparr,$lightarr){
  $len=count($deeparr);


  $sum=array_sum($deeparr)+array_sum($lightarr);

  $avg=floor($sum/$len);

  $res=changemin2hour($avg);

  return $res;


}




 ?>
