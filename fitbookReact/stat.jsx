import React from 'react';
import AandD from './appbaranddrawer.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import SleepStats from './sleepstats.jsx';
import WalkStats from './walkstats.jsx';
import RunStats from './runstats.jsx';
import RideStats from './ridestats.jsx';

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
