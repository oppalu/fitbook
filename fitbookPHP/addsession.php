<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */

$ssid=$_GET["ssid"];
 session_id($ssid);
session_start();

header('Access-Control-Allow-Origin: *');

if($_SESSION['name']==""){
  echo "no!";
}else{
  echo $_SESSION['name'];
}

 ?>
