import React from 'react';
import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SendIcon from 'material-ui/svg-icons/content/send';
import PhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import ModifyIcon from 'material-ui/svg-icons/editor/mode-edit';
import FriendIcon from 'material-ui/svg-icons/action/face';
import GroupIcon from 'material-ui/svg-icons/social/people';
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';
import {white,grey50,grey700} from 'material-ui/styles/colors';


function isInteger(str) {
    if(/^\d+$/.test(str))
    {
        return 1;
    }  else {
        return 0;
    }
}

const Cover = React.createClass({
    getInitialState(){
        return{
            isDialogShow:false,
            isMale:1,
            isSnackerOpen:false,
            username:this.props.username,
            infoStatus:this.props.infoStatus,
            email:"",
            level:"",
            age:0,
            gender:"",
            addfriend:"",
            delfriend:"",
            avatarlink:"",
            coverlink:"",
            changedisplay: "",
            maincolor:"#FFA400",
            isavatarUploadOpen:false,
            iscoverUploadOpen:false,
            uploadavatarname:"",
            infoerrormsg:"",
            isExitDiaShow:false,
            right1item:'',
            right2item:'',
            right3item:'',
            right4item:'',
            icon1:'white',
            icon2:'white',
            icon3:'white',
            icon4:'white',

        }
    },
    ColorChange() {
      if(this.state.infoStatus=="right1"){
          this.setState({right1item: "white"});
          this.setState({right2item: "#FFA400"});
          this.setState({right3item: "#FFA400"});
          this.setState({right4item: "#FFA400"});

          this.setState({icon1: "#FFA400"});
          this.setState({icon2: "white"});
          this.setState({icon3: "white"});
          this.setState({icon4: "white"});

      }else if (this.state.infoStatus=="right2") {
        this.setState({right2item: "white"});
        this.setState({right1item: "#FFA400"});
        this.setState({right3item: "#FFA400"});
        this.setState({right4item: "#FFA400"});

        this.setState({icon2: "#FFA400"});
        this.setState({icon1: "white"});
        this.setState({icon3: "white"});
        this.setState({icon4: "white"});
      }else if (this.state.infoStatus=="right3") {
        this.setState({right3item: "white"});
        this.setState({right2item: "#FFA400"});
        this.setState({right1item: "#FFA400"});
        this.setState({right4item: "#FFA400"});

        this.setState({icon3: "#FFA400"});
        this.setState({icon2: "white"});
        this.setState({icon1: "white"});
        this.setState({icon4: "white"});
      }else if (this.state.infoStatus=="right4") {
        this.setState({right4item: "white"});
        this.setState({right2item: "#FFA400"});
        this.setState({right3item: "#FFA400"});
        this.setState({right1item: "#FFA400"});

        this.setState({icon4: "#FFA400"});
        this.setState({icon2: "white"});
        this.setState({icon3: "white"});
        this.setState({icon1: "white"});
      }





    },
    handleDetail(s) {
        switch (s) {
            case 1:
                window.location.href="http://localhost:8080/#/myinfo/"+this.state.username;
                break;
            case 2:
                window.location.href="http://localhost:8080/#/mygroup/"+this.state.username;
                break;
            case 3:
                window.location.href="http://localhost:8080/#/myaty/"+this.state.username;
                break;
            case 4:
                window.location.href="http://localhost:8080/#/mymessage/"+this.state.username;
                break;
            default:
        }
    },
    avatarpopupload(){
        document.getElementById('inputavatarfile').click();
    },
    addavatarfile(){
        var file=document.getElementById("inputavatarfile").value;

        this.setState({uploadavatarname: file});
    },

    coverpopupload(){
        document.getElementById('inputcoverfile').click();
    },
    addcoverfile(){
        var file=document.getElementById("inputcoverfile").value;

        this.setState({uploadcovername: file});
    },
    handleModifyClose(){
        this.setState({isDialogShow: false});
    },
    handleModify(){
        this.setState({isDialogShow: true});
    },
    confirmModify(){
        var name=this.refs.infoname.getValue();

        var age=this.refs.infoage.getValue();

        if(name==""){
            this.setState({infoerrormsg: "用户名不能为空"});
            return;
        }
        if(isInteger(age)==0){
            this.setState({infoerrormsg: "请输入正确的年龄"});
            return;
        }
        if(age<0||age>100){
            this.setState({infoerrormsg: "请输入正确的年龄"});
            return;
        }
        this.setState({infoerrormsg: ""});
        this.setState({infoerrormsg: ""});

        var xmlHttp =GetXmlHttpObject();
        if (xmlHttp==null){
            alert ("Browser does not support HTTP Request");
            return
        }

        var gender="男";

        if(this.state.isMale!=1){
            gender="女";
        }


        var url="http://localhost:8888/fitbook/updateuser.php?ssid=";
        url+=getCookie("ssid");
        url+="&name=";
        url+=name;
        url+="&gender=";
        url+=gender;
        url+="&age=";
        url+=age;


        var that=this;

        xmlHttp.onreadystatechange=function(){
            // that.setState({btntext: xmlHttp.responseText});
            // alert(xmlHttp.responseText);
            if (xmlHttp.readyState==4 && xmlHttp.status==200){
                //  alert(xmlHttp.responseText);
                var jsonstr=xmlHttp.responseText;
                var json=new Function("return" + jsonstr)();

                if(json.isdup!=0){
                    alert("用户名重名");

                }else {
                    that.handleModifyClose();
                    var newurl="http://localhost:8080/#/myinfo/";
                    newurl+=name;
                    window.location.href=newurl;
                    location.reload();
                }

            }

        };

        xmlHttp.open("GET",url,true);
        xmlHttp.send();

    },
    handleMaleChange(event, index, value){
        this.setState({isMale: value});
    },
    handleSnackerOpen(){
        this.setState({isSnackerOpen: true});
    },
    handleSnackerClose(){
        this.setState({isSnackerOpen: false});
    },
    handleAvatarOpen(){
        this.setState({isavatarUploadOpen:true});
    },
    handleAvatarClose(){
        this.setState({isavatarUploadOpen:false});
    },
    handleCoverClose(){
        this.setState({iscoverUploadOpen:false});
    },
    handleCoverOpen(){
        this.setState({iscoverUploadOpen:true});
    },
    handleExitDiaOpen(){
        this.setState({isExitDiaShow:true});
    },
    handleExitDiaClose(){
        this.setState({isExitDiaShow:false});
    },
    handleAddandDel(isadd){
        //todo
        var xmlHttp =GetXmlHttpObject();
        if (xmlHttp==null){
            alert ("Browser does not support HTTP Request")
            return
        }
        var url="http://localhost:8888/fitbook/friendadddel.php?ssid=";
        url+=getCookie("ssid");
        url+="&reply=";
        url+=isadd;
        url+="&friend=";
        url+=this.state.username;

        var that=this;
        xmlHttp.onreadystatechange=function(){
            // that.setState({btntext: xmlHttp.responseText});
            if (xmlHttp.readyState==4 && xmlHttp.status==200){
                if(xmlHttp.responseText==0){
                    alert("操作失败，请检查网络");
                }else {
                    that.handleExitDiaClose();
                    location.reload();
                }


            }
        };

        xmlHttp.open("GET",url,true);
        xmlHttp.send();


    },

    uploadavatar(){
        var url="http://localhost:8888/fitbook/avataruploader.php?ssid=";
        url+=getCookie("ssid");
        var avatar=document.getElementById('inputavatarfile').files[0];
        var xmlHttp =GetXmlHttpObject();
        var form = new FormData();
        form.append("pic", avatar);
        var that=this;
        xmlHttp.onreadystatechange=function(){
            // that.setState({btntext: xmlHttp.responseText});
            if (xmlHttp.readyState==4 && xmlHttp.status==200){

                if(xmlHttp.responseText==1){
                    that.handleAvatarClose();
                    location.reload();
                }else{
                    that.handleAvatarClose();
                    alert("上传出错！请检查网络");
                }
            }
        };

        xmlHttp.open("POST",url,true);
        xmlHttp.send(form);
    },
    uploadcover(){
        var url="http://localhost:8888/fitbook/coveruploader.php?ssid=";
        url+=getCookie("ssid");
        var cover=document.getElementById('inputcoverfile').files[0];
        var xmlHttp =GetXmlHttpObject();
        var form = new FormData();
        form.append("pic", cover);
        var that=this;
        xmlHttp.onreadystatechange=function(){
            // that.setState({btntext: xmlHttp.responseText});
            if (xmlHttp.readyState==4 && xmlHttp.status==200){

                if(xmlHttp.responseText==1){
                    that.handleCoverClose();
                    location.reload();
                }else{
                    that.handleCoverClose();
                    alert("上传出错！请检查网络");
                }
            }
        };

        xmlHttp.open("POST",url,true);
        xmlHttp.send(form);
    },
    componentDidMount: function() {
        this.initData();
        this.ColorChange();
    },
    initData(){

        var xmlHttp =GetXmlHttpObject();
        if (xmlHttp==null){
            alert ("Browser does not support HTTP Request")
            return
        }
        var url="http://localhost:8888/fitbook/leftinfogetter.php?ssid=";
        url+=getCookie("ssid");
        url+="&username=";
        url+=this.state.username;

        var that=this;
        xmlHttp.onreadystatechange=function(){
            // that.setState({btntext: xmlHttp.responseText});
            if (xmlHttp.readyState==4 && xmlHttp.status==200){
                var jsonstr=xmlHttp.responseText;
                var json=new Function("return" + jsonstr)();

                if(json.isava==0){
                    that.setState({username: "出现问题啦"});
                    that.setState({email: ""});
                    that.setState({level: ""});
                    that.setState({age: ""});
                    that.setState({gender: ""});
                    that.setState({addfriend: "none"});
                    that.setState({delfriend: "none"});
                }else{
                    that.setState({email: json.email});
                    that.setState({level: json.level});
                    that.setState({age: json.age});
                    that.setState({gender: json.gender});
                    that.setState({avatarlink: json.avatarlink});
                    that.setState({coverlink: json.coverlink});
                    that.setState({maincolor: json.maincolor});

                    if(json.ishimself==1){
                        that.setState({addfriend: "none"});
                        that.setState({delfriend: "none"});
                        that.setState({changedisplay: ""});
                    }else{
                        that.setState({changedisplay: "none"});
                        if(json.isfriend==1){
                            that.setState({addfriend: "none"});
                            that.setState({delfriend: ""});
                        }else{
                            that.setState({addfriend: ""});
                            that.setState({delfriend: "none"});
                        }
                    }

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
                onTouchTap={this.confirmModify}
            />,
        ];
        const avataruploadactions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleAvatarClose}
            />,
            <FlatButton
                label="上传"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.uploadavatar}
            />,
        ];
        const coveruploadactions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleCoverClose}
            />,
            <FlatButton
                label="上传"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.uploadcover}
            />,
        ];
        const exitactions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleExitDiaClose}
            />,
            <FlatButton
                label="删除"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleAddandDel.bind(this,0)}
            />,
        ];

        return (

            <div style={{width: '73%'}}>
                <div id="avatarcover">
                    <Avatar src={this.state.avatarlink} size={50} style={{border:'1px solid white'}}/>
                </div>
                <div id="cover" style={{backgroundImage: this.state.coverlink}}>
                </div>

                <div id="belowcover" style={{backgroundColor:this.state.maincolor}}>

                    <div style={{marginLeft:'20px',paddingTop:'20px',paddingBottom:'5px'}}>
                        <scan style={{fontSize:'30px',fontWeight:'600'}}>{this.state.username}</scan>
                        <scan style={{paddingLeft: '25px',fontWeight:'500'}}>等级: {this.state.level}</scan>
                    </div>
                    <div className="groupintrosub" style={{fontWeight:'500'}}>年龄: {this.state.age}&nbsp;&nbsp;&nbsp;&nbsp; 性别: {this.state.gender}</div>
                    <div className="groupintrosub" style={{fontWeight:'500'}}>邮箱: {this.state.email}</div>
                    <Divider />


                    <List >
                        <ListItem style={{color: '#ffffff'}} leftIcon={<ModifyIcon color={grey50} />} primaryText="修改个人资料" onTouchTap={this.handleModify}/>
                        <Divider style={{marginBottom:'7px'}}/>
                        <ListItem innerDivStyle={{backgroundColor:this.state.right1item}} hoverColor="#FFA400" id="right1"  leftIcon={<FriendIcon color={this.state.icon1} />} primaryText={<span style={{color:this.state.icon1}}>我的好友</span>} onTouchTap={this.handleDetail.bind(this,1)}/>
                        <ListItem innerDivStyle={{backgroundColor:this.state.right2item}} hoverColor="#FFA400" id="right2"  leftIcon={<GroupIcon color={this.state.icon2} />} primaryText={<span style={{color:this.state.icon2}}>我的群组</span>} onTouchTap={this.handleDetail.bind(this,2)}/>
                        <ListItem innerDivStyle={{backgroundColor:this.state.right3item}} hoverColor="#FFA400" id="right3"   leftIcon={<AtyIcon color={this.state.icon3} />} primaryText={<span style={{color:this.state.icon3}}>我的活动</span>} onTouchTap={this.handleDetail.bind(this,3)}/>
                        <ListItem innerDivStyle={{backgroundColor:this.state.right4item}}  hoverColor="#FFA400" id="right4"  leftIcon={<AtyIcon color={this.state.icon4} />} primaryText={<span style={{color:this.state.icon4}}>我的消息</span>} onTouchTap={this.handleDetail.bind(this,4)}/>
                    </List>

                    <RaisedButton
                        label="加为好友"
                        labelStyle={{fontWeight:'600',color:this.state.maincolor}}
                        style={{marginLeft:'20px',width:'100px',marginTop:'20px',display:this.state.addfriend}}
                        onTouchTap={this.handleAddandDel.bind(this,1)}
                    />

                    <RaisedButton
                        label="删除好友"
                        labelStyle={{fontWeight:'600',color:this.state.maincolor}}
                        style={{marginLeft:'20px',marginTop:'20px',width:'100px',display:this.state.delfriend}}
                        onTouchTap={this.handleExitDiaOpen}
                    />

                    <Snackbar
                        open={this.state.isSnackerOpen}
                        message={<div><SendIcon color={'white'} style={{paddingTop:'13px'}}/><span style={{float:'right'}}>请求已发送</span></div>}
                        autoHideDuration={4000}
                        onRequestClose={this.handleSnackerClose}
                    />
                </div>

                <Dialog
                    title="修改个人资料"
                    actions={actions}
                    modal={true}
                    open={this.state.isDialogShow}
                    onRequestClose={this.handleModifyClose}
                    contentStyle={{maxWidth: '350px'}}
                >

                    <div id="avatarcover">
                        <Avatar src={this.state.avatarlink} size={50} />
                        <IconButton
                            style={{marginLeft: '-50px'}}
                            iconStyle={{color: 'white'}}
                            onTouchTap={this.handleAvatarOpen}
                            tooltip="修改头像"
                            tooltipPosition="bottom-right">
                            <PhotoIcon />
                        </IconButton>
                    </div>
                    <div id="cover" style={{backgroundImage: this.state.coverlink}}>
                        <IconButton iconStyle={{color: 'grey700'}} onTouchTap={this.handleCoverOpen} tooltip="修改封面" tooltipPosition="bottom-right">
                            <PhotoIcon />
                        </IconButton>
                    </div>
                    <TextField ref="infoname" floatingLabelText="用户名" value={this.state.username}/><br/>
                    <span>性别 &nbsp;</span>
                    <DropDownMenu value={this.state.isMale}  onChange={this.handleMaleChange}>
                        <MenuItem value={1} primaryText="男" />
                        <MenuItem value={2} primaryText="女" />
                    </DropDownMenu><br/>

                    <TextField ref="infoage" floatingLabelText="年龄" value={this.state.age}/>

                    <div style={{height:'15px'}}>{this.state.infoerrormsg}</div>

                </Dialog>

                <Dialog
                    title="上传头像"
                    actions={avataruploadactions}
                    modal={true}
                    open={this.state.isavatarUploadOpen}
                    onRequestClose={this.handleAvatarClose}
                    contentStyle={{maxWidth: '350px'}}
                >

                    <FlatButton
                        label="选择文件"
                        icon={<UploadIcon/>}
                        onTouchTap={this.avatarpopupload}
                    />
                    <div><input type="file" style={{display:'none'}} id="inputavatarfile" onChange={this.addavatarfile}/> {this.state.uploadavatarname}</div><br/>

                </Dialog>

                <Dialog
                    title="上传封面"
                    actions={coveruploadactions}
                    modal={true}
                    open={this.state.iscoverUploadOpen}
                    onRequestClose={this.handleCoverClose}
                    contentStyle={{maxWidth: '350px'}}
                >

                    <FlatButton
                        label="选择文件"
                        icon={<UploadIcon/>}
                        onTouchTap={this.coverpopupload}
                    />
                    <div><input type="file" style={{display:'none'}} id="inputcoverfile" onChange={this.addcoverfile}/> {this.state.uploadcovername}</div><br/>

                </Dialog>

                <Dialog
                    title="删除该好友?"
                    actions={exitactions}
                    modal={true}
                    open={this.state.isExitDiaShow}
                    contentStyle={{width:'100%'}}
                ></Dialog>

            </div>
        );
    }
});

export default Cover;
