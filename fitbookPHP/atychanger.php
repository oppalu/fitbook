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



$username=$_SESSION["name"];
$coin=$_GET["coin"];
$title=$_GET["title"];
$intro=$_GET["intro"];
$location=$_GET["location"];
$starttime=$_GET["starttime"];
$endtime=$_GET["endtime"];
$type=$_GET["type"];
$atyid=$_GET["atyid"];



//先检查有没有重名，再插入
$db=new MyDB();

$checksql="select userid from User where username=";
$checksql=$checksql."\"".$username."\" ;";
$sql =<<<EOF
     $checksql
EOF;


$ret = $db->query($sql);
$row = $ret->fetchArray(SQLITE3_ASSOC);
$userid=$row['userid'];



$coverlink="";

$maincolor="";
if($type=="骑行"){
  $coverlink="\"aty1.jpg\"";

  $maincolor="\"#5186bc\"";

}elseif ($type=="跑步") {
  $coverlink="\"aty2.jpg\"";

  $maincolor="\"#796333\"";

}elseif ($type=="计步") {
  $coverlink="\"aty3.jpg\"";

  $maincolor="\"#5F758E\"";


}






$ntitle=addmark($title);
$nintro=addmark($intro);
$nlocation=addmark($location);

$nstarttime=addmark($starttime);

$nendtime=addmark($endtime);

$ntype=addmark($type);


$coversql="UPDATE Cover set  maincolor=$maincolor,coverlink=$coverlink where id=$atyid and type=\"aty\"";
$tempsql="UPDATE Activity set coin=$coin,title=$ntitle,intro=$nintro,location=$nlocation,starttime=$nstarttime,endtime=$nendtime,atytype=$ntype  where atyid=$atyid";

$sql =<<<EOF
    $tempsql
EOF;

$ret = $db->exec($sql);

$sql =<<<EOF
    $coversql
EOF;

$ret = $db->exec($sql);






if(!$ret){
  $arr = array('issucc' => 0);
  echo json_encode($arr);
} else {
     $arr = array('issucc' => 1);
     echo json_encode($arr);
}


function addmark($str){
  $nstr="\"".$str."\"";
  return $nstr;
}









 ?>
