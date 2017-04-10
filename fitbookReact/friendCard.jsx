import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const Card_friend = React.createClass({
    getInitialState(){
        return{
            avatarlink: this.props.avatarlink,
            friendname: this.props.friendname,
            maincolor: this.props.maincolor,
            coverlink: this.props.coverlink,
        }
    },

    checkFriend(name){
        var url="http://localhost:8080/#/myinfo/";
        url+=name;
        url+="?refs=yes";
        window.location.href=url;

        location.reload();
    },

    render() {
        // alert(this.state.friendname);
        return (
            <div style={{width:170,height:180,display:'inline-block',marginRight:'30px',
                marginBottom:'20px',cursor:'pointer'}}
                 onClick={this.checkFriend.bind(this,this.state.friendname)}>

                <Card style={{width:170,height:180}}>
                    <div style={{width:170,height:100}}>
                        <img src={this.state.coverlink} style={{width:170,height:100}}/>
                    </div>
                    <div style={{width:170,height:80,backgroundColor:this.state.maincolor}}>
                        <Avatar src={this.state.avatarlink} size={30} style={{marginTop:"-50%",marginLeft:18,zIndex:30,position:"relative"}}/>
                        <CardTitle title={this.state.friendname} titleColor={'white'} titleStyle={{fontSize:18}} style={{marginTop:-20}} />
                    </div>

                </Card>


            </div>

            // <Link to={"/myinfo/tracy"+"?refs=yes"}  style={{ textDecoration: 'none' }}>
            //
            // </Link>


        );
    }
});

export default Card_friend;
