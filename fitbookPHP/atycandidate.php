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
$username=$_SESSION["name"];

require ("DBHelper.php");
require("user.php");

 $atyid=$_GET["atyid"];

$avatarurl="http://127.0.0.1/userdata/avatar/";



$db=new MyDB();
$tempsql="select username,avatarlink from User u3 where username in( select user2 from Friend f,User u where f.user1=u.username and f.user1=";

$tempsql=$tempsql."\"".$username."\"";

$tempsql=$tempsql." and  f.user2 not in ( select username from AtyUser atyu,User u1 where u1.userid=atyu.userid and atyid=";

$tempsql=$tempsql.$atyid."));";



$sql =<<<EOF
     $tempsql
EOF;


$friendname="";
$avatarlink="";


$ret = $db->query($sql);

 $userarr =array();

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $friendname=$row['username'];

  $avatarlink=$row['avatarlink'];

  $avatarlink=$avatarurl.$avatarlink;

  $user=new User($friendname,$avatarlink);

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
