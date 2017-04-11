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
$pic = $_FILES['pic']['tmp_name'];
$upload_ret = false;

$filename="";

if($pic){
        // 上传的路径，建议写物理路径
        $uploadDir = '/Users/peiyulin/Documents/phpsource/fitbook/userdata/cover';
        // 创建文件夹
        if(!file_exists($uploadDir)){
            mkdir($uploadDir, 0777);
        }
        // 用时间戳来保存图片，防止重复
        $filename=time() . $_FILES['pic']['name'];
        $targetFile = $uploadDir . '/' . time() . $_FILES['pic']['name'];
        // 将临时文件 移动到我们指定的路径，返回上传结果
        $upload_ret = move_uploaded_file($pic, $targetFile) ? true : false;
    }



//
$db=new MyDB();


$tempsql="select userid from User where username=";

$tempsql=$tempsql."\"".$username."\" ;";


$sql =<<<EOF
     $tempsql
EOF;
$ret = $db->query($sql);
$row = $ret->fetchArray(SQLITE3_ASSOC) ;
$id=$row['userid'];













$tempsql="UPDATE Cover set coverlink="."\"".$filename."\""." where type=\"user\" and id=$id ;";

$sql =<<<EOF
     $tempsql
EOF;

$ret = $db->exec($sql);

if(!$ret){
      echo "0";
   } else {
      echo "1";
   }









 ?>
