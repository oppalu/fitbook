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
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


const SleepTab = React.createClass({
  getInitialState(){
        return {
            isDialogOpen: false,
            sleeptime:"",
            getuptime:"",
            gotobedtime:"",
            deeptime:"",
            lighttime:"",
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
    initData(){

      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request")
        return
      }
      var url="http://localhost:8888/fitbook/sleepgetter.php?ssid=";
      url+=getCookie("ssid");

      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();

          if(json.isava==0){
            that.setState({sleeptime: "今日数据还未上传"});
            that.setState({getuptime: ""});
            that.setState({gotobedtime: ""});
            that.setState({deeptime: ""});
            that.setState({lighttime: ""});
          }else{
            that.setState({sleeptime: json.totalsleep});
            that.setState({getuptime: json.getuptime});
            that.setState({gotobedtime: json.sleeptime});
            that.setState({deeptime: json.deeptime});
            that.setState({lighttime: json.lighttime});
          }



        }
      };

      xmlHttp.open("GET",url,true);
      xmlHttp.send();
    },
    setcookie (name, value){

    var expdate = new Date();
    expdate.setTime(expdate.getTime() + 3*24 * 60 * 60 * 1000);   //时间
    document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";
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
       onTouchTap={this.handleDialogClose}
     />,
   ];

    return (

      <div className="container">
      <div className="row rowheight" >

      <div className="eight columns" style={{marginTop:'25px'}} >
            <Card className="cardheight">
            <CardHeader
              title="FitBook 睡眠分析"

              titleStyle={{fontSize:'27px'}}
            >

<div className="shareAndHistory">


            <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}


        >
    <Link to={{ pathname: '/stats/0' }}  style={{ textDecoration: 'none' }}>  <div> <MenuItem primaryText="历史睡眠数据" /> </div> </Link>

        </IconMenu>
        </div>
      </CardHeader>



      <CardText>
            <Paper className="centercircle" zDepth={2} circle={true} style={{border: '4px solid #4885ed'}}>
          <div className="wordsincircle" style={{color:'#4885ed'}}>{this.state.sleeptime}</div>
          <div className="wordsincirclesub" style={{color:'#4885ed'}}>昨晚睡眠时间</div>
            </Paper>

            <div style={{paddingTop:'65px'}}>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#4885ed'}}>
              入睡时间
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#4885ed'}}>
              起床时间
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#4885ed'}}>
              深睡眠用时
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#4885ed'}}>
              浅睡眠用时
            </div>

            </div>


            <div style={{marginTop:'10px'}}>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#4885ed',fontSize:'25px'}}>
              {this.state.gotobedtime}
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#4885ed',fontSize:'25px'}}>
              {this.state.getuptime}
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#4885ed',fontSize:'25px'}}>
              {this.state.deeptime}
            </div>
            <div style={{width:'25%',display:'inline-block',textAlign:'center',color:'#4885ed',fontSize:'25px'}}>
              {this.state.lighttime}
            </div>

            </div>

          </CardText>

          </Card>

        </div>
        <div className="four columns" style={{verticalAlign:'top',marginTop:'25px',}}>
        <Card>
 <CardHeader
   title="作息规律排行"
   titleStyle={{fontSize:'20px'}}
 />
 <List>
    <Link to={{ pathname: "/myinfo/tracy" }} style={{ textDecoration: 'none' }} >  <ListItem
        primaryText="tracy"
        leftAvatar={<Avatar src="assets/avatar/3.jpeg" />}
        rightIcon={<FirstIcon />}
      /></Link>


      <Link to={{ pathname: "/myinfo/Adam" }} style={{ textDecoration: 'none' }} ><ListItem
        primaryText="Adam"
        leftAvatar={<Avatar src="assets/avatar/2.jpeg"/>}
        rightIcon={<SecIcon />}
      /></Link>

      <Link to={{ pathname: "/myinfo/KILLER" }} style={{ textDecoration: 'none' }} ><ListItem
        primaryText="KILLER"
        leftAvatar={<Avatar src="assets/avatar/1.jpeg" />}
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
        floatingLabelText="你最近有什么新鲜事要分享吗?"
       multiLine={true}
       rows={5}
       rowsMax={10}
       fullWidth={true}
       underlineShow={false}
     />

<div style={{marginTop:'20px'}}>已添加睡眠数据</div>

 </Dialog>





        </div>
    );
  }
});

export default SleepTab;
