<?php
header('Access-Control-Allow-Origin: *');
require ("DBHelper.php");
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 上午11:06
 */


$db = new MyDB();
if(!$db){
    echo $db->lastErrorMsg();
    return;
} else {
//       echo "Opened database successfully\n";
}
$us="select * from User;";

$sql =<<<EOF
     $us
EOF;
$ret = $db->query($sql);

while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
    echo "ID = ". $row['userid'] . "\n";
    echo "NAME = ". $row['username'] ."\n";
    echo "ADDRESS = ". $row['email'] ."\n";
    echo "ADDRESS = ". $row['age'] ."\n";
    echo "ADDRESS = ". $row['gender'] ."\n";
    echo "ADDRESS = ". $row['avatarlink'] ."\n";
    echo "ADDRESS = ". $row['exp'] ."\n";

    echo "SALARY =  ".$row['password'] ."\n\n";
}


$db->close();







?>
