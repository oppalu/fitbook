import React from 'react';
import AandD from './appbaranddrawer.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import SleepStats from './sleepstats0.jsx';
import WalkStats from './walkstats.jsx';
import RunStats from './runstats.jsx';
import RideStats from './ridestats.jsx';
import MyDrawer from './mydrawer.jsx';


const Stat = React.createClass({
  getInitialState(){
        return {
            slideIndex: this.props.page,
        }
    },
    handleTabs(value){
      this.setState({slideIndex: value});
    },

  render() {


    return (
        <div>
        <AandD id="3"/>
        <div style={{height:'77px'}}></div>



        <div style={{backgroundColor:"#00ACC1",height:"50px",width:'100%',position:'fixed',zIndex:'9999'}}>
            <Tabs tabItemContainerStyle={{backgroundColor:'#00ACC1'}} className="swipeheadHome" style={{ width:"60%",marginLeft:"20%",marginBottom:"0px"}} inkBarStyle={{backgroundColor:'#FFEB3B'}} onChange={this.handleTabs} value={this.state.slideIndex}>
                <Tab label="睡眠" style={{height:"50px",fontSize:"16px",marginBottom:"-5px"}} value={0}>

                </Tab>
                <Tab label="计步" style={{height:"50px",fontSize:"16px"}} value={1}>
                </Tab>
                <Tab label="跑步" style={{height:"50px",fontSize:"16px"}} value={2}>
                </Tab>
                <Tab label="骑行" style={{height:"50px",fontSize:"16px"}} value={3}>
                </Tab>

            </Tabs>
        </div>



      <SwipeableViews
              index={this.state.slideIndex}
              onChangeIndex={this.handleTabs}
            >


            <SleepStats />
            <WalkStats />
            <RunStats/>
            <RideStats/>


    </SwipeableViews>


        </div>
    );
  }
});

export default Stat;
