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
    public $intro;
    public $num;
    public $coverlink;
    public $maincolor;

    function __construct($title, $atyid,$intro,$num,$coverlink,$maincolor){
        $this->title = $title;
        $this->atyid = $atyid;
        $this->intro = $intro;
        $this->num = $num;
        $this->coverlink = $coverlink;
        $this->maincolor = $maincolor;
    }
}


?>
