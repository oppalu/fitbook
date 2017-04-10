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

import RankTab from './rankTab.jsx';

import Paper from 'material-ui/Paper';

import RankIcon from 'material-ui/svg-icons/editor/format-list-numbered';

import HotIcon from 'material-ui/svg-icons/social/whatshot';

import {Tabs, Tab} from 'material-ui/Tabs';


import SwipeableViews from 'react-swipeable-views';


const MainContent = React.createClass({
  getInitialState(){
        return {
            isClickLogin: false,
            isClickReg: false,
            btntext:"null",
            postobj:"",
            slideIndex: 0,
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
      var url="http://localhost:8888/fitbook/cirpostgetter.php?ssid=";
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
    handleTabs(value){
      this.setState({slideIndex: value});
    },

  render() {

    return (
<div>

<AandD id="1"/>

<div style={{height:'61px'}}></div>




<div style={{paddingTop:'40px'}}>
  <div id="circleOther">


         <Tabs onChange={this.handleTabs}
           inkBarStyle={{backgroundColor:'#FFEB3B'}}
             value={this.state.slideIndex}
             tabItemContainerStyle={{height:'70px'}}>
       <Tab
         label={<div style={{color:'white',zIndex:'999',fontSize:'18px'}}>排行榜</div>}
         icon={<RankIcon/>}
         value={0}

       />

     </Tabs>

     <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleTabs}
          >


          <div>

             <RankTab />

           </div>



     </SwipeableViews>


  </div>

  <div id="circleMain" >
  <PublishCard />
{this.state.postobj}
  </div>
</div>





</div>




    );
  }
});


export default MainContent;
