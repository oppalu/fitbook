import React from 'react';
import {Card,CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ShowmoreIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { Link } from 'react-router';

const FriendCard = React.createClass({
  getInitialState(){
    return{
      path:"",
      userobj:"",
    }
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
    var url="http://localhost:8888/fitbook/cirfriendgetter.php?ssid=";
    url+=getCookie("ssid");

    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var rows = [];
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();

        if(json.length==0){
          rows.push(<div>还没有好友~</div>);
        }else{
          var len=0;

          if(json.length>5){
            len=5;
          }else{
            len=json.length;
          }

          for(var i=0;i<len;i++){
            var path='/myinfo/'+json[i].username;

            rows.push( <Link to={{ pathname: path }} style={{ textDecoration: 'none' }} ><ListItem
            primaryText={json[i].username}
            leftAvatar={<Avatar src={json[i].avatarlink} />}
            /> </Link>);
          }

          that.setState({userobj: rows});


        }

      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();
  },
  render() {

    return (

      <div>
      <Card>
      <CardHeader
          title="我的好友"
          titleStyle={{fontSize:'25px'}}
          style={{cursor:'pointer'}}
        >

        </CardHeader>
        <List>
            {this.state.userobj}

        </List>

      </Card>





        </div>
    );
  }
});

export default FriendCard;
