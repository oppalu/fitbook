import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


const customLoginStyle = {
  width: '300px',
};


const Login= React.createClass({
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
        label="登录"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];




    return (
    <div>
     <Dialog
         title="登录"
         actions={actions}
         modal={true}
         open={this.state.isClickLogin}
         contentStyle={customLoginStyle}
       >
       <TextField hintText="用户名" floatingLabelText="用户名"/><br/>
       <TextField hintText="密码" floatingLabelText="密码" type="password"/>
       </Dialog>
    </div>
    );
  }
});

export default Login;
