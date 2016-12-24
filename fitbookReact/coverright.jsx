import React from 'react';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import FriendIcon from 'material-ui/svg-icons/action/face';
import GroupIcon from 'material-ui/svg-icons/social/people';
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';





const DetailInfo = React.createClass({
  getInitialState(){
    return{
      username: this.props.username,
      friendnum:"",
      rowobj:"",
      rowatyobj:"",
      atynum:"",

    }
  },
  componentDidMount: function() {
      this.getfriends();
      this.getatys();
  },
  refresh(name){
    // location.reload();
    //

       var url="http://localhost:8080/#/myinfo/";
       url+=name;
       url+="?refs=yes";
       window.location.href=url;

       location.reload();



  },
  getfriends(){

    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://127.0.0.1/friendgetter.php?username=";
    url+=this.state.username;
    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var rows = [];
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();

        that.setState({friendnum: json.length+"人"});

        for(var i=0;i<json.length;i++){


          rows.push(<ListItem
            primaryText={json[i].username}
            onTouchTap={that.refresh.bind(that, json[i].username)}
            leftAvatar={<Avatar src={json[i].avatarlink} />}

            />);
        }
          that.setState({rowobj: rows});





      }
    };


    xmlHttp.open("GET",url,true);
    xmlHttp.send();




  },
  getgroups(){

  },
  getatys(){
    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://127.0.0.1/atygetter.php?username=";
    url+=this.state.username;
    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var rows = [];
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();

        that.setState({atynum: json.length+"个"});

        for(var i=0;i<json.length;i++){



          rows.push(<Link to={"/atyinfo/"+json[i].atyid} style={{ textDecoration: 'none' }}><ListItem
        primaryText={json[i].title}
        leftAvatar={<AtyIcon/>}
        /></Link>);
        }
          that.setState({rowatyobj: rows});





      }
    };


    xmlHttp.open("GET",url,true);
    xmlHttp.send();

  },

  render() {

    return (

      <div className="rightwidth">
      <div className="quanzi">圈子</div>



      <div>
      <Card style={{marginTop:'30px'}}>
      <CardHeader
          title="好友"
          style={{cursor:'pointer'}}
          avatar={<FriendIcon/>}
          subtitle={this.state.friendnum}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
        <List>

              {this.state.rowobj}

        </List>

        </CardText>

      </Card>
      </div>





      <div>
      <Card>
      <CardHeader
          title="群组"
          style={{cursor:'pointer'}}
          avatar={<GroupIcon/>}
          subtitle="1组"
          actAsExpander={true}
          showExpandableButton={true}
        >


        </CardHeader>
        <CardText expandable={true}>
        <List>
            <Link to="/groupInfo" style={{ textDecoration: 'none' }}> <ListItem
              primaryText="马拉松爱好者"
              leftAvatar={<GroupIcon/>}
              />
            </Link>

        </List>

        </CardText>

      </Card>
      </div>


      <div>
      <Card>
      <CardHeader
          title="活动"
          style={{cursor:'pointer'}}
          avatar={<AtyIcon/>}
          subtitle={this.state.atynum}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
        <List>
                {this.state.rowatyobj}
        </List>

        </CardText>

      </Card>
      </div>




        </div>

    );
  }
});

export default DetailInfo;
