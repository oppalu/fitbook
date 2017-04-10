import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import BellIcon from 'material-ui/svg-icons/social/notifications';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {Link} from 'react-router';
import Badge from 'material-ui/Badge';
import Drawer from 'material-ui/Drawer';
import MessageBar from './messagebar.jsx';
import AppBar from 'material-ui/AppBar';
import PortraitCard from './portrait.jsx';


const CTopBtn = React.createClass({
    getInitialState(){
        return {
            open: false,
            isSubDrawerOpen: false,
            msgobj: "",
            path: "/search/",
            infoLen: 0,
            notification:"",
        }
    },
    handleSubDrawerOpen() {
        this.setState({isSubDrawerOpen: true});
    },
    handleSubDrawerClose() {
        this.setState({isSubDrawerOpen: false});
    },
    refresh(){
        // location.reload();
        //
        if (this.refs.keyword.getValue() == "") {
            return;
        } else {
            var url = "http://localhost:8080/#/search/";
            url += this.refs.keyword.getValue();
            url += "?refs=yes";
            window.location.href = url;

            location.reload();
        }

    },

    refreshBadge(){
        var url = "http://localhost:8080/#/about";
        window.location.href = url;
        location.reload();
        // this.setState({isSubDrawerOpen: true});
    },

    // changeMsgNum(){
    //     // alert(this.state.infoLen);
    //   this.setState({infoLen:1});
    //     // alert(this.state.infoLen);
    // },

    handleTouchTap(event){
        event.preventDefault();
        this.setState({open: true, anchorEl: event.currentTarget,});
    },
    handleRequestClose(){
        this.setState({open: false});
    },
    handlePressEnter(event){
        if (event.keyCode == 13)
            this.refresh();
    },
    gohome(){
        document.getElementById("gohome").click();
    },
    gotocircle(){
        document.getElementById("gotocircle").click();
    },
    gotosearch(){
        document.getElementById("searchicon").click();
    },
    componentDidMount: function () {
        this.initData();
    },
    initData(){
        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null) {
            alert("Browser does not support HTTP Request")
            return
        }

        var url = "http://127.0.0.1:8888/fitbook/msggetter.php?ssid=";
        url += getCookie("ssid");

        var that = this;
        {/*xmlHttp.onreadystatechange = function () {*/}
            {/*// that.setState({btntext: xmlHttp.responseText});*/}
            {/*if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {*/}
                {/*var jsonstr = xmlHttp.responseText;*/}
                {/*var json = new Function("return" + jsonstr)();*/}

                {/*// alert(that.state.infoLen);*/}
                {/*var rows = [];*/}
                {/*var notification = [];*/}
                {/*if (json.length == 0) {*/}
                    {/*rows.push(<div>目前没有消息</div>);*/}
                    {/*notification.push(<BellIcon style={{color: 'white', verticalAlign: '-40%', cursor: 'pointer', paddingTop: '0',paddingRight:'20',paddingLeft:'10'}}*/}
                                                {/*onTouchTap={that.handleSubDrawerOpen} />);*/}
                {/*} else {*/}
                    {/*var num=0;*/}

                    {/*for (var i = 0; i < json.length; i++) {*/}
                        {/*if(json[i].state==-1){*/}
                            {/*num++;*/}
                        {/*}*/}
                        {/*var realtitle = "";*/}

                        {/*if (json[i].challangename == "-1") {*/}
                            {/*realtitle = "邀请你加入 ";*/}
                            {/*realtitle += json[i].title;*/}
                        {/*} else {*/}
                            {/*realtitle = "向你挑战 ";*/}
                            {/*realtitle += json[i].title;*/}
        //                 }
        //
        //                 rows.push(<MessageBar sendername={json[i].username} avatarlink={json[i].avatarlink}
        //                                       msgid={json[i].msgid} state={json[i].state} title={realtitle}/>);
        //             }
        //
        //             // that.setState({infoLen: num});
        //
        //             if(num>0){
        //                 notification.push(<Badge
        //                     badgeContent={''}
        //                     secondary={true}
        //                     badgeStyle={{top: 0, right: 25,width:'10px',height:'10px'}}
        //                     style={{verticalAlign:'-40%',cursor:'pointer',paddingTop:'0'}}
        //                     onTouchTap={that.handleSubDrawerOpen}
        //                 >
        //                     <BellIcon style={{color: 'white'}}/>
        //                 </Badge>);
        //             }else {
        //                 notification.push(<BellIcon style={{color: 'white', verticalAlign: '-40%', cursor: 'pointer', paddingTop: '0',paddingRight:'20',paddingLeft:'10'}}
        //                                             onTouchTap={that.handleSubDrawerOpen} />);
        //             }
        //         }
        //
        //         that.setState({msgobj: rows});
        //         that.setState({notification:notification})
        //
        //     }
        // };

        xmlHttp.open("GET", url, true);
        xmlHttp.send();


    },


    render() {
        return (
            <div style={{marginTop:'8px'}}>




                <div id="searchTextAndIcon">
                    <TextField
                        hintStyle={{color: '#FCFDFD'}}
                        ref="keyword"
                        hintText="查找用户/活动/群组"
                        underlineFocusStyle={{borderColor: "#FCFDFD"}}
                        inputStyle={{color: "white"}}
                        style={{width: "200px"}}
                        onKeyDown={this.handlePressEnter}
                    />

                    <FlatButton
                        icon={ <SearchIcon color={"#ffffff"}/> }
                        style={{minWidth: '0px'}}
                        id="searchicon"
                        onTouchTap={this.refresh}
                        onMouseEnter={{backgroundColor: '#00c1d7'}}
                    />

                </div>

                {/*<Link to="/about"><FlatButton label="首页"*/}
                {/*id="gohome"*/}
                {/*labelStyle={{color:"white"}}*/}
                {/*onTouchTap={this.gohome}*/}
                {/*/></Link>*/}

                {/*<Link to="/circle">  <FlatButton label="运动圈"*/}
                {/*id="gotocircle"*/}
                {/*labelStyle={{color:"white"}}*/}
                {/*onTouchTap={this.gotocircle}*/}
                {/*/>*/}
                {/*</Link>*/}

                <PortraitCard />


                {/*<Badge*/}
                {/*badgeContent={''}*/}
                {/*secondary={true}*/}
                {/*badgeStyle={{top: 0, right: 25,width:'10px',height:'10px'}}*/}
                {/*style={{verticalAlign:'-40%',cursor:'pointer',paddingTop:'0'}}*/}
                {/*onTouchTap={this.handleSubDrawerOpen}*/}
                {/*>*/}
                    {/*<BellIcon style={{color: 'white'}}/>*/}
                {/*</Badge>*/}

                {/*<BellIcon style={{color: 'white', verticalAlign: '-40%', cursor: 'pointer', paddingTop: '0'}}*/}
                {/*onTouchTap={this.handleSubDrawerOpen}/>*/}
                {this.state.notification}
                <BellIcon style={{
                    color: 'white',
                    verticalAlign: '-40%',
                    cursor: 'pointer',
                    paddingTop: '0',
                    display: 'none'
                }}/>

                <Drawer width={300} openSecondary={true} open={this.state.isSubDrawerOpen}
                        onRequestChange={this.handleSubDrawerClose} docked={false}>
                    <AppBar title="消息" iconElementLeft={<BellIcon
                        style={{color: 'white', width: '30px', height: '30px', marginTop: '8px'}}/>}/>


                    {this.state.msgobj}


                </Drawer>


            </div>
        );

    }
});

export default CTopBtn;
