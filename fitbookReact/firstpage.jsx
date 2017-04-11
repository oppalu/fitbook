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

import Divider from 'material-ui/Divider';
import LevelIcon from 'material-ui/svg-icons/action/grade';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';

import MyDrawer from './mydrawer.jsx';

import IndexSleepCard from './indexSleepCard.jsx';

import IndexWalkCard from './indexWalkCard.jsx';

import IndexRunCard from './indexRunCard.jsx';

import IndexRideCard from './indexRideCard.jsx';

import RankIcon from 'material-ui/svg-icons/editor/format-list-numbered';

import HotIcon from 'material-ui/svg-icons/social/whatshot';

import RankTab from './rankTab.jsx';

import Paper from 'material-ui/Paper';



const MainContent = React.createClass({
  getInitialState(){

        return {
            btntext:"null",
            slideIndex: 0,
            isSwiped:false,
            username:"",
        }
    },

    testajax() {

      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request")
        return
      }
      var url="http://127.0.0.1:80/fitbook/addsession.php?ssid=";
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

    doSwipe(){

      if(this.state.isSwiped==false){
        this.setState({isSwiped: true});
        swipeout(0);
      }else{
        this.setState({isSwiped: false});
        swipeout(1);
      }
    },

  render() {


    return (
<div>

  <AandD id="0" />
    <div style={{height:'30px'}}></div>




    {/*<MyDrawer activeItem="1" />*/}

  <div  className="testdiv">

    <div style={{display:'inline-block',width:'100%',height:'1100px'}}>
      <IndexSleepCard />
      <IndexWalkCard />
      <IndexRunCard />
      <IndexRideCard />
    </div>

    {/*<div style={{display:'inline-block',width:'26%',verticalAlign:'top',marginTop:'23px',marginLeft:'20px'}}>*/}

 {/*<Paper zDepth={1}>*/}
      {/*<Tabs onChange={this.handleTabs}*/}
          {/*value={this.state.slideIndex}>*/}
    {/*<Tab*/}
      {/*label="排名"*/}
      {/*icon={<RankIcon/>}*/}
      {/*value={0}*/}

    {/*/>*/}
    {/*<Tab*/}
      {/*icon={<HotIcon/>}*/}
      {/*label="热门"*/}
      {/*value={1}*/}
    {/*/>*/}
  {/*</Tabs>*/}

  {/*<SwipeableViews*/}
         {/*index={this.state.slideIndex}*/}
         {/*onChangeIndex={this.handleTabs}*/}
       {/*>*/}


       {/*<div>*/}

          {/*<RankTab />*/}

        {/*</div>*/}



        {/*<div >*/}
          {/*<RankTab />*/}
        {/*</div>*/}



  {/*</SwipeableViews>*/}
{/*</Paper>*/}

    {/*</div>*/}




  </div>


</div>




    );
  }
});


export default MainContent;
