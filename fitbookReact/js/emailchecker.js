function checkEmail(address){
  var reg=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
  if(reg.test(address)==true){
    return 1;
  }else {
    return 0;
  }
}
