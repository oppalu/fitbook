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


const Cover = React.createClass({
  getInitialState(){
    return{
      isDialogShow:false,
      isMale:1,
      isSnackerOpen:false,
    }
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
  render() {
    const groupactions = [
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

    return (

      <div >
        <div id="coverforgroup">
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon color={'white'}/></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            style={{float:'right'}}
            >
              <MenuItem primaryText="修改群组资料" onTouchTap={this.handleModify}/>

          </IconMenu>
        </div>


        <div id="belowcoverforgroup">
          <div style={{fontSize:'30px',marginLeft:'20px',paddingTop:'40px',fontWeight:'600'}}>马拉松爱好者</div>
          <div className="groupintro">这里是马拉松爱好者的聚集地！我们会不定期发布马拉松活动！</div>

          <RaisedButton
            label="加入群组"
            labelStyle={{fontWeight:'600',color:'#796333'}}
            style={{marginLeft:'20px'}}
            onTouchTap={this.handleSnackerOpen}
          />

          <Snackbar
          open={this.state.isSnackerOpen}
          message={<div><SendIcon color={'white'} style={{paddingTop:'13px'}}/><span style={{float:'right'}}>请求已发送</span></div>}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackerClose}
        />
        </div>




        <Dialog
            title="修改群组"
            actions={groupactions}
            modal={true}
            open={this.state.isDialogShow}
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






      </div>
    );
  }
});

export default Cover;
