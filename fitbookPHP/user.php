<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
header('Access-Control-Allow-Origin: *');


class User{
  public $username;
  public $avatarlink;

  function __construct($username,$avatarlink){
            $this->avatarlink=$avatarlink;
            $this->username=$username;   
        }
}


 ?>
