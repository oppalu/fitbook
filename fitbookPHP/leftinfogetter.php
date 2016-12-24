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

$username=$_GET["username"];


$realusername=$_SESSION["name"];

$coverurl="http://127.0.0.1/userdata/cover/";
$avatarurl="http://127.0.0.1/userdata/avatar/";


$db=new MyDB();
$tempsql="select email,age,gender,exp,avatarlink,coverlink,c.maincolor from User u,Cover c where u.username=";

$tempsql=$tempsql."\"".$username."\" and c.type=\"user\" and c.id=u.userid ";



$sql =<<<EOF
     $tempsql
EOF;


$email="";
$age=0;
$gender="";
$exp=0;
$avatarlink="";
$coverlink="";
$maincolor="";



$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $email=$row['email'];

  $age=$row['age'];

  $gender=$row['gender'];
  $exp=$row['exp'];

  $avatarlink=$row['avatarlink'];
  $coverlink=$row['coverlink'];
  $maincolor=$row['maincolor'];
}


$ishimself=0;
$isfriend=0;

if($username==$realusername){
  $ishimself=1;
  $isfriend=0;
}else{
  $ishimself=0;
  $tempsql="select count(*) from Friend where ";


   $wherepart="(user1=\"".$username."\" and user2=\"".$realusername."\") or ( user1=\"".$realusername."\" and user2=\"".$username."\");";



  $tempsql=$tempsql.$wherepart;


$sqlj =<<<EOF
    $tempsql
EOF;



  $ret = $db->query($sqlj);
  $row = $ret->fetchArray(SQLITE3_ASSOC);
  $count=$row['count(*)'];

  if($count>0){
    $isfriend=1;
  }else{
    $isfriend=0;
  }



}




//use while avoid empty
if($email==""){
  $arr = array('isava'=>0,'totalsleep' => 1, 'sleeptime'=>session_id(),'getuptime'=>1,'deeptime'=>1,'lighttime'=>1);
  echo json_encode($arr);
}else{
  $level=floor($exp/20);
  $upper=($level+1)*20;
  $level=$level." (".$exp."/".$upper.")";

  $avatarurl=$avatarurl.$avatarlink;

  $coverurl=$coverurl.$coverlink;

  $coverurl="url(".$coverurl.")";

  $arr = array('isava'=>1,'email' => $email,'age'=>$age,'gender'=>$gender,'isfriend'=>$isfriend,'ishimself'=>$ishimself,'level'=>$level,'avatarlink'=>$avatarurl,'coverlink'=>$coverurl,'maincolor'=>$maincolor);
  echo json_encode($arr);
}

 ?>
