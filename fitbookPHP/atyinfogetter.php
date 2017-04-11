<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */

 //获得信息，目前的用户是否加入，是否为管理员
 header('Access-Control-Allow-Origin: *');
 $ssid=$_GET["ssid"];
Session_id($ssid);
session_start();
$realusername=$_SESSION["name"];

require ("DBHelper.php");

$atyid=$_GET["atyid"];

$coverurl="http://127.0.0.1/userdata/cover/";

$db=new MyDB();
$tempsql="select * from Activity aty,User u,Cover c where aty.leaderid=u.userid and c.type=\"aty\" and aty.atyid=c.id and atyid=";

$tempsql=$tempsql.$atyid.";";



$sql =<<<EOF
     $tempsql
EOF;


$title="";
$intro="";
$location="";
$type="";
$coin=0;
$starttime="";
$endtime="";

$coverlink="";
$maincolor="";
$leadername="";




$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $title=$row['title'];

  $intro=$row['intro'];

  $location=$row['location'];
  $type=$row['atytype'];

  $coin=$row['coin'];
  $starttime=$row['starttime'];
  $endtime=$row['endtime'];

  $coverlink=$row['coverlink'];
  $maincolor=$row['maincolor'];
  $leadername=$row['username'];
}


$isjoin=0;
$isleader=0;

if($leadername==$realusername){
  $isjoin=1;
  $isleader=1;
}else{
  $isleader=0;
  $tempsql="select count(*) from AtyUser aty,User u where aty.userid=u.userid and aty.atyid=";


  $tempsql=$tempsql.$atyid." and u.username=";

  $tempsql=$tempsql."\"".$realusername."\";";



$sqlj =<<<EOF
    $tempsql
EOF;



  $ret = $db->query($sqlj);
  $row = $ret->fetchArray(SQLITE3_ASSOC);
  $count=$row['count(*)'];

  if($count>0){
    $isjoin=1;
  }else{
    $isjoin=0;
  }



}




//use while avoid empty
if($title==""){
  $arr = array('isava'=>0,'totalsleep' => 1, 'sleeptime'=>session_id(),'getuptime'=>1,'deeptime'=>1,'lighttime'=>1);
  echo json_encode($arr);
}else{
  $state="";

  $currenttime=strtotime("now");
  $strstarttime=strtotime($starttime);

  $strendtime=strtotime($endtime);




  if($currenttime<=$strstarttime){
    $state="还未开始";
  }elseif ($currenttime>$strstarttime && $currenttime<$strendtime) {
    $state="正在进行中";
  }else{
    $state="已结束";
  }




  $coverurl=$coverurl.$coverlink;

  $arr = array('isava'=>1,'title' => $title,'intro'=>$intro,'location'=>$location,'type'=>$type,'coin'=>$coin,'starttime'=>$starttime,'endtime'=>$endtime,'coverlink'=>$coverurl,'maincolor'=>$maincolor,'state'=>$state,'isleader'=>$isleader,'isjoin'=>$isjoin);
  echo json_encode($arr);
}

 ?>
