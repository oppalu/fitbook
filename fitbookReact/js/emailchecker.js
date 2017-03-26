function checkEmail(address){
  var reg=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
  if(reg.test(address)==true){
    return 1;
  }else {
    return 0;
  }
}


function swipeout(swipeflag,id){


  if(id=="0"){
    id="";
  }


  if(swipeflag==1){
    //go back
    document.getElementsByClassName("swipedDrawer")[0].className="drawerbackdiv";
    document.getElementsByClassName("swipedDiv"+id)[0].className="swipedbackDiv"+id;
  }else{
    try{
      document.getElementsByClassName("originalDrawer")[0].className="swipedDrawer";
      document.getElementsByClassName("testdiv"+id)[0].className="swipedDiv"+id;
    }catch(e){
      document.getElementsByClassName("drawerbackdiv")[0].className="swipedDrawer";
      document.getElementsByClassName("swipedbackDiv"+id)[0].className="swipedDiv"+id;
    }
  }
}
