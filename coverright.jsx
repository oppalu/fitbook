import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';
import FriendIcon from 'material-ui/svg-icons/action/face';
import GroupIcon from 'material-ui/svg-icons/social/people';
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';

import Card_friend from './friendCard.jsx';
import Card_group from './groupCard.jsx';
import Card_aty from './atyCard.jsx';


const DetailInfo = React.createClass({
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
        this.getfriends();
    },
    refresh(name){
        // location.reload();
        //

        var url = "http://localhost:8080/#/myinfo/";
        url += name;
        url += "?refs=yes";
        window.location.href = url;

        location.reload();


    },
    setFriendTip(){
        if (this.state.friendTip == "展开") {
            this.setState({friendTip: "收起"});
            this.state.rowobj.push(this.state.remainFriend);
            this.render();
        } else if (this.state.friendTip == "收起") {
            this.setState({friendTip: "展开"});
            this.state.rowobj.splice(8);
            this.render();
        }
    },
    getfriends(){

        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null) {
            alert("Browser does not support HTTP Request")
            return
        }
        var url = "http://localhost:8888/fitbook/friendgetter.php?username=";
        url += this.state.username;
        var that = this;
        xmlHttp.onreadystatechange = function () {
            // that.setState({btntext: xmlHttp.responseText});
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var rows = [];
                var tmp_friend = [];
                var jsonstr = xmlHttp.responseText;
                var json = new Function("return" + jsonstr)();

                var max = 8;

                that.setState({friendnum: json.length + "人"});

                if (json.length == 0) {
                    rows.push("还没有好友");
                } else if (json.length > 0 && json.length <= max) {
                    for (var i = 0; i < json.length; i++) {
                        rows.push(<Card_friend friendname={json[i].username} avatarlink={json[i].avatarlink}
                                               coverlink={json[i].coverLink} maincolor={json[i].mainColor}/>);
                    }
                } else if (json.length > max) {
                    that.setState({friendTip: "展开"});
                    for (var i = 0; i < max; i++) {
                        rows.push(<Card_friend friendname={json[i].username} avatarlink={json[i].avatarlink}
                                               coverlink={json[i].coverLink} maincolor={json[i].mainColor}/>);
                    }
                    for (var i = max; i < json.length; i++) {
                        tmp_friend.push(<Card_friend friendname={json[i].username} avatarlink={json[i].avatarlink}
                                                     coverlink={json[i].coverLink} maincolor={json[i].mainColor}/>);
                    }
                }
                // for (var i = 0; i < json.length; i++) {
                //     rows.push(<Card_friend friendname={json[i].username} avatarlink={json[i].avatarlink}
                //                            coverlink={json[i].coverLink} maincolor={json[i].mainColor}/>);
                // rows.push(<ListItem
                //   primaryText={json[i].username}
                //   onTouchTap={that.refresh.bind(that, json[i].username)}
                //   leftAvatar={<Avatar src={json[i].avatarlink} />}
                //
                //   />);
                // }
                that.setState({rowobj: rows});
                that.setState({remainFriend: tmp_friend});
                that.render();
            }
        };


        xmlHttp.open("GET", url, true);
        xmlHttp.send();


    },

    render() {

        return (

            <div className="rightwidth">
                {/*<div className="quanzi">圈子</div>*/}
                <div className="haoyou">好友</div>
                {/*{alert(this.state.friendTip)}*/}
                <div className="friendTip" onClick={this.setFriendTip}>{this.state.friendTip}</div>

                <div>
                    {this.state.rowobj}
                </div>


            </div>


        );
    }
});

export default DetailInfo;
