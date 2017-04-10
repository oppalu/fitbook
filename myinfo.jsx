import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';


import Avatar from 'material-ui/Avatar';

import Cover from './cover.jsx';
import CoverRight from './coverright.jsx';
import AandD from './appbaranddrawer.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


import MapIcon from 'material-ui/svg-icons/maps/add-location';

import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import MapDIV from './mapDIV.jsx';



function isInteger(str) {
  if(/^\d+$/.test(str))
 {
     return 1;
 }  else {
   return 0;
 }
}


const MyInfo = React.createClass({
  getInitialState(){
    return{
      username: this.props.username,
      isPopOpen:false,
      isNewChallengeOpen:false,
      dropdownvalue:1,
      isNewGroupOpen:false,
      isNewActivityOpen:false,
      circledisplayinfo:"none",
      startdate:"",
      starttime:"",
      enddate:"",
      endtime:"",
      isatychallenge:false,
      atyerrormsg:"",
      maxexp:0,
      isMapOpen:false,
      mapaddress:"地点",


    }
  },
  handleChangeChallenge(){
    if(this.state.isatychallenge==false){
      this.setState({isatychallenge: true});
    }else{
      this.setState({isatychallenge: false});
    }

  },
  handleNewChallengeOpen(){
    this.setState({isNewChallengeOpen: true});
  },
  handleNewChallengeClose(){
    this.setState({isNewChallengeOpen: false});
  },
  handleDropDownChange(event, index, value){
    this.setState({dropdownvalue: value});
  },
  handleNewGroupOpen(){
    this.setState({isNewGroupOpen: true});
  },
  handleNewGroupClose(){
    this.setState({isNewGroupOpen: false});
  },
  handleNewActivityOpen(){
    this.setState({isNewActivityOpen: true});
  },
  handleNewActivityClose(){
    this.setState({isNewActivityOpen: false});
  },
  changeStartDate(event,date){
    var stddate=this.formatDate(date);

    this.setState({startdate: stddate});
  },
  changeEndDate(event,date){
    var stddate=this.formatDate(date);
    this.setState({enddate: stddate});
  },
  changeStartTime(event,date){
    var stddate=this.formatTime(date);

    this.setState({starttime: stddate});
  },
  changeEndTime(event,date){
      var stddate=this.formatTime(date);
      this.setState({endtime: stddate});
  },
  handleMapOpen(){

    this.setState({isMapOpen: true});
  },
  handleMapClose(){
    this.setState({isMapOpen: false});
  },

  handleMapConfirm(){
    var addinfo=this.refs.addinfo.getValue();

    var maddress=document.getElementById("mapaddress").innerText;

    var res=maddress+" "+addinfo;

this.setState({mapaddress: ""});
this.refs.atylocation.getInputNode().value = res;


    this.setState({isMapOpen: false});
  },
  formatTime(strdate){

  var date=new Date(strdate);
  return date.toTimeString().substring(0,5);
  },
  formatDate(strdate){

  var date=new Date(strdate);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  },

  addaty(){
    var name=this.refs.atyname.getValue();
    var intro=this.refs.atyintro.getValue();
    var location=this.refs.atylocation.getValue();
    var coin=this.refs.atycoin.getValue();
    var startdate= this.state.startdate;
    var starttime=this.state.starttime;
    var endtime=this.state.endtime;
    var enddate=this.state.enddate;






    if(name==""){
      this.setState({atyerrormsg: "活动名不能为空"});
      return;
    }
    if(intro==""){
      this.setState({atyerrormsg: "简介不能为空"});
        return;
    }
    if(location==""){
      this.setState({atyerrormsg: "地点不能为空"});
        return;
    }
    if(coin==""){
      this.setState({atyerrormsg: "奖励经验不能为空"});
        return;
    }
    if(startdate==""){
      this.setState({atyerrormsg: "开始日期不能为空"});
        return;
    }

    //
    if(starttime==""){
      this.setState({atyerrormsg: "开始时间不能为空"});
        return;
    }
    if(enddate==""){
      this.setState({atyerrormsg: "结束日期不能为空"});
        return;
    }
    if(endtime==""){
      this.setState({atyerrormsg: "结束时间不能为空"});
        return;
    }

    if(coin>this.state.maxexp){
      var msg="根据当前的等级，最多可以设置:";
      msg+=this.state.maxexp;
      msg+="经验值";
      this.setState({atyerrormsg: msg});
        return;
    }

    var startdatetime="";
    var enddatetime="";

    var mystartdate=startdate.split("-");
    var newstartdate=mystartdate[0]+"/"+mystartdate[1]+"/"+mystartdate[2];
    newstartdate+=" ";
    newstartdate+=starttime;
    newstartdate+=":00";


    var myenddate=enddate.split("-");
    var newenddate=myenddate[0]+"/"+myenddate[1]+"/"+myenddate[2];
    newenddate+=" ";
    newenddate+=endtime;
    newenddate+=":00";



    var startstamp=new Date(newstartdate).getTime();
    var endstamp=new Date(newenddate).getTime();


    if(startstamp>=endstamp){
      this.setState({atyerrormsg: "开始时间不能晚于结束时间"});
      return;
    }

    if(!isInteger(coin)){
      this.setState({atyerrormsg: "奖励经验必须是正整数"});
      return;
    }

    this.setState({atyerrormsg: ""});

    var type="";

    if(this.state.dropdownvalue==1){
      type="计步";
    }else if (this.state.dropdownvalue==2) {
      type="跑步";
    }else if(this.state.dropdownvalue==3){
      type="骑行";
    }

    var challengeid="";
    if(this.state.isatychallenge){
      challengeid="0";
    }else{
      challengeid="-1";
    }

    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }

    var pstarttime=startdate+" "+starttime;
    var pendtime=enddate+" "+endtime;
    var url="http://localhost:8888/fitbook/atycreator.php?ssid=";
    url+=getCookie("ssid");
    url+="&coin=";
    url+=coin;
    url+="&title=";
    url+=name;
    url+="&intro=";
    url+=intro;
    url+="&location=";
    url+=location;
    url+="&starttime=";
    url+=pstarttime;
    url+="&endtime=";
    url+=pendtime;
    url+="&type=";
    url+=type;
    url+="&challangename=";
    url+=challengeid;




    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();

        if(json.issucc==0){
          alert("创建失败，请检查网路");
        }else {
          var url="http://localhost:8080/#/atyinfo/";
          url+=json.atyid;
          that.setState({isNewActivityOpen: false});

          window.location.href=url;

        }


      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();

  },
  componentDidMount: function() {
      this.initData();


  },

  initData(){
    if(this.state.needrefresh==1){

      this.setState({needrefresh: 0});
    }
    if(this.state.needrefresh==0){

      return;
    }

    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://localhost:8888/fitbook/namechecker.php?ssid=";
    url+=getCookie("ssid");
    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();
        var realname=json.username;

        // alert(that.state.username);
        if(realname==that.state.username){
          that.setState({circledisplayinfo: ""});
        }

        that.setState({maxexp: json.maxexp});


      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();
  },


  render() {
    const challengeactions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleNewChallengeClose}
      />,
      <FlatButton
        label="发布"
        primary={true}
        onTouchTap={this.handleNewChallengeClose}
      />,
    ];
    const groupactions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleNewGroupClose}
      />,
      <FlatButton
        label="添加"
        primary={true}
        onTouchTap={this.handleNewGroupClose}
      />,
    ];
    const atyactions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleNewActivityClose}
      />,
      <FlatButton
        label="添加"
        primary={true}
        onTouchTap={this.addaty}
      />,
    ];


    const mapactions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleMapClose}
      />,
      <FlatButton
        label="确定"
        primary={true}
        onTouchTap={this.handleMapConfirm}
      />,
    ];

    return (
      <div>
      <div id="fixedbutton" style={{display:this.state.circledisplayinfo}}>


      <IconMenu
            iconButtonElement={<FloatingActionButton>
              <ContentAdd />
            </FloatingActionButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
          >

            <MenuItem primaryText="添加新的活动" onTouchTap={this.handleNewActivityOpen}/>
            <MenuItem primaryText="添加新的群组" onTouchTap={this.handleNewGroupOpen}/>
          </IconMenu>

      </div>
          <AandD id="2" />

<div className="wholecover" >
         <Cover username={this.state.username} infoStatus="right1"/>
</div>
<div className="rightcover">
         <CoverRight username={this.state.username}/>
</div>




  <Dialog
      title="添加新的群组"
      actions={groupactions}
      modal={true}
      open={this.state.isNewGroupOpen}
      contentStyle={{width:'350px'}}
  >
  <TextField
    floatingLabelText="群组名称"
  /><br/>
  <TextField
    floatingLabelText="简介"
  /><br/>
  <TextField
    floatingLabelText="地点"
  /><br/>



  </Dialog>


  <Dialog
      title="添加新的活动"
      actions={atyactions}
      modal={true}
      open={this.state.isNewActivityOpen}
      contentStyle={{width:'350px'}}
      autoScrollBodyContent={true}
  >
  <TextField ref="atyname" floatingLabelText="活动名称"
  /><br/>
  <TextField ref="atyintro" floatingLabelText="简介" /><br/>



  <TextField ref="atylocation" hintText={this.state.mapaddress}
  /><div onTouchTap={this.handleMapOpen} style={{cursor:'pointer',verticalAlign:'bottom',display:'inline-block',marginLeft:'15px'}} ><MapIcon color="#00c1d7" /></div><br/>




  <span>选择一项运动:</span>
  <DropDownMenu value={this.state.dropdownvalue} onChange={this.handleDropDownChange}>
          <MenuItem value={1} primaryText="计步" />
          <MenuItem value={2} primaryText="跑步" />
          <MenuItem value={3} primaryText="骑行" />
  </DropDownMenu>
        <br />

        <TextField ref="atycoin" floatingLabelText="竞赛奖励经验值"
          style={{width:'150px'}}
        />




        <br/>
        <div>
          <div style={{width:'100px',display:'inline-block'}}>
          <DatePicker onChange={this.changeStartDate} hintText="开始日期"  textFieldStyle={{width:'100px'}}/>
          </div>
          <div style={{display:'inline-block',float:'right'}}>
          <TimePicker onChange={this.changeStartTime} hintText="开始时间" format="24hr" textFieldStyle={{width:'100px'}}/>
          </div>
        </div>

        <div>
          <div style={{width:'100px',display:'inline-block'}}>
          <DatePicker onChange={this.changeEndDate} hintText="结束日期" textFieldStyle={{width:'100px'}}/>
          </div>
          <div style={{display:'inline-block',float:'right'}}>
          <TimePicker onChange={this.changeEndTime} hintText="结束时间" format="24hr" textFieldStyle={{width:'100px'}}/>
          </div>
        </div>


        <Checkbox
        label="双人挑战模式"
        onCheck={this.handleChangeChallenge}
        style={{marginTop:'10px',display:'inline-block'}}

        />

        <div>{this.state.atyerrormsg}</div>



  </Dialog>



  <Dialog
      title={<div>选择地点:<span id="mapaddress"></span></div>}
      actions={mapactions}
      modal={true}
      open={this.state.isMapOpen}
      contentStyle={{width:'750px'}}
      autoScrollBodyContent={false}
  >

<MapDIV />

<h5 style={{display:'inline-block',marginRight:'10px'}}>附加描述</h5>
  <TextField ref="addinfo" floatingLabelText="可以填写熟知的地址和标志性建筑" /><br/>

  </Dialog>





         </div>
    );
  }
});

export default MyInfo;
