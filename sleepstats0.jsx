import React from 'react';

import ReactHighcharts from 'react-highcharts';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';


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
import Divider from 'material-ui/Divider';
import Chart from './myhighchart.jsx';
import DurationIcon from 'material-ui/svg-icons/image/timelapse';




var myDate = new Date();

var averages;

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

       tooltip:{
         pointFormat: '',
       },



       yAxis: {
          type: 'datetime',
          floor: 915192000000+3600*7*1000,
           ceiling: 915220800000+3600*9*1000,
           title: {
               text: '时间'
           },
           dateTimeLabelFormats: {
               day: '00:00'
           },
           min: 0,
           minorGridLineWidth: 1,
           gridLineWidth: 1,
           alternateGridColor: null,
           plotBands: [{ // Gentle breeze
               from: 915192000000+3600*7*1000,
               to: 915192000000+3600*10*1000,
              //  color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '过早睡眠',
                   style: {

                     "font-size":'15px',
                       "color": '#606060',
                       "margin-top":'17px',
                   }
               }
           }, { // Moderate breeze
               from: 915192000000+3600*10*1000,
               to: 915192000000+3600*13*1000,
              //  color: 'rgba(0, 0, 0, 0)',
               label: {
                   text: '正常睡眠',
                   style: {
                     "font-size":'15px',
                       "color": '#606060'
                   }
               }
           }, { // Fresh breeze
               from: 915192000000+3600*13*1000,
               to: 915220800000+3600*9*1000,
              //  color: 'rgba(68, 170, 213, 0.1
               label: {
                   text: '熬夜',
                   style: {
                     "font-size":'15px',
                       "color": '#606060'
                   }
               }
           }]
       },
       plotOptions: {
           spline: {
               lineWidth: 2,
               states: {
                   hover: {
                       lineWidth: 2
                   }
               },
               marker: {
                   enabled: false
               },
           }
       },
       series: [{
           name: '入睡曲线',
           data: [
                       [0, 1248825500000],
                       [0, 1248825600030],
                       [0, 1248825800100]
                   ]
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

       tooltip:{
         pointFormat: '',
       },



       yAxis: {
          type: 'datetime',
          floor: 915134400000+3600*6*1000,
           ceiling: 915156000000+3600*13*1000,
           title: {
               text: '时间'
           },
           dateTimeLabelFormats: {
               day: '00:00'
           },
           min: 0,
           minorGridLineWidth: 0,
           gridLineWidth: 0,
           alternateGridColor: null,
           plotBands: [{ // Gentle breeze
               from: 915134400000+3600*6*1000,
               to: 915134400000+3600*9*1000,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '过早起床',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Moderate breeze
               from: 915134400000+3600*9*1000,
               to: 915134400000+3600*12*1000,
               color: 'rgba(0, 0, 0, 0)',
               label: {
                   text: '正常起床',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Fresh breeze
               from: 915134400000+3600*12*1000,
               to: 915156000000+3600*13*1000,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '赖床',
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
           name: '起床曲线',
           data: [
                       [0, 1248825500000],
                       [0, 1248825600030],
                       [0, 1248825800100]
                   ]
       }, ]
}

var option3={
  chart: {
    height:150,
    width:300,
          type: 'spline'
      },
      title: {
          text: ''
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 0,
          backgroundColor:'#FFFFFF'
      },
          xAxis: {
          			visible:false,

              },
              yAxis: {
                 visible:false,
              },
              legend: {
                  enabled: false
              },
      tooltip: {
          shared: true,
          valueSuffix: ' units'
      },
      credits: {
          enabled: false
      },
      plotOptions: {
          spline: {
              fillOpacity: 0.5,
               marker: {
                  enabled: false,
                  symbol: 'circle',
                  radius: 1,
                  states: {
                      hover: {
                          enabled: true
                      }
                  }
              }
          }
      },
      series: [{
          name: 'John',
          data: [3.5,3,4,6,4,5,5,4,4.5]
      }]




}


const SleepTab = React.createClass({
  getInitialState(){
        return {
          sleeptime:"",
          getuptime:"",
          deepduration:"",
          lightduration:"",
          sleepdata:"",
          totalduration:"",
          date:"",
          qsleeptime:"",
          qgetuptime:"",
          qdeepduration:"",
          qlightduration:"",


        }
    },

    formatDate(strdate){
    var date=new Date(strdate);


    var year=date.getFullYear();
    var month=date.getMonth() + 1;
    var day=date.getDate();
    var strmonth="";
    var strday=""
    if(month<10){
      month="0"+month;
    }
    if(day<10){
      day="0"+day;
    }

    return year+"-"+month+"-"+day;

    },

    changeDate(event,date){
      var stddate=this.formatDate(date);

      this.setState({date: stddate});

      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request")
        return
      }
      var url="http://localhost:8888/fitbook/specificsleepgetter.php?ssid=";
      url+=getCookie("ssid");
      url+="&date=";
      url+=stddate;



      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();

            if(json.isava==0){
              that.setState({qsleeptime: "这一天没有数据"});
              return;
            }

            that.setState({qsleeptime: json.sleeptime});
            that.setState({qgetuptime: json.getuptime});
            that.setState({qdeepduration: json.deeptime});
            that.setState({qlightduration: json.lighttime});



        }
      };



      xmlHttp.open("GET",url,true);
      xmlHttp.send();




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
      var url="http://localhost:8888/fitbook/sleepdatagetter.php?ssid=";
      url+=getCookie("ssid");

      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();


          that.setState({sleeptime: json[0].sleepavgtime});
          that.setState({getuptime: json[1].getupavgtime});
          that.setState({totalduration: json[2].totalduration});


            let chart = that.refs.chart1.getChart();
            chart.series[0].setData(json[3]);

            let chartx = that.refs.chart2.getChart();
            chartx.series[0].setData(json[4]);


        }
      };



      xmlHttp.open("GET",url,true);
      xmlHttp.send();
    },

  render() {


    return (

      <div className="container">

        <div style={{height:'65px'}}></div>


        <h2>睡眠时长</h2>
        <div style={{height:'20px'}}></div>

      <Divider />


      <ReactHighstock config = {option1} ref="chart1"></ReactHighstock>

<div style={{width:'35%',display:'inline-block',height:'100px',marginTop:'60px'}}>

<div className="statssub1">7小时35分</div>
<div style={{display:'inline-block',float:'right',marginTop:'19px',marginRight:'45px',color:'#00ACC1'}}>
平均睡眠时间&nbsp;
  </div>

  </div>
<div style={{width:'4%',display:'inline-block'}}></div>
<div style={{width:'30%',display:'inline-block'}}>
  <div className="statssub1">23:09</div>
  <div style={{display:'inline-block',float:'right',marginTop:'19px',marginRight:'45px',color:'#00ACC1'}}>
  平均每晚入睡时刻&nbsp;
    </div>

</div>


<div style={{width:'30%',display:'inline-block'}}>
  <div className="statssub1">07:53</div>
  <div style={{display:'inline-block',float:'right',marginTop:'19px',marginRight:'45px',color:'#00ACC1',width:'110px'}}>
  平均起床时刻
    </div>
</div>



{/*
    <Card style={{marginTop:'25px'}}>
    <CardHeader
      title="起床统计"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}

    />
    <CardText>
      <ReactHighcharts config = {option2} ref="chart2"></ReactHighcharts>
    </CardText>
  </Card>

  */}







        </div>
    );

  }
});

export default SleepTab;
