<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
header('Access-Control-Allow-Origin: *');


class UserCover{
  public $username;
  public $coverlink;
  public $isleader;

  function __construct($username,$coverlink,$isleader){
            $this->coverlink=$coverlink;
            $this->username=$username;
            $this->isleader=$isleader;
        }
}


 ?>
