<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */


//获得数目，名字，头像
header('Access-Control-Allow-Origin: *');
require("DBHelper.php");
require("aty.php");

$username = $_GET["username"];
$coverurl="http://127.0.0.1:8888/php/userdata/cover/";


$db = new MyDB();
$tempsql = "select aty.atyid as aid,title,intro,p.pnum as num,coverlink,maincolor from Cover c,(select atyid,count(*) as pnum from AtyUser group by atyid)p,AtyUser au,User u,Activity aty where au.userid=u.userid and c.id=aty.atyid and c.type='aty' and p.atyid=aty.atyid and aty.atyid=au.atyid and u.username=";

$tempsql = $tempsql . "\"" . $username . "\";";


$sql = <<<EOF
     $tempsql
EOF;


$atyid = "";
$title = "";
$intro = "";
$num = 0;
$coverlink = "";
$maincolor = "";

$ret = $db->query($sql);


$userarr = array();

while ($row = $ret->fetchArray(SQLITE3_ASSOC)) {
    $title = $row['title'];
    $atyid = $row['aid'];
    $intro = $row['intro'];
    $num = $row['num'];
    $coverlink = $coverurl.$row['coverlink'];
    $maincolor = $row['maincolor'];

    $user = new Aty($title, $atyid,$intro,$num,$coverlink,$maincolor);

    array_push($userarr, $user);

}

$json_string = json_encode($userarr, JSON_UNESCAPED_UNICODE);
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
