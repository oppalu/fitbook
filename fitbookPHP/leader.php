<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
header('Access-Control-Allow-Origin: *');


class Leader{
  public $isthismanleader;

  function __construct($isthismanleader){
            $this->isthismanleader=$isthismanleader;

        }
}


 ?>
