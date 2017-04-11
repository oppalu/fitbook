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
require("user.php");

$username = $_GET["username"];

$avatarurl = "http://127.0.0.1:8888/php/userdata/avatar/";
$coverurl="http://127.0.0.1:8888/php/userdata/cover/";

$db = new MyDB();
$tempsql = "select distinct user2,u.avatarlink,maincolor,coverlink from Friend f,User u,Cover c where u.username=f.user2 and c.id=u.userid and c.[type]='user' and f.user1=";

$tempsql = $tempsql . "\"" . $username . "\";";


$sql = <<<EOF
     $tempsql
EOF;


$friendname = "";
$avatarlink = "";
$mainColor = "";
$coverLink = "";


$ret = $db->query($sql);
$counter = 0;

$userarr = array();

while ($row = $ret->fetchArray(SQLITE3_ASSOC)) {
    $friendname = $row['user2'];

    $avatarlink = $row['avatarlink'];
    $avatarlink = $avatarurl . $avatarlink;

    $coverLink = $row['coverlink'];
    $coverLink = $coverurl.$coverLink;

    $mainColor = $row['maincolor'];

    $user = new User($friendname, $avatarlink,$coverLink,$mainColor);

    array_push($userarr, $user);

    $counter = $counter + 1;
}

$json_string = json_encode($userarr, JSON_UNESCAPED_UNICODE);
echo $json_string;


?>
