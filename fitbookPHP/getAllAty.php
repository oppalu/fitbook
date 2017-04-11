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

//$username = $_GET["username"];
$coverurl="http://127.0.0.1/userdata/cover/";


$db = new MyDB();
$tempsql = "select aty.atyid as aid,title,intro,p.pnum as num,coverlink,maincolor from Cover c,(select atyid,count(*) as pnum from AtyUser group by atyid)p,Activity aty where c.id=aty.atyid and c.type='aty' and p.atyid=aty.atyid ";



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
?>
