import React from 'react';
import AandD from './appbaranddrawer.jsx';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import FriendIcon from 'material-ui/svg-icons/action/face';
import GroupIcon from 'material-ui/svg-icons/social/people';
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import PostCard from './postcard.jsx';


const PostManage = React.createClass({
  getInitialState(){
        return {
            btntext:"null",
            slideIndex: 0,
            postobj:"",
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
      var url="http://localhost:8888/fitbook/postmanagegetter.php?ssid=";
      url+=getCookie("ssid");
      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();
          var rows = [];
          for(var i=0;i<json.length;i++){
            rows.push(<PostCard isManage="1" likenum={json[i].likenum} username={json[i].username} datetime={json[i].date+" "+json[i].time} postid={json[i].postid}
            content={json[i].content} sporttypeurl={json[i].sporttypeurl}  sportdata={json[i].adddata} avatarlink={json[i].useravatar} isliked={json[i].isliked}/>);
          }

          if(json.length==0){
            rows.push(<div>还没有发布过动态</div>);
          }


            that.setState({postobj: rows});


        }
      };

      xmlHttp.open("GET",url,true);
      xmlHttp.send();
    },


  getpost(){
    var rows = [];
    for(var i=0;i<6;i++){
      rows.push(<PostCard isManage="1"/>);
    }

    return rows;

  },

  render() {

    return (
        <div>
        <AandD />
        <div id="postcardmanageheight"></div>
        <div id="postcardmanage">
        <p style={{color:'#5A5A5A'}}>我的时间线</p>


        {this.state.postobj}





        </div>
        </div>
    );
  }
});

export default PostManage;
