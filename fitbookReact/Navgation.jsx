import React from 'react';
import FlatButton from 'material-ui/FlatButton';


import { Link ,browserHistory} from 'react-router';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';




const Nav= React.createClass({

  getInitialState(){
        return {
            selectedIndex:this.props.id,

            index1class:'',
            index2class:'',
            index3class:'',
            index4class:'',

            index1TypeClass:'Navtitle',
              index2TypeClass:'Navtitle',
                index3TypeClass:'Navtitle',
                  index4TypeClass:'Navtitle',

                  btnheight:'85px',
                  path:'',

        }
    },
    componentDidMount: function () {
      this.initData();
      switch (this.state.selectedIndex) {
        case "0":
          this.setState({index1class:'white'});
          this.setState({index2class:''});
          this.setState({index3class:''});
          this.setState({index4class:''});
          this.setState({index1TypeClass:'NavtitleInv'});

          break;
        case "1":
        this.setState({index1class:''});
        this.setState({index2class:'white'});
        this.setState({index3class:''});
        this.setState({index4class:''});

        this.setState({index2TypeClass:'NavtitleInv'});

          break;

        case "2":
        this.setState({index1class:''});
        this.setState({index2class:''});
        this.setState({index3class:'white'});
        this.setState({index4class:''});

        this.setState({index3TypeClass:'NavtitleInv'});

            break;
        case "3":
        this.setState({index1class:''});
        this.setState({index2class:''});
        this.setState({index3class:''});
        this.setState({index4class:'white'});

        this.setState({index4TypeClass:'NavtitleInv'});
        this.setState({btnheight:'71px'});

            break;
        default:

      }

    },

  goToIndex(){
    alert("dasd");
  },
  handleIndex(state){
      switch (state) {
        case 0:
          window.location.href="http://localhost:8080/#/about";
          break;

        case 1:
          window.location.href="http://localhost:8080/#/circle";
          break;
        case 2:
            window.location.href="http://localhost:8080/#"+this.state.path;
            break;
        case 3:
            window.location.href="http://localhost:8080/#/stats";
            break;
        default:

      }
  },

  initData(){


    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://127.0.0.1/appbargetter.php?ssid=";
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



  render() {





    return (
    <div>
      <img  id="appdrawerIcon" src="assets/icon.png" onTouchTap={this.goToIndex} style={{cursor:'pointer',display:'inline-block',marginRight:'70px'}}/>

        <BottomNavigation selectedIndex={this.state.selectedIndex} style={{display:'inline-block',width:'auto',verticalAlign:'top',height:'80px',marginTop:'-7px',backgroundColor:'rgba(255,255,255,0.0)'}}>
            <BottomNavigationItem style={{height:'85px',backgroundColor:this.state.index1class}}

              label={<div className={this.state.index1TypeClass}>今日数据</div>}
              icon={<span />}
              onTouchTap={this.handleIndex.bind(this,0)}

            />
          <BottomNavigationItem  style={{height:'85px',backgroundColor:this.state.index2class}}
              label={<div className={this.state.index2TypeClass}>运动圈</div>}
              icon={<span />}
              onTouchTap={this.handleIndex.bind(this,1)}
            />

          <BottomNavigationItem  style={{height:'85px',backgroundColor:this.state.index3class}}
              label={<div className={this.state.index3TypeClass}>个人主页</div>}
              icon={<span />}
              onTouchTap={this.handleIndex.bind(this,2)}

            />

          <BottomNavigationItem  style={{height:this.state.btnheight,backgroundColor:this.state.index4class}}
              label={<div className={this.state.index4TypeClass}>统计分析</div>}
              icon={<span />}
              onTouchTap={this.handleIndex.bind(this,3)}

            />


          </BottomNavigation>


    </div>
    );
  }
});

export default Nav;
