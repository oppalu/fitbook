<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */

header('Access-Control-Allow-Origin: *');
require ("DBHelper.php");


$email=$_GET["email"];



$db=new MyDB();
$tempsql="select count(*) from User where email=";


$tempsql=$tempsql."\"".$email."\";";


$sql =<<<EOF
     $tempsql
EOF;


$ret = $db->query($sql);
$row = $ret->fetchArray(SQLITE3_ASSOC);
$emailnum=$row['count(*)'];

if($emailnum!=0){
$tempsql="select password,username from User where email=";


$tempsql=$tempsql."\"".$email."\";";


$sql =<<<EOF
     $tempsql
EOF;


  $ret = $db->query($sql);
  $row = $ret->fetchArray(SQLITE3_ASSOC);
  $psw=$row['password'];
  $usn=$row['username'];

  $message="您好：".$usn.", 您的Fitbook密码是：".$psw;
  $from="Fitbook";
  $headers = "From: $from";
  $subject="Fitbook 找回密码";
  mail($email,$subject,$message,$headers);

}



echo $emailnum;


 ?>
