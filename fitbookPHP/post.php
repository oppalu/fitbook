<?php
/**
 * Created by PhpStorm.
 * User: peiyulin
 * Date: 2016/11/28
 * Time: 下午12:03
 */
header('Access-Control-Allow-Origin: *');


class Post{
  public $postid;
  public $content;
  public $sporttypeurl;
  public $adddata;
  public $likenum;
  public $time;
  public $isliked;
  public $username;
  public $useravatar;
  public $date;




  function __construct($postid,$content,$sporttypeurl,$adddata,$likenum,$time,$isliked,$username,$useravatar,$date){
            $this->postid=$postid;
            $this->content=$content;
            $this->sporttypeurl=$sporttypeurl;
            $this->adddata=$adddata;
            $this->likenum=$likenum;
            $this->time=$time;
            $this->isliked=$isliked;
            $this->username=$username;
            $this->useravatar=$useravatar;
            $this->date=$date;

        }
}


 ?>
