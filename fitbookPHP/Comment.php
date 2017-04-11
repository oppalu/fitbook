<?php

/**
 * Created by PhpStorm.
 * User: phoebegl
 * Date: 2017/4/10
 * Time: 10:39
 */
header('Access-Control-Allow-Origin: *');
class Comment
{
    public $id;
    public $authorname;
    public $avatar;
    public $content;
    public $createtime;

    function __construct($id,$authorname,$avatar,$content,$createtime){
        $this->id=$id;
        $this->authorname=$authorname;
        $this->avatar=$avatar;
        $this->content=$content;
        $this->createtime=$createtime;
    }
}

 ?>