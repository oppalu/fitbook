import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';

import { Link } from 'react-router';

import {Tabs, Tab} from 'material-ui/Tabs';


import SwipeableViews from 'react-swipeable-views';

import SleepTab from './sleepTab.jsx';

import WalkTab from './walkTab.jsx';
import RunTab from './runTab.jsx';
import RideTab from './rideTab.jsx';
import Avatar from 'material-ui/Avatar';
import AandD from './appbaranddrawer.jsx';



const MainContent = React.createClass({
  getInitialState(){
        return {
            btntext:"null",
            slideIndex: 0,
        }
    },

    testajax() {

      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request")
        return
      }
      var url="http://127.0.0.1/addsession.php?ssid=";
      url+=ssholder.getsession();
      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
        alert(xmlHttp.responseText);
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

  <AandD />
    <div style={{height:'61px'}}></div>
    
   <Tabs className="swipeheadHome" inkBarStyle={{backgroundColor:'#FFEB3B'}} onChange={this.handleTabs} value={this.state.slideIndex}>
    <Tab label="睡眠" value={0}>

    </Tab>
    <Tab label="计步" value={1}>
    </Tab>
    <Tab label="跑步" value={2}>
    </Tab>
    <Tab label="骑行" value={3}>
    </Tab>

  </Tabs>



  <SwipeableViews

          index={this.state.slideIndex}
          onChangeIndex={this.handleTabs}
        >

      <SleepTab />

      <WalkTab />

      <RunTab />

      <RideTab />
</SwipeableViews>



</div>




    );
  }
});


export default MainContent;
