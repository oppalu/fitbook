

import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SendIcon from 'material-ui/svg-icons/content/send';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

function isInteger(str) {
  if(/^\d+$/.test(str))
 {
     return 1;
 }  else {
   return 0;
 }
}

const Cover = React.createClass({
  getInitialState(){
    return{
      atyid:this.props.atyid,
      isDialogShow:false,
      isSnackerOpen:false,
      dropdownvalue:1,
      isDelDiaShow:false,
      title:"",
      location:"",
      type:"",
      coin:"",
      realstarttime:"",
      realendtime:"",
      atystate:"",
      leaderdisplay:"none",
      adddisplay:"none",
      quitdisplay:"none",
      coverlink:"",
      maincolor:"",
      intro:"",
      atyerrormsg:"",
      startdate:"",
      starttime:"",
      enddate:"",
      endtime:"",
      isExitDiaShow:false,




    }
  },
  handleInOrOut(isin){
    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }

    var url="http://localhost:8888/fitbook/atyinandout.php?ssid=";
    url+=getCookie("ssid");
    url+="&atyid=";
    url+=this.state.atyid;
    url+="&reply=";
    url+=isin;



    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        if(xmlHttp.responseText==1){

          that.handleExitDiaClose();
          location.reload();
        }else{
          alert("操作失败，请检查网络");
        }
      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();

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
  formatTime(strdate){

  var date=new Date(strdate);
  return date.toTimeString().substring(0,5);
  },
  formatDate(strdate){

  var date=new Date(strdate);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  },


  atychange(){
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

    var type=0;

    if(this.state.dropdownvalue==1){
      type="计步";
    }else if (this.state.dropdownvalue==2) {
      type="跑步";
    }else if(this.state.dropdownvalue==3){
      type="骑行";
    }

    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }

    var pstarttime=startdate+" "+starttime;
    var pendtime=enddate+" "+endtime;
    var url="http://localhost:8888/fitbook/atychanger.php?ssid=";
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
    url+="&atyid=";
    url+=this.state.atyid;




    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();

        if(json.issucc==0){
          alert("修改失败，请检查网路");
        }else {
          that.setState({isDialogShow: false});

          that.initData();

        }


      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();

  },

  handleModifyClose(){
    this.setState({isDialogShow: false});
  },
  handleModify(){
    this.setState({isDialogShow: true});
  },
  handleSnackerOpen(){
    this.setState({isSnackerOpen: true});
  },
  handleSnackerClose(){
    this.setState({isSnackerOpen: false});
  },
  handleDropDownChange(event, index, value){
    this.setState({dropdownvalue: value});
  },
  handleDelete(){
    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://localhost:8888/fitbook/atydeleter.php?atyid=";
    url+=this.state.atyid;
    url+="&ssid=";
    url+=getCookie("ssid");

    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();
        if(json.issucc==0){
            alert("删除失败，请检查网络");
        }else {
          var infourl="http://localhost:8080/#/myinfo/";
          infourl+=json.username;
          that.setState({isDelDiaShow:false});
          window.location.href=infourl;

        }
      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();





  },
  handleDelDiaOpen(){
    this.setState({isDelDiaShow:true});
  },
  handleDelDiaClose(){
    this.setState({isDelDiaShow:false});
  },
  handleExitDiaOpen(){
    this.setState({isExitDiaShow:true});
  },
  handleExitDiaClose(){
    this.setState({isExitDiaShow:false});
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
    var url="http://localhost:8888/fitbook/atyinfogetter.php?atyid=";
    url+=this.state.atyid;
    url+="&ssid=";
    url+=getCookie("ssid");

    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();

        if(json.isava==0){
          that.setState({title: "出错啦"});
        }else{

            that.setState({coverlink: json.coverlink});

            that.setState({maincolor: json.maincolor});

          if(json.isleader==1){
            that.setState({leaderdisplay: ""});
            that.setState({adddisplay: "none"});
            that.setState({quitdisplay: "none"});
          }else {
            if(json.isjoin==1){
              that.setState({leaderdisplay: "none"});
              that.setState({adddisplay: "none"});
              that.setState({quitdisplay: ""});
            }else{
              that.setState({leaderdisplay: "none"});
              that.setState({adddisplay: ""});
              that.setState({quitdisplay: "none"});

            }
          }


          that.setState({title: json.title});
          that.setState({location: json.location});
          that.setState({type: json.type});
          that.setState({coin: json.coin});
          that.setState({realstarttime: json.starttime});
          that.setState({realendtime: json.endtime});
          that.setState({atystate: json.state});
          that.setState({intro: json.intro});

        }



      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();
  },

  render() {
    const atyactions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleModifyClose}
      />,
      <FlatButton
        label="确认修改"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.atychange}
      />,
    ];
    const delactions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleDelDiaClose}
      />,
      <FlatButton
        label="删除"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDelete}
      />,
    ];
    const exitactions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleExitDiaClose}
      />,
      <FlatButton
        label="退出"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleInOrOut.bind(this,0)}
      />,
    ];

    return (

      <div >
        <div id="coverforaty" style={{backgroundImage:"url("+this.state.coverlink+")"}}>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon color={'white'}/></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            style={{float:'right',display:this.state.leaderdisplay}}
            >
              <MenuItem primaryText="修改活动资料" onTouchTap={this.handleModify}/>
              <MenuItem primaryText="删除" onTouchTap={this.handleDelDiaOpen}/>

          </IconMenu>
        </div>


        <div id="belowcoverforaty" style={{backgroundColor:this.state.maincolor}}>
          <div style={{fontSize:'30px',marginLeft:'20px',paddingTop:'40px',fontWeight:'600'}}>{this.state.title}</div>
          <div className="groupintro">{this.state.intro}</div>
          <div className="groupintrosub">地点: {this.state.location}</div>
          <div className="groupintrosub">方式: {this.state.type}</div>
          <div className="groupintrosub">奖励经验: {this.state.coin}</div>
          <div className="groupintrosub">活动开始时间: {this.state.realstarttime}</div>
          <div className="groupintrosub">活动结束时间: {this.state.realendtime}</div>
          <div className="groupintrosub">状态: {this.state.atystate}</div>







          <RaisedButton
            label="加入活动"
            labelStyle={{fontWeight:'600',color:'#5186bc'}}
            style={{marginLeft:'20px',width:'100px',marginTop:'20px',display:this.state.adddisplay}}
            onTouchTap={this.handleInOrOut.bind(this,1)}
          />

          <RaisedButton
            label="退出活动"
            labelStyle={{fontWeight:'600',color:'#5186bc'}}
            style={{marginLeft:'20px',width:'100px',marginTop:'20px',display:this.state.quitdisplay}}
            onTouchTap={this.handleExitDiaOpen}
          />

          <Snackbar
          open={this.state.isSnackerOpen}
          message={<div><SendIcon color={'white'} style={{paddingTop:'13px'}}/><span style={{float:'right'}}>请求已发送</span></div>}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackerClose}
        />
        </div>




        <Dialog
            title="修改活动"
            actions={atyactions}
            modal={true}
            open={this.state.isDialogShow}
            contentStyle={{width:'350px'}}
            autoScrollBodyContent={true}
        >
        <TextField ref="atyname" floatingLabelText="活动名称" /><br/>
        <TextField ref="atyintro" floatingLabelText="简介"/><br/>
        <TextField ref="atylocation" floatingLabelText="地点"/><br/>

        <span>选择一项运动:</span>
        <DropDownMenu value={this.state.dropdownvalue} onChange={this.handleDropDownChange}>
                <MenuItem value={1} primaryText="计步" />
                <MenuItem value={2} primaryText="跑步" />
                <MenuItem value={3} primaryText="骑行" />
        </DropDownMenu>
              <br />

              <span>奖励经验:&nbsp;</span>
              <TextField ref="atycoin" floatingLabelText="金币数" style={{width:'150px'}} /><br/>
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

              <div>{this.state.atyerrormsg}</div>

        </Dialog>


        <Dialog
            title="删除该活动?"
            actions={delactions}
            modal={true}
            open={this.state.isDelDiaShow}
            contentStyle={{width:'100%'}}
        >

        </Dialog>

        <Dialog
            title="退出该活动?"
            actions={exitactions}
            modal={true}
            open={this.state.isExitDiaShow}
            contentStyle={{width:'100%'}}
        ></Dialog>





      </div>
    );
  }
});

export default Cover;
