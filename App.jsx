import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Link ,browserHistory} from 'react-router';
import DoneIcon from 'material-ui/svg-icons/action/done';
//TopBtn

const style = {
  color:'#fff',
  marginTop:6
};


const customLoginStyle = {
  width: '300px',
};





const LoginDia= React.createClass({

  getInitialState(){
        return {
            isClickLogin: false,
            isClickReg: false,
            isClickForget:false,
            forgeterrortext:"",
            isEmailSent:"none",
            loginstate:"",
            regstate:"",
        }
    },

    handleLoginPressEnter(event){
        if(event.keyCode==13){
            this.onLogin();
        }

    },

    handleRegPressEnter(event){
        if(event.keyCode==13){
            this.onReg();
        }

    },

    handleOpen() {
    this.setState({isClickLogin: true});
    },
    handleClose() {
    this.setState({isClickLogin: false});
    this.setState({loginstate: ""});
    },
    handleRegClose() {
    this.setState({isClickReg: false});
    this.setState({regstate: ""});
    },
    handleRegOpen() {
      this.handleClose();
    this.setState({isClickReg: true});
    },
    jumpContent(){
      document.getElementById("gotocontent").click();
    },
    onLogin(){
      var username=this.refs.username.getValue();
      var password=this.refs.password.getValue();

      if(username==""){
        this.setState({loginstate: "用户名不能为空!"});
        return;
      }
      if(password==""){
        this.setState({loginstate: "密码不能为空!"});
        return;
      }


      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request");
        return
      }
      var url="http://127.0.0.1:8888/fitbook/Login.php?username=";
      url+=username;
      url+="&password=";
      url+=password;
      var that=this;


      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        // alert(xmlHttp.responseText);
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          //  alert(xmlHttp.responseText);
           var jsonstr=xmlHttp.responseText;
           var json=new Function("return" + jsonstr)();
           if(json.res==0){
             that.setState({loginstate: "用户名或密码错误!"});
             return;
           }else{
             ssholder.setsession(json.ssid);

            // alert(ssholder.getsession());
              that.setcookie("ssid",ssholder.getsession());
             window.location.href="http://localhost:8080/#/about?username="+username;
             //jump by para


           }
        }

      };

      xmlHttp.open("GET",url,true);
      xmlHttp.send();
    },
    handleForgetOpen(){
      this.handleClose();
      this.setState({isClickForget: true});
    },
    handleForgetClose(){
      this.setState({isClickForget: false});
      this.setState({forgeterrortext: ""});
      that.setState({isEmailSent: "none"});

    },
    handleForgetSubmit(){
        var email=this.refs.forgetemail.getValue();
        var res=checkEmail(email);
        if(res==1){
          this.setState({forgeterrortext: ""});


          var xmlHttp =GetXmlHttpObject();
          if (xmlHttp==null){
            alert ("Browser does not support HTTP Request");
            return
          }
          var url="http://localhost:8888/fitbook/forgetpsw.php?email=";
          url+=email;



          var that=this;


          xmlHttp.onreadystatechange=function(){
            // that.setState({btntext: xmlHttp.responseText});
            // alert(xmlHttp.responseText);
            if (xmlHttp.readyState==4 && xmlHttp.status==200){
               alert(xmlHttp.responseText);
               if(xmlHttp.responseText==0){
                 that.setState({forgeterrortext: "该邮箱未被注册"});
                 that.setState({isEmailSent: "none"});
                 return;
               }else{
                   that.setState({isEmailSent: ""});

               }
            }

          };

          xmlHttp.open("GET",url,true);
          xmlHttp.send();


        }else{
          this.setState({forgeterrortext: "电子邮件格式不正确"});
        }
    },
    onReg(){
      var username=this.refs.regusername.getValue();
      var email=this.refs.regemail.getValue();
      var psw=this.refs.regpassword.getValue();
      var cpsw=this.refs.regconpassword.getValue();

      if(username==""){
        this.setState({regstate: "用户名不能为空!"});
        return;
      }
      if(email==""){
        this.setState({regstate: "电子邮件不能为空!"});
        return;
      }
      if(psw==""){
        this.setState({regstate: "密码不能为空!"});
        return;
      }
      if(cpsw==""){
        this.setState({regstate: "确认密码不能为空!"});
        return;
      }

      if(psw!=cpsw){
        this.setState({regstate: "确认密码与密码不一致!"});
        return;
      }

      var res=checkEmail(email);

      if(res!=1){
        this.setState({regstate: "电子邮件格式不正确!"});
        return;
      }


      this.setState({regstate: "注册中"});

      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request");
        return
      }
      var url="http://127.0.0.1:8888/fitbook/reg.php?username=";
      url+=username;
      url+="&password=";
      url+=psw;
      url+="&email=";
      url+=email;


      var that=this;


      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        // alert(xmlHttp.responseText);
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();
           alert(xmlHttp.responseText);
           if(json.res=="10"||json.res=="11"){
             that.setState({regstate: "用户名已存在!"});
             return;
           }else if(json.res=="01"){
             that.setState({regstate: "邮箱已被注册!"});
             return;
           }else{
             that.setState({regstate: "注册成功!"});
             //jump
             ssholder.setsession(json.ssid);
             alert(ssholder.getsession());
              that.setcookie("ssid",ssholder.getsession());
             document.getElementById("gotocontent").click();
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
    label="忘记密码?"
    secondary={true}
    keyboardFocused={true}
    onTouchTap={this.handleForgetOpen}
  />,
      <FlatButton
        label="关闭"
        primary={true}
        onTouchTap={this.handleClose}
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
          onTouchTap={this.onReg}
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
     <FlatButton label="登录" labelStyle={{fontSize:"16px"}} style={style}
     onTouchTap={this.handleOpen}
     />
     <FlatButton label="注册" labelStyle={{fontSize:"16px"}} style={style} onTouchTap={this.handleRegOpen}/>

     <Dialog
         title="登录"
         actions={actions}
         modal={true}
         open={this.state.isClickLogin}
         contentStyle={customLoginStyle}
       >

       <TextField ref="username" hintText="用户名" floatingLabelText="用户名" onKeyDown={this.handleLoginPressEnter}/><br/>
       <TextField  ref="password" hintText="密码" floatingLabelText="密码" type="password" onKeyDown={this.handleLoginPressEnter}/>

       <div>
         <span>{this.state.loginstate}</span>
       </div>
       </Dialog>

       <Dialog
           title="注册"
           actions={actionsforreg}
           modal={true}
           open={this.state.isClickReg}
           contentStyle={{width: '300px'}}
         >
         <TextField ref="regemail" hintText="邮箱" floatingLabelText="邮箱" onKeyDown={this.handleRegPressEnter}/><br/>
         <TextField ref="regusername" hintText="用户名" floatingLabelText="用户名" onKeyDown={this.handleRegPressEnter}/><br/>
         <TextField ref="regpassword" hintText="密码" floatingLabelText="密码" type="password" onKeyDown={this.handleRegPressEnter}/><br/>
         <TextField ref="regconpassword" hintText="确认密码" floatingLabelText="确认密码" type="password" onKeyDown={this.handleRegPressEnter}/>
         <div>
           <span>{this.state.regstate}</span>
         </div>
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
    </div>
    );
  }
});

export default LoginDia;
