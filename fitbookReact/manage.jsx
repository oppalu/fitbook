import React from 'react';
import AandD from './appbaranddrawer.jsx';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import FriendIcon from 'material-ui/svg-icons/action/face';
import GroupIcon from 'material-ui/svg-icons/social/people';
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';


const Stat = React.createClass({
  getInitialState(){
    return{
      keyword:this.props.keyword,
      userobj:"",
      atyobj:"",
      usernum:"0",
      atynum:"0",
      isDelDiaShow:false,
      delpara:"",

    }
  },
  componentDidMount: function() {
      this.initData();
  },
  handleDelDiaOpen(para){
    this.setState({isDelDiaShow:true});
    this.setState({delpara:para});


  },
  handleDelDiaClose(){
    this.setState({isDelDiaShow:false});
  },
  handleDelete(){

    var realname=this.state.delpara.substring(1);
    if(this.state.delpara.substring(0,1)=='u'){
      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request")
        return
      }
      var url="http://localhost:8888/fitbook/fastuserdeleter.php?username=";
      url+=realname;

      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();
          if(json.issucc==0){
              alert("删除失败，请检查网络");
          }else {

            that.setState({isDelDiaShow:false});
            location.reload();

          }
        }
      };

      xmlHttp.open("GET",url,true);
      xmlHttp.send();


    }else{
      var xmlHttp =GetXmlHttpObject();
      if (xmlHttp==null){
        alert ("Browser does not support HTTP Request")
        return
      }
      var url="http://localhost:8888/fitbook/fastatydeleter.php?atyid=";
      url+=realname;

      var that=this;
      xmlHttp.onreadystatechange=function(){
        // that.setState({btntext: xmlHttp.responseText});
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
          var jsonstr=xmlHttp.responseText;
          var json=new Function("return" + jsonstr)();
          if(json.issucc==0){
              alert("删除失败，请检查网络");
          }else {

            that.setState({isDelDiaShow:false});
            location.reload();

          }
        }
      };

      xmlHttp.open("GET",url,true);
      xmlHttp.send();






    }



  },
  initData(){
    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://localhost:8888/fitbook/search.php?keyword=";
    url+="@@";


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

          rows1.push(<ListItem
            onTouchTap={that.handleDelDiaOpen.bind(that,"u"+json[0][i].username)}
          primaryText={json[0][i].username}
          leftAvatar={<Avatar src={json[0][i].avatarlink} />}
          /> );
        }

        that.setState({userobj: rows1});


        var rows2=[];
        for(var i=0;i<json[1].length;i++){
          var path='/atyinfo/'+json[1][i].atyid;

          rows2.push(<ListItem
            onTouchTap={that.handleDelDiaOpen.bind(that,"a"+json[1][i].atyid)}
          primaryText={json[1][i].title}
          leftAvatar={<AtyIcon/>}
          /> );
        }

        that.setState({atyobj: rows2});




      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();

  },

  render() {
    const delactions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleDelDiaClose}
      />,
      <FlatButton
        label="删除"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDelete}
      />,
    ];

    return (
        <div>
        <AandD />

        <div id="searchBlock">
        <p style={{color:'#5A5A5A'}}>管理</p>

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

        <Dialog
            title="删除?"
            actions={delactions}
            modal={true}
            open={this.state.isDelDiaShow}
            contentStyle={{width:'100%'}}
        ></Dialog>


        </div>
        </div>
        </div>
    );
  }
});

export default Stat;
