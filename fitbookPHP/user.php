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
    public $coverLink;
    public $mainColor;

    function __construct($username, $avatarlink,$coverLink,$mainColor){
        $this->avatarlink = $avatarlink;
        $this->username = $username;
        $this->coverLink = $coverLink;
        $this->mainColor = $mainColor;
    }
}


?>
