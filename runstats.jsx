import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SocialIcon from 'material-ui/svg-icons/social/share';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import FirstIcon from 'material-ui/svg-icons/image/filter-1';
import SecIcon from 'material-ui/svg-icons/image/filter-2';
import ThirdIcon from 'material-ui/svg-icons/image/filter-3';
import DatePicker from 'material-ui/DatePicker';
import RightPaper from './rightpaper.jsx';

import Chart from './myhighchart.jsx'
var myDate = new Date();

var option1={
  chart: {
           type: 'spline'
       },
       title: {
           text: ''
       },
       subtitle: {
           text: ''
       },
       xAxis: {
           type: 'datetime',
           labels: {
               overflow: 'justify'
           }
       },
       yAxis: {
           title: {
               text: '距离'
           },
           min: 0,
           minorGridLineWidth: 0,
           gridLineWidth: 0,
           alternateGridColor: null,
           plotBands: [{ // Gentle breeze
               from: 0,
               to: 2000,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '小跑',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Moderate breeze
               from: 2000,
               to: 8000,
               color: 'rgba(0, 0, 0, 0)',
               label: {
                   text: '长跑',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Fresh breeze
               from: 8000,
               to: 12000,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '马拉松',
                   style: {
                       color: '#606060'
                   }
               }
           }]
       },
       plotOptions: {
           spline: {
               lineWidth: 2,
               states: {
                   hover: {
                       lineWidth: 3
                   }
               },
               marker: {
                   enabled: false
               },
           }
       },
       series: [{
           name: '距离',
           data: [4.3]
       }, ]
}



var option2={
  chart: {
           type: 'spline'
       },
       title: {
           text: ''
       },
       subtitle: {
           text: ''
       },
       xAxis: {
           type: 'datetime',
           labels: {
               overflow: 'justify'
           }
       },
       yAxis: {
           title: {
               text: '时间(分钟)'
           },
           min: 0,
           minorGridLineWidth: 0,
           gridLineWidth: 0,
           alternateGridColor: null,
           plotBands: [{ // Gentle breeze
               from: 0,
               to: 2000,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '锻炼不足',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Moderate breeze
               from: 2000,
               to: 8000,
               color: 'rgba(0, 0, 0, 0)',
               label: {
                   text: '适当锻炼',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Fresh breeze
               from: 8000,
               to: 12000,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '锻炼过度',
                   style: {
                       color: '#606060'
                   }
               }
           }]
       },
       plotOptions: {
           spline: {
               lineWidth: 2,
               states: {
                   hover: {
                       lineWidth: 3
                   }
               },
               marker: {
                   enabled: false
               },
           }
       },
       series: [{
           name: '时间(分钟)',
           data: [4.3]
       }, ]
}



const SleepTab = React.createClass({

  getInitialState(){
        return {
          avgstep:"",
          avgdistance:"",
          avgcal:"",
          qstep:"",
          qdistance:"",
          qduration:"",
          qcal:"",
          date:"",



        }
    },

  render() {


    return (

      <div className="container">
      <div className="row " style={{height:'500px'}}>

      <div className="eight columns" style={{marginTop:'25px'}}>
    <Card>
    <CardHeader
      title="距离统计"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}

    />
    <CardText>
      <div id="chart31"></div>
    </CardText>
    </Card>


    <Card style={{marginTop:'25px'}}>
    <CardHeader
      title="时间统计"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}

    />
    <CardText>
      <div id="chart32"></div>
    </CardText>
    </Card>


    <Card style={{marginTop:'25px'}}>
    <CardHeader
      title="历史跑步数据"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}
    >

    <DatePicker hintText={myDate.toLocaleDateString()} style={{float:'right'}}/>

    </CardHeader>
    <CardText>
    <div style={{width:'100%',color:'#EF6C00',fontSize:'20px'}}>
    <div style={{textAlign:'center',marginBottom:'15px'}}>
      <div >耗时:&nbsp;20min45s</div>

    </div>

    <div style={{textAlign:'center',marginBottom:'15px'}}>
    <div >平均速度:&nbsp;4km/h</div>

    </div>



    <div style={{textAlign:'center',marginBottom:'15px'}}>
    <div >最大速度:&nbsp;13.02km/h</div>

    </div>

    <div style={{textAlign:'center',marginBottom:'0px'}}>
    <div >消耗热量:&nbsp;1245kCal</div>

    </div>

    </div>

    </CardText>
    </Card>
      </div>

      <div className="four columns" style={{verticalAlign:'top',marginTop:'25px',}}>
        <RightPaper src="url(../assets/green.png)" title="平均每日跑步时间" content="15min42s"/>

        <RightPaper src="url(../assets/purple.png)" title="平均速度" content="5km/h"/>

        <RightPaper src="url(../assets/red.png)" title="平均每日消耗热量" content="1200kCal"/>

      </div>

      </div>




      <Chart container={'chart31'} options={option1}/>
      <Chart container={'chart32'} options={option2}/>

        </div>
    );

  }
});

export default SleepTab;
