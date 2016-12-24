import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Abtn= React.createClass({
getInitialState(){
      return {
          isClickLogin: false
      }
  },

  handleOpen() {
  this.setState({isClickLogin: true});
  },

  handleClose() {
  this.setState({isClickLogin: false});
  },

  render() {
  const actions = [

      <FlatButton
        label="关闭"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="注册"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
    <div>
      <RaisedButton label="立即注册" secondary={true} style={{width:"250px"}} onTouchTap={this.handleOpen}/>

      <Dialog
          title="注册"
          actions={actions}
          modal={true}
          open={this.state.isClickLogin}
          contentStyle={{width: '300px'}}
        >
        <TextField hintText="邮箱" floatingLabelText="邮箱"/><br/>
        <TextField hintText="用户名" floatingLabelText="用户名"/><br/>
        <TextField hintText="密码" floatingLabelText="密码" type="password"/><br/>
        <TextField hintText="确认密码" floatingLabelText="确认密码" type="password"/>
        </Dialog>

</div>
    );
  }
});

export default Abtn;
