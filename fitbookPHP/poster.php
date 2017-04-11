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
$db=new MyDB();

$username="";
if($_SESSION['name']==""){
  $username="tracy";
}else{
  $username=$_SESSION['name'];
}

$userid=$_SESSION['id'];
$type=$_GET["type"];

$sportdata=addmark($_GET["sportdata"]);

$content=addmark($_GET["content"]);

$date=addmark(date("Y-m-d"));

$time=addmark(date("h:i"));

$strtype="";
if($type==2){//walk
  $strtype="walk";

}elseif ($type==3) {//run
 $strtype="run";
}elseif ($type==4) {//ride
  $strtype="ride";
}elseif ($type==1) {//null
  $strtype="null";
  $sportdata=addmark("0");
}
$strtype=addmark($strtype);

$postid=rand(1,100000);

$likeid=rand(1,100000);




$tempsql="INSERT INTO Post VALUES ($postid,$content,$strtype,$date,$sportdata,$userid,$time);";

$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);


$tempsql="INSERT INTO LikeRec VALUES ($likeid,$postid,-1);";

$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);




if(!$ret){
      echo "0";
   } else {
      echo "1";
   }


   function addmark($str){
     $nstr="\"".$str."\"";
     return $nstr;
   }



 ?>
