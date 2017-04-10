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
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const RunTab = React.createClass({
getInitialState(){
      return {
          isDialogOpen: false,
          distance:"",
          calories:"",
          duration:"",
          speed:"",
          maxspeed:"",
          isSnackerOpen:false,
      }
  },
  handleDialogOpen() {
  this.setState({isDialogOpen: true});
  },
  handleDialogClose() {
  this.setState({isDialogOpen: false});
  },
  componentDidMount: function() {
      this.initData();
  },
  handleSnackerOpen(){
    this.setState({isSnackerOpen: true});
  },
  handleSnackerClose(){
    this.setState({isSnackerOpen: false});
  },
  initData(){


    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://localhost:8888/fitbook/ridegetter.php?ssid=";
    url+=getCookie("ssid");
    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();

        if(json.isava==0){
          that.setState({distance: "今日数据还未上传"});
          that.setState({calories: ""});
          that.setState({speed: ""});
          that.setState({maxspeed: ""});
          that.setState({duration: ""});
        }else{
          that.setState({distance: json.distance});
          that.setState({calories: json.cal});
          that.setState({speed: json.speed});
          that.setState({maxspeed: json.maxspeed});
          that.setState({duration: json.duration});
        }



      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();
  },
  dopost(){

    var content=this.refs.content.getValue();

    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request");
      return;
    }
    var url="http://localhost:8888/fitbook/poster.php?ssid=";
    url+=getCookie("ssid");
    url+="&type=";
    url+="4";
    url+="&content=";
    url+=content;
    url+="&sportdata=";
    url+=this.state.distance;

    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
          if(xmlHttp.responseText==1){
            that.handleSnackerOpen();
            that.handleDialogClose();

          }else{
            alert("发布失败，请检查网络");
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
      onTouchTap={this.handleDialogClose}
    />,
   <FlatButton
     label="发布"
     primary={true}
     keyboardFocused={true}
     onTouchTap={this.dopost}
   />,
 ];

 const postactions = [

  <FlatButton
    label="关闭"
    primary={true}
    keyboardFocused={true}
    onTouchTap={this.handleSnackerClose}
  />,
];

    return (
    <div className="container">

    <Dialog
       title="已发布"
       actions={postactions}
       modal={false}
       open={this.state.isSnackerOpen}
       onRequestClose={this.handleSnackerClose}
       contentStyle={{maxWidth: '100%'}}
     >
     </Dialog>
    <div className="row highrowheight">
    <div className="eight columns" style={{marginTop:'25px'}}>
            <Card className="cardheight">
            <CardHeader
              title="FitBook 骑行分析"

              titleStyle={{fontSize:'27px'}}
            >

<div className="shareAndHistory">
            <IconMenu
          iconButtonElement={<IconButton><SocialIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}


          >
          <MenuItem primaryText="分享" onTouchTap={this.handleDialogOpen}/>

          </IconMenu>

            <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}


        >
      <Link to={{ pathname: '/stats/3' }} style={{ textDecoration: 'none' }} >  <MenuItem primaryText="历史骑行数据" /></Link>

        </IconMenu>
        </div>
      </CardHeader>



      <CardText>
            <Paper className="centercircle" zDepth={2} circle={true} style={{border: '4px solid #795548'}}>
          <div className="wordsincircle" style={{color:'#795548'}}>{this.state.distance}</div>
          <div className="wordsincirclesub" style={{color:'#795548'}}>今日骑行距离</div>
            </Paper>

            <div style={{marginTop:'65px'}}>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#795548'}}>
              共耗时
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#795548'}}>
              消耗热量
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#795548'}}>
              平均速度
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#795548'}}>
              最大速度
            </div>

            </div>


            <div style={{marginTop:'10px'}}>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#795548',fontSize:'25px'}}>
              {this.state.duration}
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#795548',fontSize:'25px'}}>
              {this.state.calories}
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#795548',fontSize:'25px'}}>
              {this.state.speed}<br/>km/h
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#795548',fontSize:'25px'}}>
              {this.state.maxspeed}<br/>km/h
            </div>

            </div>

          </CardText>
            </Card>
        </div>
        <div className="four columns" style={{verticalAlign:'top',marginTop:'25px',}}>


        <Card>
        <CardHeader
        title="热门骑行活动"
        titleStyle={{fontSize:'20px'}}
        />
        <List>

        <Link to={{ pathname: "/atyinfo/1" }} style={{ textDecoration: 'none' }} >
        <ListItem
        primaryText="公路骑行赛"
        leftAvatar={<AtyIcon/>}
        /></Link>

        </List>

        </Card>

        <Card style={{marginTop:'10px'}}>
  <CardHeader
   title="运动圈骑行排行"
   titleStyle={{fontSize:'20px'}}
  />
  <List>
  <Link to={{ pathname: "/myinfo/tracy" }} style={{ textDecoration: 'none' }} >  <ListItem
      primaryText="tracy"
      leftAvatar={<Avatar src="assets/avatar/3.jpeg" />}
      rightIcon={<FirstIcon />}
    /></Link>

    <Link to={{ pathname: "/myinfo/KILLER" }} style={{ textDecoration: 'none' }} ><ListItem
      primaryText="KILLER"
      leftAvatar={<Avatar src="assets/avatar/1.jpeg" />}
      rightIcon={<SecIcon  />}
    /></Link>
    <Link to={{ pathname: "/myinfo/Adam" }} style={{ textDecoration: 'none' }} ><ListItem
      primaryText="Adam"
      leftAvatar={<Avatar src="assets/avatar/2.jpeg"/>}
      rightIcon={<ThirdIcon />}
    /></Link>

  </List>

  </Card>
  </div>
  </div>
  <Dialog
     title="发布一个动态"
     actions={actions}
     modal={true}
     open={this.state.isDialogOpen}
     onRequestClose={this.handleDialogClose}
     contentStyle={{maxWidth: '500px'}}
   >
   <TextField
          ref="content"
          floatingLabelText="你最近有什么新鲜事要分享吗?"
         multiLine={true}
         rows={5}
         rowsMax={10}
         fullWidth={true}
         underlineShow={false}
       />

  <div style={{marginTop:'20px'}}>已添加今日骑行数据：{this.state.distance}</div>

   </Dialog>


  </div>
    );
  }
});

export default RunTab;
