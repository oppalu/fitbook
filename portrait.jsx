import React from 'react';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
var onClickOutside = require('react-onclickoutside');

const PortraitCard = onClickOutside(React.createClass({
    getInitialState(){
        return {
            isClose:true,
            isMale:1,
            avatarurl:"",
            username:"",
            email:"",
            level:"",
            exp:"",
            age:"",
            gender:"",
            jumpuser:"/#/myinfo/",
        }
    },

    handleOpen() {
        if(this.state.isClose){
            this.setState({isClose: false});
        }else{
            this.setState({isClose: true});
        }
    },

    handleClose() {
        this.setState({isClose: true});
    },
    handleClickOutside() {
        this.setState({isClose: true});
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
        var url="http://127.0.0.1:8888/fitbook/appbargetter.php?ssid=";
        url+=getCookie("ssid");
        // alert(url);

        var that=this;
        xmlHttp.onreadystatechange=function(){
            // that.setState({btntext: xmlHttp.responseText});
            if (xmlHttp.readyState==4 && xmlHttp.status==200){
                var jsonstr=xmlHttp.responseText;
                var json=new Function("return" + jsonstr)();
                // alert(json);
                if(json.isava==0){
                    alert("something wrong at left drawer!")
                }else{
                    that.setState({avatarurl: json.avatarlink});
                    that.setState({username: json.username});
                    that.setState({exp: json.exp});
                    that.setState({level: json.level});
                    that.setState({age: json.age});
                    that.setState({gender: json.gender});
                    that.setState({email: json.email});

                    var x=that.state.jumpuser+that.state.username;
                    that.setState({jumpuser: x});

                }
            }
        };

        xmlHttp.open("GET",url,true);
        xmlHttp.send();
    },

    render() {
        return (
            <div style={{ position:"relative",display: "inline-block",verticalAlign:"top",marginLeft:15}}>
                <div onTouchTap={this.handleOpen} style={{width:"100%",padding: 5, marginTop:7, cursor: "pointer"}}>
                    <Avatar src={this.state.avatarurl} size={30}/>
                    <div hidden={this.state.isClose}
                         style={{borderColor:"transparent",borderStyle:"dashed dashed solid",
                             borderWidth:"0 8.5px 8.5px",borderBottomColor:"rgba(0,0,0,.2)",
                        position:"absolute",left:8,zIndex:999,height:0,width:0,top:47}}></div>
                    <div hidden={this.state.isClose}
                         style={{borderColor:"transparent",borderStyle:"dashed dashed solid",borderWidth:"0 8.5px 8.5px",
                        borderBottomColor:"#fff", position:"absolute",left:8,zIndex:999,height:0,width:0,top:48}}></div>
                </div>
                <div style={{zIndex:990,position:"absolute",width:300,height:152,right:5,top:55,outline:"none",color:"#000",lineHeight:"normal",
                    border:"1px solid #ccc",borderColor:"rgba(0,0,0,.2)",boxShadow:"0 2px 10px rgba(0,0,0,.2)",borderRadius:2}}
                    hidden={this.state.isClose} >
                    <div style={{background:"white",height:100,width:300,padding:15}}>
                        <a href={this.state.jumpuser} style={{display:"inline-block",float:"left",cursor: "pointer",textDecoration:"none"}}>
                            <Avatar src={this.state.avatarurl} size={70} style={{border:'1px solid white'}}/>
                        </a>
                        <div style={{display:"inline-block",marginLeft:10,width:190,verticalAlign:"top"}}>
                            <div style={{fontWeight:"bold"}}>{this.state.username}</div>
                            <div style={{color:"#666"}}>{this.state.email}</div>
                            <span>{this.state.gender}&nbsp;&nbsp;&nbsp;</span>
                            <span>{this.state.age} </span>
                            <br/>
                            <span style={{color:"#36c"}}>{this.state.level.substr(2)}&nbsp;&nbsp;</span>
                            <span style={{color:"#36c"}}>{this.state.exp}</span>
                        </div>
                    </div>

                    <div style={{display:"inline-block",borderTop:"1px solid #ccc",borderColor:"rgba(0,0,0,.2)",background:"#f5f5f5",
                        height:50,width:300,paddingRight:10}}>
                        <RaisedButton style={{float:"right",marginTop:7}}
                            label="退出登录"
                            href="/">
                        </RaisedButton>
                    </div>
                </div>
            </div>
        );
    }
}));

export default PortraitCard;
