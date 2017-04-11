<?php
/**
 * Created by PhpStorm.
 * User: phoebegl
 * Date: 2017/4/10
 * Time: 11:22
 */
header('Access-Control-Allow-Origin: *');
require ("DBHelper.php");
require ("Comment.php");

$db=new MyDB();
$postid=$_GET['postid'];

$sql="select c.commentid,c.content,c.createtime,u.username,u.avatarlink from Comment c,`User` u
where c.author=u.userid and c.postid=".$postid;

$commentarr=array();
$commentid=0;
$authorname="";
$avatar="";
$content="";
$createtime="";
$avatarurl="http://127.0.0.1/userdata/avatar/";

$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
    $commentid=$row['commentid'];

    $authorname=$row['username'];

    $avatar=$avatarurl.$row['avatarlink'];

    $content=$row['content'];

    $createtime=$row['createtime'];

    $commentobj=new Comment($commentid,$authorname,$avatar,$content,$createtime);
    array_push($commentarr, $commentobj);
}

$json_string = json_encode($commentarr,JSON_UNESCAPED_UNICODE);
echo $json_string;
