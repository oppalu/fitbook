import React from 'react';
import {Card,CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ShowmoreIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import GroupIcon from 'material-ui/svg-icons/social/people';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const PublishCard = React.createClass({

  getInitialState(){
        return {
            isDialogOpen: false,
            selectValue:1,
            sportdata:"",
        }
    },

    handleDropChange(event, index, value){
      this.setState({selectValue: value});


      if(value==1){
        this.setState({sportdata: ""});
        return;
      }


      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request");
        return;
      }
      var url="http://localhost:8888/fitbook/sportdatagetter.php?ssid=";
      url+=getCookie("ssid");
      url+="&type=";
      url+=value;

      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
            that.setState({sportdata: xmlHttp.responseText});

        }
      };

      xmlHttp.open("GET",url,true);
      xmlHttp.send();


    },
    handleDialogOpen() {
    this.setState({isDialogOpen: true});
    },
    handleDialogClose() {
    this.setState({isDialogOpen: false});
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
      url+=this.state.selectValue;
      url+="&content=";
      url+=content;
      url+="&sportdata=";
      url+=this.state.sportdata;

      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
            if(xmlHttp.responseText==1){
              that.handleDialogClose();
              location.reload();
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

    return (

      <div>
      <Card style={{height:'75px',cursor:'pointer'}} onTouchTap={this.handleDialogOpen}>

      <div style={{display:'inline-block',marginTop:'3%',marginLeft:'4%'}}> <Avatar src="assets/head.png" /></div>
      <p style={{display:'inline-block',color:'#AFAFAF',fontSize:'20px',marginLeft:'10px'}}>你最近有什么新鲜事要分享吗?</p>
      </Card>


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

      <span style={{marginTop:'20px'}}>添加一项今日运动数据:</span>
      <DropDownMenu value={this.state.selectValue} onChange={this.handleDropChange}>
         <MenuItem value={1} primaryText="无" />
         <MenuItem value={2} primaryText="计步数据" />
         <MenuItem value={3} primaryText="跑步数据" />
         <MenuItem value={4} primaryText="骑行数据" />
       </DropDownMenu>

       <div style={{display:'inline-block',marginTop:'20px'}}>{this.state.sportdata}</div>

       </Dialog>

        </div>
    );
  }
});

export default PublishCard;
