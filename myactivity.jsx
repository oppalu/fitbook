import React from 'react';
import {Card,CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import ShowmoreIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';
import { Link } from 'react-router';

const MyAtyCard = React.createClass({
  getInitialState(){
    return{

      atyobj:"",
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
    var url="http://localhost:8888/fitbook/ciratygetter.php?ssid=";
    url+=getCookie("ssid");

    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var rows = [];
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();

        if(json.length==0){
          rows.push(<div>还没有参与的活动~</div>);
        }else{
          var len=0;

          if(json.length>5){
            len=5;
          }else{
            len=json.length;
          }

          for(var i=0;i<len;i++){
            var path='/atyinfo/'+json[i].atyid;

            rows.push( <Link to={{ pathname: path }} style={{ textDecoration: 'none' }} ><ListItem
            primaryText={json[i].title}
            leftAvatar={<AtyIcon/>}
            /> </Link>);
          }

          that.setState({atyobj: rows});


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
          title="我的活动"
          titleStyle={{fontSize:'25px'}}
          style={{cursor:'pointer'}}
        >
        </CardHeader>

        <List>
            {this.state.atyobj}

        </List>

      </Card>





        </div>
    );
  }
});

export default MyAtyCard;
