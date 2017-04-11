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

    getgroups(){

    },

    render() {

        return (

            <div className="rightwidth">

                <div className="haoyou">群组</div>
                <div>
                    <Card_group/>
                </div>
            </div>


        );
    }
});

export default DetailInfo;
