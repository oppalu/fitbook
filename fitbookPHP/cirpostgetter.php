<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
 //取出该用户的所有po文
 $ssid=$_GET["ssid"];
Session_id($ssid);
 session_start();

header('Access-Control-Allow-Origin: *');
require ("DBHelper.php");
require ("post.php");

$username="";
if($_SESSION['name']==""){
  $username="tracy";
}else{
  $username=$_SESSION['name'];
}

$sporticonurl="http://127.0.0.1/userdata/icon/";
$avatarurl="http://127.0.0.1/userdata/avatar/";

$db=new MyDB();


//get postid user liked
$tempsql="select postid from LikeRec slr,User su where su.userid=slr.likeuserid and su.username=";



$tempsql=$tempsql."\"".$username."\";";


$sql =<<<EOF
     $tempsql
EOF;

$likedpostarr=array();

$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $likedpostarr[]=$row['postid'];
}




$strusername="\"".$username."\"";




$tempsql="select p.postid,content,addsport,date,adddata,time,username,avatarlink,count(*)-1 as likenum
from Post p,User u,LikeRec lr where p.userid=u.userid and p.postid=lr.postid and ( u.username in(select user2 from Friend where user1=";

$tempsql=$tempsql.$strusername.") or username=".$strusername.") group by p.postid order by date desc,time desc;";

$sql =<<<EOF
     $tempsql
EOF;

$postid=0;
$content="";
$sporttypeurl="";
$adddata="";
$likenum=0;
$time="";
$isliked=0;
$postusername="";
$useravatar="";
$date="";



$postarr =array();
$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
  $postid=$row['postid'];

  $content=$row['content'];

  $sporttypeurl=$row['addsport'];

  $date=$row['date'];

  $adddata=$row['adddata'];

  $likenum=$row['likenum'];

  $time=$row['time'];

  $postusername=$row['username'];

  $useravatar=$row['avatarlink'];

  if(in_array($postid,$likedpostarr)){
    $isliked=1;
  }else{
    $isliked=0;
  }
  if($sporttypeurl!="null"){
    $sporttypeurl=$sporticonurl.$sporttypeurl.".png";
  }

  $useravatar=$avatarurl.$useravatar;



  $postobj=new Post($postid,$content,$sporttypeurl,$adddata,$likenum,$time,$isliked,$postusername,$useravatar,$date);
    array_push($postarr, $postobj);
}

$json_string = json_encode($postarr,JSON_UNESCAPED_UNICODE);
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
