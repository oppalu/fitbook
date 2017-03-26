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
    url+="1";
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
          <div style={{backgroundColor:'#00c1d7',height:'408px',width:'40%',display:'inline-block'}}>
            <div style={{fontSize:'35px',marginLeft:'10px',color:'#fefefe',fontFamily:'FitbookFont'}}>FitBook</div>

            <div style={{fontSize:'20px',marginLeft:'10px',color:'#fefefe'}}>昨晚睡眠</div>


        <div>
            <span style={{fontSize:'145px',marginLeft:'10px',color:'#fefefe',fontFamily:'NumberFont'}}>8</span>

            <span style={{fontSize:'45px',marginLeft:'10px',color:'#fefefe',fontFamily:'NumberFont'}}>小时</span>
        </div>
          <div style={{marginTop:'-70px'}}>

            <span style={{fontSize:'25px',color:'#fefefe',fontFamily:'NumberFont',marginRight:'10px',float:'right',marginTop:'25px'}}>分</span>
              <span style={{fontSize:'45px',color:'#fefefe',fontFamily:'NumberFont',marginRight:'10px',float:'right'}}>34</span>

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
      <Link to={{ pathname: '/stats/0' }}  style={{ textDecoration: 'none' }}>    <MenuItem primaryText="历史数据"  leftIcon={<HistoryIcon />}/> </Link>
       </IconMenu>

  <Paper className="indexbar" zDepth={0} style={barstyle} >
    <div style={{paddingTop:'10px',marginLeft:'10px'}}>
      <big>入睡时间</big>
      <big style={{float:'right',marginRight:'10px'}}>23:43</big>
    </div>
    <div style={{marginTop:'15px',marginRight:'20px'}}>
      <IconButton tooltip="得分:78" touch={true} tooltipPosition="top-right" style={{width:'100%'}}>
    <LinearProgress  mode="determinate" value={70} color='#00c1d7' style={{marginLeft:'10px'}}/>
    </IconButton>
    </div>
  </Paper>

  <Paper className="indexbar" zDepth={0} style={barstyle} >
    <div style={{paddingTop:'10px',marginLeft:'10px'}}>
      <big>起床时间</big>
      <big style={{float:'right',marginRight:'10px'}}>08:00</big>
    </div>
    <div style={{marginTop:'15px',marginRight:'20px'}}>
    <LinearProgress mode="determinate" value={40} color='#00c1d7' style={{marginLeft:'10px'}}/>
    </div>
  </Paper>

  <Paper className="indexbar" zDepth={0} style={barstyle} >
    <div style={{paddingTop:'10px',marginLeft:'10px'}}>
      <big>深睡眠时间</big>
      <big style={{float:'right',marginRight:'10px'}}>5小时4分</big>
    </div>
    <div style={{marginTop:'15px',marginRight:'20px'}}>
    <LinearProgress mode="determinate" value={90} color='#00c1d7' style={{marginLeft:'10px'}}/>
    </div>
  </Paper>

  <Paper className="indexbar" zDepth={0} style={barstyle} >
    <div style={{paddingTop:'10px',marginLeft:'10px'}}>
      <big>浅睡眠时间</big>
      <big style={{float:'right',marginRight:'10px'}}>3小时12分</big>
    </div>
    <div style={{marginTop:'15px',marginRight:'20px'}}>
    <LinearProgress mode="determinate" value={70} color='#00c1d7' style={{marginLeft:'10px'}}/>
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

                   <div style={{marginTop:'20px'}}>已添加今日睡眠数据：{this.state.sleep}</div>

                 </Dialog>




      </Paper>





    );

  }
});

export default IndexCard;
