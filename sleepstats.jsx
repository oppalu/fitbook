import React from 'react';

import ReactHighcharts from 'react-highcharts';
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
           minorGridLineWidth: 0,
           gridLineWidth: 0,
           alternateGridColor: null,
           plotBands: [{ // Gentle breeze
               from: 915192000000+3600*7*1000,
               to: 915192000000+3600*10*1000,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '过早睡眠',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Moderate breeze
               from: 915192000000+3600*10*1000,
               to: 915192000000+3600*13*1000,
               color: 'rgba(0, 0, 0, 0)',
               label: {
                   text: '正常睡眠',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Fresh breeze
               from: 915192000000+3600*13*1000,
               to: 915220800000+3600*9*1000,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '熬夜',
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
      <div className="row " style={{height:'1700px'}}>

      <div className="eight columns" style={{marginTop:'25px'}}>

    <Card>
    <CardHeader
      title="入睡统计"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}

    />
    <CardText>
      <ReactHighcharts config = {option1} ref="chart1"></ReactHighcharts>
    </CardText>
    </Card>


    <Card style={{marginTop:'25px'}}>
    <CardHeader
      title="起床统计"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}

    />
    <CardText>
      <ReactHighcharts config = {option2} ref="chart2"></ReactHighcharts>
    </CardText>
    </Card>


    <Card style={{marginTop:'25px'}}>
    <CardHeader
      title="一次睡眠分析"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}
    >

    <DatePicker onChange={this.changeDate} hintText={myDate.toLocaleDateString()} style={{float:'right'}}/>

    </CardHeader>
    <CardText>
    <div style={{width:'100%',color:'#487bf0',fontSize:'20px'}}>
        <div style={{textAlign:'center',marginBottom:'15px'}}>
          <div >入睡时间:&nbsp;{this.state.qsleeptime}</div>

        </div>

        <div style={{textAlign:'center',marginBottom:'15px'}}>
        <div >起床时间:&nbsp;{this.state.qgetuptime}</div>

        </div>



        <div style={{textAlign:'center',marginBottom:'15px'}}>
        <div >深睡眠时长:&nbsp;{this.state.qdeepduration}</div>

        </div>

        <div style={{textAlign:'center',marginBottom:'0px'}}>
        <div >浅睡眠时长:&nbsp;{this.state.qlightduration}</div>

        </div>

    </div>
    </CardText>
    </Card>
      </div>

      <div className="four columns" style={{verticalAlign:'top',marginTop:'25px',}}>
        <RightPaper src="url(../assets/green.png)" title="平均入睡时间" content={this.state.sleeptime}/>

        <RightPaper src="url(../assets/purple.png)" title="平均起床时间" content={this.state.getuptime}/>

        <RightPaper src="url(../assets/red.png)" title="平均睡眠时间" content={this.state.totalduration}/>

      </div>

      </div>





        </div>
    );

  }
});

export default SleepTab;
