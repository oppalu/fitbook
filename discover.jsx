import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';
import FriendIcon from 'material-ui/svg-icons/action/face';
import GroupIcon from 'material-ui/svg-icons/social/people';
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';
import HotIcon from 'material-ui/svg-icons/social/whatshot';
import HotTab from './hotTab.jsx';
import {Tabs, Tab} from 'material-ui/Tabs';
import Card_group from './groupCard.jsx';
import Card_aty from './atyCard.jsx';
import AandD from './appbaranddrawer.jsx';

const discover = React.createClass({
    getInitialState(){
        return {
            username: this.props.username,
            friendnum: "",
            rowobj: "",
            rowatyobj: "",
            atynum: "",
            atyTip: "",
            friendTip: "",
            remainAty: "",
            remainFriend: ""
        }
    },
    componentDidMount: function () {
        this.getatys();
    },
    refresh(name){
        var url = "http://localhost:8080/#/myinfo/";
        url += name;
        url += "?refs=yes";
        window.location.href = url;

        location.reload();


    },
    // setFriendTip(){
    //     if (this.state.friendTip == "展开") {
    //         this.setState({friendTip: "收起"});
    //         this.state.rowobj.push(this.state.remainFriend);
    //         this.render();
    //     } else if (this.state.friendTip == "收起") {
    //         this.setState({friendTip: "展开"});
    //         this.state.rowobj.splice(8);
    //         this.render();
    //     }
    // },
    // getfriends(){
    //
    //     var xmlHttp = GetXmlHttpObject();
    //     if (xmlHttp == null) {
    //         alert("Browser does not support HTTP Request")
    //         return
    //     }
    //     var url = "http://127.0.0.1:80/php/friendgetter.php?username=";
    //     url += this.state.username;
    //     var that = this;
    //     xmlHttp.onreadystatechange = function () {
    //         // that.setState({btntext: xmlHttp.responseText});
    //         if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    //             var rows = [];
    //             var tmp_friend = [];
    //             var jsonstr = xmlHttp.responseText;
    //             var json = new Function("return" + jsonstr)();
    //
    //             var max = 8;
    //
    //             that.setState({friendnum: json.length + "人"});
    //
    //             if (json.length == 0) {
    //                 rows.push("还没有好友");
    //             } else if (json.length > 0 && json.length <= max) {
    //                 for (var i = 0; i < json.length; i++) {
    //                     rows.push(<Card_friend friendname={json[i].username} avatarlink={json[i].avatarlink}
    //                                            coverlink={json[i].coverLink} maincolor={json[i].mainColor}/>);
    //                 }
    //             } else if (json.length > max) {
    //                 that.setState({friendTip: "展开"});
    //                 for (var i = 0; i < max; i++) {
    //                     rows.push(<Card_friend friendname={json[i].username} avatarlink={json[i].avatarlink}
    //                                            coverlink={json[i].coverLink} maincolor={json[i].mainColor}/>);
    //                 }
    //                 for (var i = max; i < json.length; i++) {
    //                     tmp_friend.push(<Card_friend friendname={json[i].username} avatarlink={json[i].avatarlink}
    //                                                  coverlink={json[i].coverLink} maincolor={json[i].mainColor}/>);
    //                 }
    //             }
    //             that.setState({rowobj: rows});
    //             that.setState({remainFriend: tmp_friend});
    //             that.render();
    //         }
    //     };
    //
    //
    //     xmlHttp.open("GET", url, true);
    //     xmlHttp.send();
    //
    //
    // },
    getgroups(){

    },
    setAtyTip(){
        if (this.state.atyTip == "展开") {
            this.setState({atyTip: "收起"});
            this.state.rowatyobj.push(this.state.remainAty);
            this.render();
        } else if (this.state.atyTip == "收起") {
            this.setState({atyTip: "展开"});
            this.state.rowatyobj.splice(6);
            this.render();
        }
    },

    getatys(){
        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null) {
            alert("Browser does not support HTTP Request")
            return
        }
        var url = "http://127.0.0.1:8888/fitbook/getAllAty.php";
        var that = this;
        xmlHttp.onreadystatechange = function () {
            // that.setState({btntext: xmlHttp.responseText});
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var rows = [];
                var tmp_aty = [];
                var jsonstr = xmlHttp.responseText;
                var json = new Function("return" + jsonstr)();

                that.setState({atynum: json.length + "个"});

                var max = 6;
                // alert(jsonstr);
                if (json.length == 0) {
                    rows.push("暂时没有活动");
                } else if (json.length <= max && json.length > 0) {
                    for (var i = 0; i < json.length; i++) {
                        rows.push(<Card_aty title={json[i].title} atyid={json[i].atyid} num={json[i].num}
                                            intro={json[i].intro} coverlink={json[i].coverlink}
                                            maincolor={json[i].maincolor}/>);
                    }
                } else if (json.length > max) {
                    that.setState({atyTip: "展开"});
                    for (var i = 0; i < max; i++) {
                        rows.push(<Card_aty title={json[i].title} atyid={json[i].atyid} num={json[i].num}
                                            intro={json[i].intro} coverlink={json[i].coverlink}
                                            maincolor={json[i].maincolor}/>);
                    }
                    for (var i = max; i < json.length; i++) {
                        tmp_aty.push(<Card_aty title={json[i].title} atyid={json[i].atyid} num={json[i].num}
                                               intro={json[i].intro} coverlink={json[i].coverlink}
                                               maincolor={json[i].maincolor}/>);
                    }
                }
                that.setState({rowatyobj: rows});
                that.setState({remainAty: tmp_aty});
                that.render();
            }
        };


        xmlHttp.open("GET", url, true);
        xmlHttp.send();

    },

    render() {

        return (


<div>

  <AandD id="4"/>
    <div style={{height:'61px'}}></div>
    <div style={{paddingTop:'40px'}}>
        <div id="discoverLeft">
            <Tabs inkBarStyle={{backgroundColor:'#FFEB3B'}} tabItemContainerStyle={{height:'70px'}}>
                <Tab
                    icon={<HotIcon/>}
                    label={<div style={{color:'white',zIndex:'999',fontSize:'18px'}}>热门</div>}
                    value={1}
                />
            </Tabs>
            <div >
                <HotTab />
            </div>
        </div>

        <div className="discover">
            <div className="discover_grp">群组一览</div>
            <div className="tip"></div>
            <div><Card_group/></div>
            {/*<div className="discover_aty">*/}
                {/**/}
            {/*</div>*/}
            <div className="discover_aty">活动一览</div>
            <div className="tip" onClick={this.setAtyTip}>{this.state.atyTip}</div>
            {this.state.rowatyobj}
        </div>
     </div>
</div>

        );
    }
});

export default discover;
