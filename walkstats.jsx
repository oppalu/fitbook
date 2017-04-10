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
import ReactHighcharts from 'react-highcharts';

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
               text: '步数'
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
                   text: '宅',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Moderate breeze
               from: 2000,
               to: 8000,
               color: 'rgba(0, 0, 0, 0)',
               label: {
                   text: '正常',
                   style: {
                       color: '#606060'
                   }
               }
           }, { // Fresh breeze
               from: 8000,
               to: 12000,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                   text: '暴走',
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
           name: '步数',
           data: [4.3]
       }, ]
}






const WalkStat = React.createClass({
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
    componentDidMount: function() {
      this.initData();
    },
    initData(){
      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request")
        return
      }
      var url="http://localhost:8888/fitbook/walkdatagetter.php?ssid=";
      url+=getCookie("ssid");

      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();


          that.setState({avgstep: json[0].avgstep});
          that.setState({avgdistance: json[1].avgdistance});
          that.setState({avgcal: json[2].avgcal});


            let chart = that.refs.chart3.getChart();
            chart.series[0].setData(json[3]);
        }
      };



      xmlHttp.open("GET",url,true);
      xmlHttp.send();


    },
    changeDate(event,date){
      var stddate=this.formatDate(date);

      this.setState({date: stddate});

      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request")
        return
      }
      var url="http://localhost:8888/fitbook/specificwalkgetter.php?ssid=";
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
              that.setState({qstep: "这一天没有数据"});
              return;
            }

            that.setState({qstep: json.steps});
            that.setState({qduration: json.duration});
            that.setState({qdistance: json.distance});
            that.setState({qcal: json.cal});



        }
      };



      xmlHttp.open("GET",url,true);
      xmlHttp.send();




    },

  render() {


    return (

      <div className="container">
      <div className="row " style={{height:'500px'}}>

      <div className="eight columns" style={{marginTop:'25px'}}>

    <Card>
    <CardHeader
      title="计步统计"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}

    />
    <CardText>
      <ReactHighcharts config = {option1} ref="chart3"></ReactHighcharts>
    </CardText>
    </Card>


    <Card style={{marginTop:'25px'}}>
    <CardHeader
      title="历史计步数据"
      titleStyle={{fontSize:'27px',paddingLeft:'40px'}}
    >

    <DatePicker onChange={this.changeDate} hintText={myDate.toLocaleDateString()} style={{float:'right'}}/>

    </CardHeader>
    <CardText>
      <div style={{width:'100%',color:'#3cba54',fontSize:'20px'}}>
      <div style={{textAlign:'center',marginBottom:'15px'}}>
        <div >行走步数:&nbsp;{this.state.qstep}</div>

      </div>
      <div style={{textAlign:'center',marginBottom:'15px'}}>
        <div >行走距离:&nbsp;{this.state.qdistance}</div>

      </div>

      <div style={{textAlign:'center',marginBottom:'15px'}}>
      <div >活跃时间:&nbsp;{this.state.qduration}</div>

      </div>



      <div style={{textAlign:'center',marginBottom:'0px'}}>
      <div >消耗热量:&nbsp;{this.state.qcal}</div>

      </div>

      </div>
    </CardText>
    </Card>
      </div>

      <div className="four columns" style={{verticalAlign:'top',marginTop:'25px',}}>
        <RightPaper src="url(../assets/green.png)" title="平均每日计步" content={this.state.avgstep}/>

        <RightPaper src="url(../assets/purple.png)" title="平均计步距离" content={this.state.avgdistance}/>

        <RightPaper src="url(../assets/red.png)" title="平均每日消耗热量" content={this.state.avgcal}/>

      </div>
      </div>



        </div>
    );

  }
});

export default WalkStat;
