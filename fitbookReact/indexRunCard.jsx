import React from 'react';
import Paper from 'material-ui/Paper';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ShareIcon from 'material-ui/svg-icons/social/share';
import HistoryIcon from 'material-ui/svg-icons/av/equalizer';
import LinearProgress from 'material-ui/LinearProgress';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const style = {
  height: 102*4,
  width: 158*4,
  margin: 20,
  marginTop:23,
  display: 'inline-block',
};

const barstyle = {
  height: 70,
  width: '97%',
  marginLeft: 5,
  marginTop:15,
  display: 'block',
};


const IndexCard = React.createClass({
  getInitialState(){
        return {
            isDialogOpen: false,
            isSnackerOpen:false,
            sleep:0,
        }
    },

  handleDialogOpen() {
  this.setState({isDialogOpen: true});
  },
  handleDialogClose() {
  this.setState({isDialogOpen: false});
  },
  handleSnackerOpen(){
    this.setState({isSnackerOpen: true});
  },
  handleSnackerClose(){
    this.setState({isSnackerOpen: false});
  },
  dopost(){

    var content=this.refs.content.getValue();

    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request");
      return;
    }
    var url="http://127.0.0.1/poster.php?ssid=";
    url+=getCookie("ssid");
    url+="&type=";
    url+="2";
    url+="&content=";
    url+=content;
    url+="&sportdata=";
    url+=this.state.distance;

    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
          if(xmlHttp.responseText==1){
            that.handleSnackerOpen();
            that.handleDialogClose();

          }else{
            alert("发布失败，请检查网络");
          }

      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();

  },

  render() {
    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={this.handleDialogClose}
      />,
     <FlatButton
       label="发布"
       primary={true}
       keyboardFocused={true}
       onTouchTap={this.dopost}
     />,
   ];

   const postactions = [

    <FlatButton
      label="关闭"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.handleSnackerClose}
    />,
  ];


    return (
      <Paper zDepth={1} style={style} >
          <div style={{backgroundColor:'#d7a532',height:'408px',width:'40%',display:'inline-block'}}>
            <div style={{fontSize:'35px',marginLeft:'10px',color:'#fefefe',fontFamily:'FitbookFont'}}>FitBook</div>

            <div style={{fontSize:'20px',marginLeft:'10px',color:'#fefefe'}}>昨日距离</div>


              <div style={{marginTop:'20px'}}>
                  <span style={{fontSize:'115px',marginLeft:'10px',color:'#fefefe',fontFamily:'NumberFont'}}>2.5</span>


              </div>
                <div style={{marginTop:'-60px'}}>

                  <span style={{fontSize:'45px',color:'#fefefe',fontFamily:'NumberFont',marginRight:'10px',float:'right',marginTop:'35px'}}>公里</span>

            </div>

          </div>

          <div style={{display:'inline-block',width:'60%',height:'408px',verticalAlign:'top'}}>
            <div style={{fontSize:'28px',marginLeft:'10px',marginTop:'10px',display:'inline-block'}}>详细数据</div>

              <IconMenu
         iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
         anchorOrigin={{horizontal: 'right', vertical: 'top'}}
         targetOrigin={{horizontal: 'right', vertical: 'top'}}
         style={{float:'right',marginTop:'10px'}}
       >
         <MenuItem  onTouchTap={this.handleDialogOpen} primaryText="分享"  leftIcon={<ShareIcon />}/>
      <Link to={{ pathname: '/stats/2' }}  style={{ textDecoration: 'none' }}>    <MenuItem primaryText="历史数据"  leftIcon={<HistoryIcon />}/> </Link>
       </IconMenu>

  <Paper className="indexbar" zDepth={0} style={barstyle} >
    <div style={{paddingTop:'10px',marginLeft:'10px'}}>
      <big>耗时</big>
      <big style={{float:'right',marginRight:'10px'}}>32分钟</big>
    </div>
    <div style={{marginTop:'15px',marginRight:'20px'}}>
    <LinearProgress mode="determinate" value={70} color='#d7a532' style={{marginLeft:'10px'}}/>
    </div>
  </Paper>

  <Paper className="indexbar" zDepth={0} style={barstyle} >
    <div style={{paddingTop:'10px',marginLeft:'10px'}}>
      <big>平均速度</big>
      <big style={{float:'right',marginRight:'10px'}}>5.2km/h</big>
    </div>
    <div style={{marginTop:'15px',marginRight:'20px'}}>
    <LinearProgress mode="determinate" value={40} color='#d7a532' style={{marginLeft:'10px'}}/>
    </div>
  </Paper>

  <Paper className="indexbar" zDepth={0} style={barstyle} >
    <div style={{paddingTop:'10px',marginLeft:'10px'}}>
      <big>最大速度</big>
      <big style={{float:'right',marginRight:'10px'}}>7.8km/h</big>
    </div>
    <div style={{marginTop:'15px',marginRight:'20px'}}>
    <LinearProgress mode="determinate" value={90} color='#d7a532' style={{marginLeft:'10px'}}/>
    </div>
  </Paper>

  <Paper className="indexbar" zDepth={0} style={barstyle} >
    <div style={{paddingTop:'10px',marginLeft:'10px'}}>
      <big>消耗热量</big>
      <big style={{float:'right',marginRight:'10px'}}>1098.8kCal</big>
    </div>
    <div style={{marginTop:'15px',marginRight:'20px'}}>
    <LinearProgress mode="determinate" value={70} color='#d7a532' style={{marginLeft:'10px'}}/>
    </div>
  </Paper>



          </div>



                <Dialog
                   title="发布一个动态"
                   actions={actions}
                   modal={true}
                   open={this.state.isDialogOpen}
                   onRequestClose={this.handleDialogClose}
                   contentStyle={{maxWidth: '500px'}}
                 >
                 <TextField
                        ref="content"
                        floatingLabelText="你最近有什么新鲜事要分享吗?"
                       multiLine={true}
                       rows={5}
                       rowsMax={10}
                       fullWidth={true}
                       underlineShow={false}
                     />

                   <div style={{marginTop:'20px'}}>已添加今日跑步数据：{this.state.sleep}</div>

                 </Dialog>




      </Paper>





    );

  }
});

export default IndexCard;
