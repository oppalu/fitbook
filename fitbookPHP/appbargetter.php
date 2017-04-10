<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
 $ssid=$_GET["ssid"];
Session_id($ssid);
 session_start();

header('Access-Control-Allow-Origin: *');
require ("DBHelper.php");


$coverurl="http://127.0.0.1/userdata/cover/";
$avatarurl="http://127.0.0.1/userdata/avatar/";

$username="";
if($_SESSION['name']==""){
  $username="tracy";
}else{
  $username=$_SESSION['name'];
}



$db=new MyDB();
$tempsql="select email,age,gender,coverlink,avatarlink,exp from User u,Cover c where u.userid=c.id and c.type=\"user\" and u.username=";

$tempsql=$tempsql."\"".$username."\";";



$sql =<<<EOF
     $tempsql
EOF;

$email="";
$age=0;
$gender="";

$exp=-1;
$coverlink="";
$avatarlink="";
$level=0;





$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
	$email=$row['email'];
  $age=$row['age'];
  $gender=$row['gender'];

  $exp=$row['exp'];

  $coverlink=$row['coverlink'];

  $avatarlink=$row['avatarlink'];
}





//use while avoid empty
if($exp==-1){
  $arr = array('isava'=>0,'totalsleep' => 1, 'sleeptime'=>session_id(),'getuptime'=>1,'deeptime'=>1,'lighttime'=>1);
  echo json_encode($arr);
}else{
  $level=floor($exp/20);
  $coverlink=$coverurl.$coverlink;
  $avatarlink=$avatarurl.$avatarlink;


  $coverlink="url(".$coverlink.")";
  $exp="经验值: ".$exp;
  $level="当前等级: ".$level;
  $age=$age."岁";
  $arr = array('isava'=>1,'exp' => $exp, 'coverlink'=>$coverlink,'avatarlink'=>$avatarlink,'level'=>$level,'username'=>$username,'email' => $email,'age'=>$age,'gender'=>$gender);
  echo json_encode($arr);
}





 ?>
