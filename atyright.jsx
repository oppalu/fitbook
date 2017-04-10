import React from 'react';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FriendIcon from 'material-ui/svg-icons/action/face';
import GroupIcon from 'material-ui/svg-icons/social/people';
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import GeneralPaper from './generalpaper.jsx'
import AddPaper from './addpaper.jsx'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import SendIcon from 'material-ui/svg-icons/content/send';
import Snackbar from 'material-ui/Snackbar';

import { Link } from 'react-router';
   

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function arrContains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}



const GroupRight = React.createClass({
  getInitialState(){
    return{
      dropvalue:1,
      isDialogShow:false,
      atyid:this.props.atyid,
      userobj:"",
      adddisplay:"inline-block",
      inviteArr:"",

      candidateobj:"",

      challangeinfo:"",
      addtitle:"添加新成员",
      isSnackerOpen:false,



    }
  },
  handleSnackerOpen(){
    this.setState({isSnackerOpen: true});
  },
  handleSnackerClose(){
    this.setState({isSnackerOpen: false});
  },

  invite(){
    var list=this.state.inviteArr.toString();

    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://localhost:8888/fitbook/atyinviter.php?ssid=";
    url+=getCookie("ssid");
    url+="&atyid=";
    url+=this.state.atyid;
    url+="&list=";
    url+=list;

    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){

      if(xmlHttp.responseText=="1"){
        that.setState({isDialogShow: false});
        that.handleSnackerOpen();
      }else{
        alert("邀请失败，请检查网络");
      }

      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();

  },


  handleCheck(username){
    if(arrContains(this.state.inviteArr, username)){
      removeA(this.state.inviteArr, username);
    }else{
      this.state.inviteArr.push(username);
    }

  },
  handleDropDownChange(event, index, value){
    this.setState({dropvalue: value});
  },
  handleDialogOpen(){
    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://localhost:8888/fitbook/atycandidate.php?ssid=";
    url+=getCookie("ssid");
    url+="&atyid=";
    url+=this.state.atyid;

    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var rows = [];
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();
        if(json.length<=0){
          rows.push(<div>好友都在活动里了</div>);
        }else{
          for(var i=0;i<json.length;i++){
            rows.push( <ListItem
              leftCheckbox={<Checkbox onCheck={that.handleCheck.bind(that,json[i].username)}/>}
              primaryText={json[i].username}
              rightAvatar={<Avatar src={json[i].avatarlink} />}
            />);
          }
        }

        that.setState({candidateobj: rows});
        that.setState({isDialogShow: true});
      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();


  },
  handleDialogClose(){
    this.setState({isDialogShow: false});
  },
  componentDidMount: function() {
      this.state.inviteArr=new Array();
      this.initData();
  },
  initData(){

    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://localhost:8888/fitbook/atyrightgetter.php?ssid=";
    url+=getCookie("ssid");
    url+="&atyid=";
    url+=this.state.atyid;

    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var rows = [];
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();


        if(json[0].isthismanleader==1){
          that.setState({adddisplay: "inline-block"});
        }else{
          that.setState({adddisplay: "none"});
        }

        if(json[1].isthismanleader=="-1"){
          that.setState({challangeinfo:"-1"});
        }else{
          if(json[1].isthismanleader=="0"){
              that.setState({challangeinfo:"0"});
              that.setState({addtitle:"选择挑战对象"});

          }else{
              that.setState({challangeinfo: json[1].isthismanleader});
              that.setState({adddisplay:"none"});
          }


        }


        for(var i=2;i<json.length;i++){
          var path='/myinfo/'+json[i].username;

          if(json[i].isleader==1){
            rows.push( <Link to={{ pathname: path }} style={{ textDecoration: 'none' }} > <GeneralPaper src={json[i].coverlink} content={json[i].username+"  (管理者)"} /></Link>);
          }else{
            rows.push( <Link to={{ pathname: path }} style={{ textDecoration: 'none' }} > <GeneralPaper src={json[i].coverlink} content={json[i].username} /></Link>);
          }
        }

        that.setState({userobj: rows});




      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();
  },

  render() {
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="添加"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.invite}
      />,
    ];

    return (

      <div className="rightwidth">
      <div className="quanzi">成员</div>



      <div onTouchTap={this.handleDialogOpen} style={{display:this.state.adddisplay}}><AddPaper content={this.state.addtitle}  /></div>

      {this.state.userobj}


          <Dialog
                title="添加新成员"
                actions={actions}
                modal={true}
                open={this.state.isDialogShow}
                onRequestClose={this.handleDialogClose}
                contentStyle={{maxWidth: '350px'}}
                autoScrollBodyContent={true}
              >
              <List>
        <Subheader>我的好友</Subheader>


        {this.state.candidateobj}

      </List>

          </Dialog>


          <Snackbar
          open={this.state.isSnackerOpen}
          message={<div><SendIcon color={'white'} style={{paddingTop:'13px'}}/><span style={{float:'right'}}>请求已发送</span></div>}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackerClose}
        />


      </div>


    );
  }
});

export default GroupRight;
