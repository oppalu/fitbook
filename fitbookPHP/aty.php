<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
header('Access-Control-Allow-Origin: *');


class Aty{
  public $title;
  public $atyid;

  function __construct($title,$atyid){
            $this->title=$title;
            $this->atyid=$atyid;
        }
}


 ?>
