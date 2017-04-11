<?php
header('Access-Control-Allow-Origin: *');
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 上午10:16
 */

   class MyDB extends SQLite3
   {
       function __construct()
       {
           $this->open('/Users/phoebegl/Desktop/fitbook/Fitbook.db');
       }
   }


?>
