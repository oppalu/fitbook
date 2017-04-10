import React from 'react';
import AandD from './appbaranddrawer.jsx';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import FriendIcon from 'material-ui/svg-icons/action/face';
import GroupIcon from 'material-ui/svg-icons/social/people';
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router';


const Stat = React.createClass({
  getInitialState(){
    return{
      keyword:this.props.keyword,
      userobj:"",
      atyobj:"",
      usernum:"0",
      atynum:"0",

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
    var url="http://localhost:8888/fitbook/search.php?keyword=";
    url+=this.state.keyword;


    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();

        that.setState({usernum: json[0].length});
        that.setState({atynum: json[1].length});

        var rows1=[];
        for(var i=0;i<json[0].length;i++){
          var path='/myinfo/'+json[0][i].username;

          rows1.push( <Link to={{ pathname: path }} style={{ textDecoration: 'none' }} ><ListItem
          primaryText={json[0][i].username}
          leftAvatar={<Avatar src={json[0][i].avatarlink} />}
          /> </Link>);
        }

        that.setState({userobj: rows1});


        var rows2=[];
        for(var i=0;i<json[1].length;i++){
          var path='/atyinfo/'+json[1][i].atyid;

          rows2.push( <Link to={{ pathname: path }} style={{ textDecoration: 'none' }} ><ListItem
          primaryText={json[1][i].title}
          leftAvatar={<AtyIcon/>}
          /> </Link>);
        }

        that.setState({atyobj: rows2});




      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();

  },

  render() {

    return (
        <div>
        <AandD />

        <div id="searchBlock">
        <p style={{color:'#5A5A5A'}}>搜索: {this.state.keyword} &nbsp; 的结果</p>

        <div className="row">
        <Card initiallyExpanded={true} style={{marginTop:'40px'}}>
        <CardHeader
            title="用户"
            style={{cursor:'pointer'}}
            avatar={<FriendIcon/>}
            subtitle={this.state.usernum+"人"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
          <List>
              {this.state.userobj}

          </List>

          </CardText>

        </Card>
        </div>





        <div className="row">
        <Card>
        <CardHeader
            title="群组"
            style={{cursor:'pointer'}}
            avatar={<GroupIcon/>}
            subtitle="0个"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
          <List>

          </List>

          </CardText>

        </Card>
        </div>


        <div className="row">
        <Card>
        <CardHeader
            title="活动"
            style={{cursor:'pointer'}}
            avatar={<AtyIcon/>}
            subtitle={this.state.atynum+"个"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
          <List>
                {this.state.atyobj}

          </List>

          </CardText>

        </Card>
        </div>
        </div>
        </div>
    );
  }
});

export default Stat;
