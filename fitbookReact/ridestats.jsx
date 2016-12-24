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
               to: 5.5,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '短距离',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Moderate breeze
               from: 5.5,
               to: 8,
               color: 'rgba(0, 0, 0, 0)',
               label: {
                   text: '中距离',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Fresh breeze
               from: 8,
               to: 15,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '长途',
                   style: {
                       color: '#606060'
                   }
               }
           }]
       },
       plotOptions: {
           spline: {
               lineWidth: 3,
               states: {
                   hover: {
                       lineWidth: 4
                   }
               },
               marker: {
                   enabled: false
               },
               pointInterval: 3600000*24, // one hour
               pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
           }
       },
       series: [{
           name: '距离曲线',
           data: [4.3, 5.1, 4.3, 5.2, 5.4, 4.7, 3.5, 4.1, 5.6, 7.4, 6.9, 7.1,
                  7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4,
                  8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5,
                  7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3, 4.4, 4.2,
                  3.0, 3.0]
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
               text: '时间'
           },
           min: 0,
           minorGridLineWidth: 0,
           gridLineWidth: 0,
           alternateGridColor: null,
           plotBands: [{ // Gentle breeze
               from: 0,
               to: 1,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '锻炼过短',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Moderate breeze
               from: 1,
               to: 3,
               color: 'rgba(0, 0, 0, 0)',
               label: {
                   text: '适当锻炼',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Fresh breeze
               from: 3,
               to: 6,
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
               lineWidth: 3,
               states: {
                   hover: {
                       lineWidth: 4
                   }
               },
               marker: {
                   enabled: false
               },
               pointInterval: 3600000*24, // one hour
               pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
           }
       },
       series: [{
           name: '时间曲线',
           data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 0.3, 0.0,
                   0.0, 0.4, 0.0, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                   0.0, 0.6, 1.2, 1.7, 0.7, 2.9, 4.1, 2.6, 3.7, 3.9, 1.7, 2.3,
                   3.0, 3.3, 4.8, 5.0, 4.8, 5.0, 3.2, 2.0, 0.9, 0.4, 0.3, 0.5, 0.4]
       }, ]

}



const SleepTab = React.createClass({

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
      <div id="chart41"></div>
    </CardText>
    </Card>


    <Card style={{marginTop:'25px'}}>
    <CardHeader
      title="时间统计"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}

    />
    <CardText>
      <div id="chart42"></div>
    </CardText>
    </Card>


    <Card style={{marginTop:'25px'}}>
    <CardHeader
      title="历史骑行数据"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}
    >

    <DatePicker hintText={myDate.toLocaleDateString()} style={{float:'right'}}/>

    </CardHeader>
    <CardText>
    <div style={{width:'100%',color:'#795548',fontSize:'20px'}}>
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
        <RightPaper src="url(../assets/green.png)" title="平均每日骑行时间" content="15min42s"/>

        <RightPaper src="url(../assets/purple.png)" title="平均速度" content="5km/h"/>

        <RightPaper src="url(../assets/red.png)" title="平均每日消耗热量" content="1200kCal"/>

      </div>
      </div>





      <Chart container={'chart41'} options={option1}/>
      <Chart container={'chart42'} options={option2}/>

        </div>
    );

  }
});

export default SleepTab;
