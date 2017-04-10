import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import CTopBtn from './ContentTopBtn.jsx';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';
import SettingsIcon from 'material-ui/svg-icons/action/home';

import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import DoneIcon from 'material-ui/svg-icons/action/done';


import StatsIcon from 'material-ui/svg-icons/action/timeline';

import DataIcon from 'material-ui/svg-icons/action/settings-input-component';

import LevelIcon from 'material-ui/svg-icons/action/grade';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import MenuItem from 'material-ui/MenuItem';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import PostIcon from 'material-ui/svg-icons/social/share';
import Snackbar from 'material-ui/Snackbar';
import Nav from './Navgation.jsx';


const AandD = React.createClass({
  getInitialState(){
        return {
            isDrawerPulled: false,
            isDialogShow:false,
            isMale:1,
            isUploadOpen:false,
            avatarurl:"",
            coverurl:"",
            username:"",
            level:"",
            exp:"",
            jumpuser:"/myinfo/",

            uploadfilename:"",
            isSnackerOpen:false,
            isSwiped:false,


        }
    },
    refresh(name){
      // location.reload();
      //

         var url="http://localhost:8080/#";
         url+=name;
         url+="?refs=yes";
         window.location.href=url;

         location.reload();



    },


    handleOpen() {

      if(this.state.isSwiped==false){
        this.setState({isSwiped: true});
        swipeout(0,this.props.id);
      }else{
        this.setState({isSwiped: false});
        swipeout(1,this.props.id);
      }
    // this.setState({isDrawerPulled: true});
    },
    addloadfile(){
      var file=document.getElementById("inputfile").value;

      this.setState({uploadfilename: file});
    },
    handleSnackerOpen(){
      this.setState({isSnackerOpen: true});
    },
    handleSnackerClose(){
      this.setState({isSnackerOpen: false});
    },
    handleClose() {
    this.setState({isDrawerPulled: false});
    },
    handleModifyClose(){
      this.setState({isDialogShow: false});
    },
    handleModify(){
      this.setState({isDrawerPulled: false});
      this.setState({isDialogShow: true});
    },
    handleMaleChange(event, index, value){
      this.setState({isMale: value});
    },
    handleUploadOpen(){
      this.setState({isUploadOpen: true});
    },
    handleUploadClose(){
      this.setState({isUploadOpen: false});
    },
    popupload(){
      document.getElementById('inputfile').click();
    },
    dotitle(){
      window.location.href="http://localhost:8080/#/about";
    },


    doupload(){
      var f=document.getElementById("inputfile").files[0];
      var url="http://localhost:8888/fitbook/fileuploader.php?ssid=";
      url+=getCookie("ssid");

      var xmlHttp =GetXmlHttpObject();
      var form = new FormData();
       form.append("pic", f);
       var that=this;
       xmlHttp.onreadystatechange=function(){
         // that.setState({btntext: xmlHttp.responseText});
         if (xmlHttp.readyState==4 && xmlHttp.status==200){

            if(xmlHttp.responseText==1){
              that.handleUploadClose();
              that.handleSnackerOpen();



           }else{
             that.setState({uploadmsg: "上传失败!"});
             alert("上传出错！请检查网络");
           }
         }
       };

       xmlHttp.open("POST",url,true);
       xmlHttp.send(form);

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
      var url="http://localhost:8888/fitbook/appbargetter.php?ssid=";
      url+=getCookie("ssid");
      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();
          if(json.isava==0){
            alert("something wrong at left drawer!")
          }else{
            that.setState({avatarurl: json.avatarlink});
            that.setState({coverurl: json.coverlink});
            that.setState({username: json.username});
            that.setState({exp: json.exp});
            that.setState({level: json.level});

            var x=that.state.jumpuser+that.state.username;
            that.setState({jumpuser: x});

          }


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
        onTouchTap={this.handleModifyClose}
      />,
      <FlatButton
        label="确认修改"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleModifyClose}
      />,
    ];
    const uploadactions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleUploadClose}
      />,
      <FlatButton
        label="上传"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.doupload}
      />,
    ];

    return (
        <div>
        <Drawer open={this.state.isDrawerPulled} onRequestChange={this.handleClose} docked={true}
        zDepth={0}
        containerStyle={{backgroundColor:'filter:alpha(opacity=50)'}}
        >

        <div style={{height:"71px"}}></div>

          <div id="pic" style={{backgroundImage: this.state.coverurl,display:'none'}}>

          <FlatButton
          icon={ <Avatar src={this.state.avatarurl} size={55} /> }
          style={{width:'120px',height:'80px',color:'white',marginTop:'55px'}}
          hoverColor="#00"
          rippleColor="#00"
          />

          <div id="drawerid">{this.state.username}</div>

          </div>


          <List>
           <ListItem primaryText={this.state.level} leftIcon={<LevelIcon/>} style={{display:'none'}}/>
           <ListItem primaryText={this.state.exp} leftIcon={<MoneyIcon/>} style={{display:'none'}}/>
           <Divider style={{display:'none'}}/>
          </List>


        <List>

       <ListItem primaryText="我的主页" leftIcon={<SettingsIcon/>} onTouchTap={this.refresh.bind(this, this.state.jumpuser)}/>
        <ListItem primaryText="上传数据" leftIcon={<UploadIcon/>} onTouchTap={this.handleUploadOpen} id="uploadData"/>

      <Link to="/postmanage" style={{ textDecoration: 'none' }}>   <ListItem primaryText="我的动态" leftIcon={<PostIcon/>} /></Link>
      <Link to="/stats" style={{ textDecoration: 'none' }}>  <ListItem primaryText="统计分析" leftIcon={<StatsIcon/>} onTouchTap={this.handleClose} /></Link>

        </List>


        <List style={{position:'fixed',bottom:'0',width:'100%'}}>
        <Link to="/" style={{ textDecoration: 'none' ,display:'none'}}><ListItem primaryText="退出登录"leftIcon={<ExitIcon/>}/></Link>
        </List>

        </Drawer>
        <AppBar

        iconElementLeft={<Nav id={this.props.id}/>}
        iconElementRight={<CTopBtn/>}

        style={{position:'fixed'}}
        onTitleTouchTap={this.dotitle}



        zDepth={0}
        />



        <Dialog
         title="修改个人资料"
         actions={actions}
         modal={true}
         open={this.state.isDialogShow}
         onRequestClose={this.handleModifyClose}
         contentStyle={{maxWidth: '350px'}}
       >
       <TextField
       floatingLabelText="用户名"

       /><br/>

       <span>性别 &nbsp;</span>
       <DropDownMenu value={this.state.isMale} onChange={this.handleMaleChange}>
          <MenuItem value={1} primaryText="男" />
          <MenuItem value={2} primaryText="女" />
        </DropDownMenu><br/>

        <TextField
        floatingLabelText="年龄"

        /><br/>

        <TextField
        floatingLabelText="地区"
        />

        <div style={{height:'15px'}}></div>

        <FlatButton
          label="上传头像"
          primary={true}
          icon={<UploadIcon/>}
        />

    <FlatButton
      label="上传封面"
      primary={true}
      icon={<UploadIcon/>}
    />


       </Dialog>



       <Dialog
        title="上传数据"
        actions={uploadactions}
        modal={true}
        open={this.state.isUploadOpen}
        onRequestClose={this.handleUploadClose}
        contentStyle={{maxWidth: '350px'}}
      >

      <FlatButton
        label="选择文件"
        icon={<UploadIcon/>}
        onTouchTap={this.popupload}
   />
      <div><input type="file" style={{display:'none'}} id="inputfile" onChange={this.addloadfile}/> {this.state.uploadfilename}</div><br/>

      </Dialog>


      <Snackbar
      open={this.state.isSnackerOpen}
      message={<div><DoneIcon color={'white'} style={{paddingTop:'13px'}}/><span style={{float:'right'}}>上传成功</span></div>}
      autoHideDuration={4000}
      onRequestClose={this.handleSnackerClose}
    />










        </div>
    );
  }
});

export default AandD;
