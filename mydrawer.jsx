import React from 'react';
import Divider from 'material-ui/Divider';
import LevelIcon from 'material-ui/svg-icons/action/grade';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import {List, ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import CircleIcon from 'material-ui/svg-icons/action/explore';
import HomeIcon from 'material-ui/svg-icons/action/home';
import {Link} from 'react-router';
import EditorInsertChartIcon from 'material-ui/svg-icons/editor/insert-chart';

const MyDrawer = React.createClass({


  getInitialState(){
    return{
      color1:'',
      color2:'',
      color3:'',
      color4:'',
      username:'',
      path:''
    }
  },

  initData(){


    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://localhost:8888/fitbook/appbargetter.php?ssid=";
    url+=getCookie("ssid");
    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
        var jsonstr=xmlHttp.responseText;
        var json=new Function("return" + jsonstr)();
        if(json.isava==0){
          alert("something wrong at left drawer!")
        }else{

          that.setState({username: json.username});

          var infopath="/myinfo/"+that.state.username
          that.setState({path: infopath});

        }


      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();
  },





  componentDidMount: function() {
    var item=this.props.activeItem;




    if(item=="1"){
      this.setState({color1:"#ac51e7"});
      this.setState({color2:""});
      this.setState({color3:""});
      this.setState({color4:""});
    }else if (item=="2") {
      this.setState({color1:""});
      this.setState({color2:"#ccbd88"});
      this.setState({color3:""});
      this.setState({color4:""});

    }else if (item=="3") {
      this.setState({color1:""});
      this.setState({color2:""});
      this.setState({color3:"#f1a83d"});
      this.setState({color4:""});

    }else if (item=="4") {
      this.setState({color1:""});
      this.setState({color2:""});
      this.setState({color3:""});
      this.setState({color4:"#569ea5"});

    }


    this.initData();






  },




  render() {





    return (
      <div className="originalDrawer" style={{display:'inline-block'}} >

      <List>


      <Link to={{ pathname: '/about' }} style={{ textDecoration: 'none' }} >  <ListItem
          primaryText={'今日数据'}
          leftAvatar={<Avatar icon={ <ActionAssignment/>} backgroundColor={this.state.color1}/>}
          hoverColor="#fffbfb"
          style={{color:this.state.color1}}
          secondaryText="01-01, 2017"
        /></Link>



      <Link to={{ pathname: '/circle' }} style={{ textDecoration: 'none' }} >   <ListItem
          primaryText={'运动圈'}
          leftAvatar={<Avatar icon={ <CircleIcon/>} backgroundColor={this.state.color2} />}
          hoverColor="#fffbfb"
          style={{color:this.state.color2}}
          secondaryText="12条新动态"
        /></Link>


      <Link to={{ pathname: '/stats' }} style={{ textDecoration: 'none' }} >  <ListItem
         primaryText={'统计分析'}
        leftAvatar={<Avatar icon={ <EditorInsertChartIcon/>} backgroundColor={this.state.color3}  />}
         hoverColor="#fffbfb"
         style={{color:this.state.color3}}
         secondaryText="12-31, 2016"
       /></Link>

     <Link to={{ pathname: this.state.path }} style={{ textDecoration: 'none' }} > <ListItem
         primaryText={'个人主页'}
         leftAvatar={<Avatar icon={ <HomeIcon/>} backgroundColor={this.state.color4} />}
         hoverColor="#fffbfb"
         style={{color:this.state.color4}}
        /></Link>


      </List>


      </div>


    );

  }
});

export default MyDrawer;
