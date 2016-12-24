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
$json = $_FILES['pic']['tmp_name'];
$upload_ret = false;



$filename="";

if($json){
        // 上传的路径，建议写物理路径
        $uploadDir = '/Users/peiyulin/Documents/phpsource/fitbook/userdata/data';
        // 创建文件夹
        if(!file_exists($uploadDir)){
            mkdir($uploadDir, 0777);
        }
        // 用时间戳来保存图片，防止重复
        $filename=time() .$username.$_FILES['pic']['name'];
        $targetFile = $uploadDir . '/' . time() . $username.".json";
        // 将临时文件 移动到我们指定的路径，返回上传结果
        $upload_ret = move_uploaded_file($json, $targetFile) ? true : false;

        $string=file_get_contents($targetFile);

        $rjson = json_decode($string, true);


        $userid=$rjson['userid'];

        $date=$rjson['date'];
          $date=addmark($date);


        //insert 4 times
        $db=new MyDB();

        $id=rand(1,100000);
        $sleeptime=$rjson['sleepdata']['gotobedTime'];
        $getuptime=$rjson['sleepdata']['getUpTime'];
        $deep=$rjson['sleepdata']['deeptime'];
        $light=$rjson['sleepdata']['lighttime'];

        $sleeptime=addmark($sleeptime);
        $getuptime=addmark($getuptime);


        $sleepsql="INSERT INTO Usersleep VALUES($id,$userid,$sleeptime,$getuptime,$date,$deep,$light)";

$sql =<<<EOF
  $sleepsql
EOF;

        $ret = $db->exec($sql);

        $runmaxspeed=$rjson['rundata']['maxspeed'];
        $runspeed=$rjson['rundata']['speed'];
        $runduration=$rjson['rundata']['duration'];
        $rundistance=$rjson['rundata']['distance'];



        $runsql="INSERT INTO Userrun VALUES($id,$date,$runmaxspeed,$runspeed,$runduration,$rundistance,$userid)";

$sql =<<<EOF
  $runsql
EOF;
        $ret = $db->exec($sql);


        $ridemaxspeed=$rjson['ridedata']['maxspeed'];
        $ridespeed=$rjson['ridedata']['speed'];
        $rideduration=$rjson['ridedata']['duration'];
        $ridedistance=$rjson['ridedata']['distance'];



        $ridesql="INSERT INTO Userride VALUES($id,$date,$ridemaxspeed,$ridespeed,$rideduration,$ridedistance,$userid)";

$sql =<<<EOF
  $ridesql
EOF;
        $ret = $db->exec($sql);


        $steps=$rjson['walkdata']['steps'];
        $walkduration=$rjson['walkdata']['duration'];
        $walkdistance=$rjson['walkdata']['distance'];


        $walksql="INSERT INTO Userwalk VALUES($id,$userid,$date,$steps,$walkduration,$walkdistance)";
$sql =<<<EOF
  $walksql
EOF;
        $ret = $db->exec($sql);

        echo(1);

    }else{
      echo(0);
    }



function addmark($str){
  $nstr="\"".$str."\"";
  return $nstr;
}


 ?>
