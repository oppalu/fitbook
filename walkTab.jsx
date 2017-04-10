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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import DoneIcon from 'material-ui/svg-icons/action/done';

import { Link } from 'react-router';



const WalkTab = React.createClass({
  getInitialState(){
        return {
            isDialogOpen: false,
            steps:"",
            distance:"",
            duration:"",
            calories:"",
            isSnackerOpen:false,

        }
    },
    handleDialogOpen() {
    this.setState({isDialogOpen: true});
    },
    handleDialogClose() {
    this.setState({isDialogOpen: false});
    },
    handleSnackerOpen(){
      this.setState({isSnackerOpen: true});
    },
    handleSnackerClose(){
      this.setState({isSnackerOpen: false});
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
      var url="http://localhost:8888/fitbook/walkgetter.php?ssid=";
      url+=getCookie("ssid");
      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();

          if(json.isava==0){
            that.setState({steps: "今日数据还未上传"});
            that.setState({distance: ""});
            that.setState({duration: ""});
            that.setState({calories: ""});
          }else{
            that.setState({steps: json.steps});
            that.setState({distance: json.distance});
            that.setState({duration: json.duration});
            that.setState({calories: json.cal});
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
      url+="2";
      url+="&content=";
      url+=content;
      url+="&sportdata=";
      url+=this.state.steps;

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
              title="FitBook 计步分析"

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
          <Link to={{ pathname: '/stats/1' }} style={{ textDecoration: 'none' }} ><MenuItem primaryText="历史计步数据" /> </Link>

        </IconMenu>
        </div>
      </CardHeader>



      <CardText>
            <Paper className="centercircle" zDepth={2} circle={true} style={{border: '4px solid #3cba54'}}>
          <div className="wordsincircle" style={{color:'#3cba54'}}>{this.state.steps}</div>
          <div className="wordsincirclesub" style={{color:'#3cba54'}}>今天步数</div>
            </Paper>

            <div style={{marginTop:'65px'}}>
            <div style={{width:'33%',display:'inline-block',textAlign:'center',color:'#3cba54'}}>
              行走距离
            </div>
            <div style={{width:'33%',display:'inline-block',textAlign:'center',color:'#3cba54'}}>
              消耗热量
            </div>
            <div style={{width:'33%',display:'inline-block',textAlign:'center',color:'#3cba54'}}>
              活跃时间
            </div>


            </div>


            <div style={{marginTop:'10px'}}>
            <div style={{width:'33%',display:'inline-block',textAlign:'center',color:'#3cba54',fontSize:'25px'}}>
              {this.state.distance}
            </div>
            <div style={{width:'33%',display:'inline-block',textAlign:'center',color:'#3cba54',fontSize:'25px'}}>
              {this.state.calories}
            </div>
            <div style={{width:'33%',display:'inline-block',textAlign:'center',color:'#3cba54',fontSize:'25px'}}>
              {this.state.duration}
            </div>


            </div>




          </CardText>
            </Card>
        </div>

          <div className="four columns" style={{verticalAlign:'top',marginTop:'25px',}}>


        <Card>
        <CardHeader
        title="热门计步活动"
        titleStyle={{fontSize:'20px'}}
        />
        <List>


      <Link to={{ pathname: "/atyinfo/66316" }} style={{ textDecoration: 'none' }} >
      <ListItem
        primaryText="678687"
        leftAvatar={<AtyIcon/>}
        />
        </Link>


        </List>

        </Card>

        <Card style={{marginTop:'10px'}}>
 <CardHeader
   title="运动圈计步排行"
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

<div style={{marginTop:'20px'}}>已添加今日计步数据：{this.state.steps}</div>

 </Dialog>




</div>
    );
  }
});

export default WalkTab;
