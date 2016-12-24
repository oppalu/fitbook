<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
header('Access-Control-Allow-Origin: *');


class Msg{
  public $username;
  public $avatarlink;
  public $title;
  public $msgid;
  public $state;
  public $challangename;

  function __construct($username,$avatarlink,$title,$msgid,$state,$challangename){
            $this->username=$username;
            $this->avatarlink=$avatarlink;
            $this->title=$title;
            $this->msgid=$msgid;
            $this->state=$state;
            $this->challangename=$challangename;

        }
}


 ?>
