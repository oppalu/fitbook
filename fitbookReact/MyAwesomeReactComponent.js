import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import TopBtn from './App.jsx';
import DrawerSample from './SideDrawer.jsx';
import Dialog from 'material-ui/Dialog';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import Abtn from './JustBtn.jsx';
import RepLink from './mylnk.jsx';
import DoneIcon from 'material-ui/svg-icons/action/done';




var onClickIcon=function(){
   location.reload(true) ;
};

const iconStyles = {
  marginLeft: "36%",
  width:70,
  height:70,
  marginTop:"80%",
};


const MyAwesomeReactComponent = React.createClass({
  getInitialState(){
        return {
            isDrawerPulled: false,
            isClickLogin: false,
            isClickReg: false,
            isClickForget:false,
            forgeterrortext:"",
            isEmailSent:"none",

        }
    },

    handleOpen() {
    this.setState({isDrawerPulled: true});
    },
    handleClose() {
    this.setState({isDrawerPulled: false});
    },

    handleLoginClose() {
    this.setState({isClickLogin: false});
    },
    handleLoginOpen() {
      this.handleClose();
    this.setState({isClickLogin: true});
    },
    handleRegClose() {
    this.setState({isClickReg: false});
    },
    handleRegOpen() {
      this.handleClose();
    this.setState({isClickReg: true});
    },

    onLogin(){
      var username=this.refs.username.getValue();
      var password=this.refs.password.getValue();
      alert(username+password);
    },
    handleForgetOpen(){
      this.handleLoginClose();
      this.setState({isClickForget: true});
    },
    handleForgetClose(){
      this.setState({isClickForget: false});
    },
    handleForgetSubmit(){
        var email=this.refs.forgetemail.getValue();
        var res=checkEmail(email);
        if(res==1){
          this.setState({forgeterrortext: ""});
          this.setState({isEmailSent: ""});
          alert(email);
        }else{
          this.setState({forgeterrortext: "电子邮件格式不正确"});
        }
    },


  render() {
    const actionss = [
      <FlatButton
        label="忘记密码?"
        secondary={true}
        onTouchTap={this.handleForgetOpen}
      />,
        <FlatButton
          label="关闭"
          primary={true}
          onTouchTap={this.handleLoginClose}
        />,
        <FlatButton
          label="登录"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.onLogin}
        />,

      ];

      const actionsforreg = [

          <FlatButton
            label="关闭"
            primary={true}
            onTouchTap={this.handleRegClose}
          />,
          <FlatButton
            label="注册"
            secondary={true}
            keyboardFocused={true}
            onTouchTap={this.handleRegClose}
          />,
        ];
        const actionsforforget = [

            <FlatButton
              label="关闭"
              primary={true}
              onTouchTap={this.handleForgetClose}
            />,
            <FlatButton
              label="提交"
              secondary={true}
              keyboardFocused={true}
              onTouchTap={this.handleForgetSubmit}
            />,
          ];

    return (
<div>

<Dialog
    title="登录"
    actions={actionss}
    modal={true}
    open={this.state.isClickLogin}
    contentStyle={{width: '300px'}}
  >

  <TextField ref="username" hintText="用户名" floatingLabelText="用户名"/><br/>
  <TextField ref="password" hintText="密码" floatingLabelText="密码" type="password"/>


  </Dialog>




  <Dialog
      title="忘记密码?"
      actions={actionsforforget}
      modal={true}
      open={this.state.isClickForget}
      contentStyle={{width: '300px'}}
    >


    <p>填写您注册时使用的邮箱地址，我们会向这个邮箱发送你的密码</p>
    <TextField ref="forgetemail" hintText="电子邮箱" floatingLabelText="电子邮箱" errorText={this.state.forgeterrortext}/><br/>


    <div style={{display:this.state.isEmailSent}}>
      <span>邮件已发送</span><DoneIcon color="#00c1d7" style={{float:'right'}}/>
    </div>




    </Dialog>



  <Dialog
      title="注册"
      actions={actionsforreg}
      modal={true}
      open={this.state.isClickReg}
      contentStyle={{width: '300px'}}
    >
    <TextField hintText="邮箱" floatingLabelText="邮箱"/><br/>
    <TextField hintText="用户名" floatingLabelText="用户名"/><br/>
    <TextField hintText="密码" floatingLabelText="密码" type="password"/><br/>
    <TextField hintText="确认密码" floatingLabelText="确认密码" type="password"/>
    </Dialog>





      {/*<Drawer open={this.state.isDrawerPulled} onRequestChange={this.handleClose} docked={false}>*/}
        {/*<div style={{borderBottom:'1px solid #c0c0c0'}} ><img src="assets/iconblue.png"/></div>*/}
        {/*<AccountIcon color={"#9e9e9e"} style={iconStyles}/>*/}
        {/*<p style={{marginTop:"0",marginLeft:"33%",marginBottom:"0"}}>还没有登录?</p>*/}



        {/*<FlatButton label="登录" primary={true} style={{marginLeft:"15%"}} onTouchTap={this.handleLoginOpen}/>*/}
        {/*<FlatButton label="注册" secondary={true} onTouchTap={this.handleRegOpen}/>*/}




      {/*</Drawer>*/}
      <AppBar
     title={<div />}
     iconClassNameRight="muidocs-icon-navigation-expand-more"
     iconElementRight={<TopBtn/>}
     onTitleTouchTap={onClickIcon}
     titleStyle={{cursor: 'pointer'}}
     iconElementLeft={<img id="baricon" src="assets/icon.png" />}
     onLeftIconButtonTouchTap={this.handleOpen}

     zDepth={0}
   />



         <div id="indexbg">
             <div id="indexbgblock1">
               <img id="indexbgbigicon" src="assets/bigicon.png" />
               <div id="indexintro">一款基于移动设备数据采集的运动社交软件</div>
               <div id="AButton">
                  <Abtn />
               </div>
             </div>
             <div id="indexbgpicdiv">

               <img id="indexbgpic" src="assets/bg.jpg" />
             </div>


         </div>

         <div id="indexsubtitle">FitBook 帮助你</div>

         <div id="indexsubblock">
                 <div id="indexsubintroFirst">
                   <embed src="assets/smartphone.svg" width="100" height="100" />
                   <div className="indexsubtext">基于移动设备</div><div>收集你的运动数据</div>
                 </div>

                 <div className="indexsubintro">
                     <embed src="assets/data.svg" width="100" height="100" />
                   <div className="indexsubtext">分析运动数据</div><div>合理规划运动计划</div>
                 </div>

                 <div className="indexsubintro">
                   <embed src="assets/horn.svg" width="100" height="100" />
                   <div className="indexsubtext">发布活动</div><div>与好友一起运动</div>
                 </div>

                 <div className="indexsubintro">
                   <embed src="assets/network.svg" width="100" height="100" />
                   <div className="indexsubtext">在运动中</div><div>结识新的朋友</div>
                 </div>

               </div>


               <div className="myfootbar">
                 <img id="footblueicon" src="assets/iconblue.png"/>
                  <div id="mylink">
                  <RepLink/>
                  </div>
               </div>










</div>




    );
  }
});


export default MyAwesomeReactComponent;
