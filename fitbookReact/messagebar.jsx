import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TickIcon from 'material-ui/svg-icons/action/done';
import CrossIcon from 'material-ui/svg-icons/content/clear';

const MessageBar = React.createClass({
    getInitialState(){
        return {
            agreetext: '同意',
            isAgree: '',
            rejecttext: '拒绝',
            isReject: '',
            sendername: this.props.sendername,
            avatarlink: this.props.avatarlink,
            msgid: this.props.msgid,
            title: this.props.title,
            state: this.props.state,
        }
    },

    // change(){
    //     this.props.callChange();
    // },

    handleAgree(){
        this.setState({isReject: 'none'});
        this.setState({agreetext: '已同意'});
        this.setState({state: 1});
        this.handleReply(1);
        var url = "http://localhost:8080/#/about";
        window.location.href = url;
        location.reload();
    },

    handleReject(){
        this.setState({rejecttext: '已拒绝'});
        this.setState({isAgree: 'none'});
        this.setState({state: 0});
        this.handleReply(0);
        var url = "http://localhost:8080/#/about";
        window.location.href = url;
        location.reload();
    },
    handleReply(reply){
        var xmlHttp = GetXmlHttpObject();
        if (xmlHttp == null) {
            alert("Browser does not support HTTP Request")
            return
        }
        var url = "http://127.0.0.1:80/fitbook/reply.php?msgid=";
        url += this.state.msgid;
        url += "&reply=";
        url += reply;


        var that = this;
        xmlHttp.onreadystatechange = function () {
            // that.setState({btntext: xmlHttp.responseText});
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                if (xmlHttp.responseText == 0) {
                    alert("加入失败，请检查网络");
                } else {

                }


            }
        };

        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    },

    componentDidMount: function () {
        this.initData();

    },
    initData(){
        if (this.state.state == "1") {
            this.setState({isReject: 'none'});
            this.setState({agreetext: '已同意'});
        } else if (this.state.state == "0") {
            this.setState({rejecttext: '已拒绝'});
            this.setState({isAgree: 'none'});
        }

    },


    render() {


        return (
            <div style={{borderTop: 'solid 1px #e0e0e0',marginTop:'5%',minHeight:70}}>
                <Card>





                    <CardText style={{marginTop: '-25px', marginBottom: '-15px'}}>
                        <Avatar src={this.state.avatarlink} size={50}/>
                        <div style={{
                            display: 'inline-block',
                            verticalAlign: '50%',
                            fontSize: '15px',
                            marginLeft:'5%'
                        }}>
                            <span>{this.state.sendername+this.state.title}</span></div>

                        <div style={{
                            display: 'inline-block',
                            verticalAlign: '50%',
                            marginTop:'1%',
                            float:'right',
                            fontSize: '13px',
                            color: '#ff0079',
                            marginRight: '10px',
                            cursor: 'pointer',
                            display: this.state.isReject
                        }} onTouchTap={this.handleReject} >{this.state.rejecttext}</div>
                        <div style={{
                            display: 'inline-block',
                            verticalAlign: '50%',
                            marginTop:'1%',
                            float:'right',
                            fontSize: '13px',
                            color: '#00c1d7',
                            marginRight: '10px',
                            cursor: 'pointer',
                            display: this.state.isAgree
                        }} onTouchTap={this.handleAgree} >{this.state.agreetext}</div>
                    </CardText>


                </Card>
            </div>
        );
    }
});

export default MessageBar;
