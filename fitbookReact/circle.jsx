import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';

import FriendCard from './myfriend.jsx';
import GroupCard from './group.jsx';

import PublishCard from './publish.jsx';

import MyAtyCard from './myactivity.jsx';

import PostCard from './postcard.jsx';
import AandD from './appbaranddrawer.jsx';
import MyDrawer from './mydrawer.jsx';


const MainContent = React.createClass({
  getInitialState(){
        return {
            isClickLogin: false,
            isClickReg: false,
            btntext:"null",
            postobj:"",
        }
    },
    componentDidMount: function() {
        this.initData();
    },
    initData(){
      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request")
        return
      }
      var url="http://127.0.0.1/cirpostgetter.php?ssid=";
      url+=getCookie("ssid");


      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();

          var rows=[];
          for(var i=0;i<json.length;i++){
            rows.push(<PostCard isManage="0" likenum={json[i].likenum} username={json[i].username} datetime={json[i].date+" "+json[i].time} postid={json[i].postid}
            content={json[i].content} sporttypeurl={json[i].sporttypeurl}  sportdata={json[i].adddata} avatarlink={json[i].useravatar} isliked={json[i].isliked}/>);
          }

          if(json.length==0){
            rows.push(<div>还没有发布过动态</div>);
          }
          that.setState({postobj: rows});

        }
      };

      xmlHttp.open("GET",url,true);
      xmlHttp.send();
    },

  render() {

    return (
<div>

<AandD id="1"/>

<div style={{height:'61px'}}></div>

  <MyDrawer activeItem="2" />


  <div  className="testdiv2">
<div style={{paddingTop:'40px'}}>
  <div id="circleOther">
   <FriendCard />
   <div style={{height:'30px'}}></div>
   <GroupCard />
   <div style={{height:'30px'}}></div>
   <MyAtyCard />
  </div>

  <div id="circleMain" >
  <PublishCard />
{this.state.postobj}
  </div>
</div>



</div>

</div>




    );
  }
});


export default MainContent;
