function doMap(){



  var map = new BMap.Map("mapdiv");
  map.enableScrollWheelZoom(true);

  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
  //            alert('您的位置：'+r.point.lng+','+r.point.lat);
          map.centerAndZoom(new BMap.Point(r.point.lng-0.03, r.point.lat-0.01), 15);
      }
      else {
          alert('failed'+this.getStatus());
      }
  },{enableHighAccuracy: true})


  // var navigationControl = new BMap.NavigationControl({
  //     // 靠左上角位置
  //     anchor: BMAP_ANCHOR_TOP_LEFT,
  //     // LARGE类型
  //     type: BMAP_NAVIGATION_CONTROL_LARGE,
  //     // 启用显示定位
  //     enableGeolocation: true
  // });
  // map.addControl(navigationControl);
  // 添加定位控件
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", function(e){
      // 定位成功事件

  });
  geolocationControl.addEventListener("locationError",function(e){
      // 定位失败事件
      alert(e.message);
  });
  map.addControl(geolocationControl);








  function showInfo(e){
  //        alert(e.point.lng + ", " + e.point.lat);


      var point = new BMap.Point(e.point.lng,e.point.lat);
      var gc = new BMap.Geocoder();
      gc.getLocation(point, function(rs) {
        var addComp = rs.surroundingPois;

        var msg="";

        if (addComp[0].city!=" ") {
          msg+=addComp[0].city;
        }

        if (addComp[0].address!=" ") {
          msg+=(","+addComp[0].address);
        }

        if (addComp[0].title!=" ") {
          msg+=(","+addComp[0].title);
        }





        document.getElementById("mapaddress").innerText=msg;

      });






  }
  map.addEventListener("click", showInfo);


  var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
  var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
  var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
  /*缩放控件type有四种类型:
   BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/

  //添加控件和比例尺
  function add_control(){
      map.addControl(top_left_control);
      map.addControl(top_left_navigation);
      map.addControl(top_right_navigation);
  }


  add_control();



}




function doConfirm(){


  
}
