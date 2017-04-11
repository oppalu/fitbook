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
            // color3:'#666666',
            // color1:'#666666',
            // color2:'#666666',
            // tips:"有效睡眠时间略短，青年人每天应睡8小时左右，结合睡眠总时长，进入熟睡所需时间较长，睡前不宜过度兴奋，可适当听音乐放松。",
            // tips:"晚上9-11点为免疫系统排毒时间，此段时间应安静或听音乐；晚间11-凌晨1点，肝的排毒，需在熟睡中进行；凌晨1-3点，胆的排毒，亦同；" +
            // "凌晨3-5点，肺的排毒；" +
            // "凌晨5-7点，大肠的排毒；早上7-9点，小肠大量吸收营养的时段。",
        }
    },

  // choose(a){
  //     switch (a){
  //         case 0:this.setState({tips:"有效睡眠时间略短，青年人每天应睡8小时左右，结合睡眠总时长，进入熟睡所需时间较长，睡前不宜过度兴奋，可适当听音乐放松。"});
  //             this.setState({color1:'#666666'});
  //             this.setState({color2:'#666666'});
  //             this.setState({color3:'#666666'});
  //             break;
  //         case 1:this.setState({tips:"入睡时间较晚，应在十点左右入睡比较好，最晚不得晚于十一点。长时间熬夜，就算是睡足8小时，几年下来会容易内分泌失调生理时钟也会乱掉。"});
  //             this.setState({color1:'#748fd1'});
  //             this.setState({color2:'#666666'});
  //             this.setState({color3:'#666666'});
  //         break;
  //         case 2:this.setState({tips:"起床时间较为适宜，根据研究在7:21之后起床对身体健康更加有益；早上喝一杯清水，可以补充晚上的缺水状态；" +
  //             "早饭可以帮助你维持血糖水平的稳定；" +
  //         "早晨免疫系统在这个时间的功能最弱，不宜锻炼。"});
  //             this.setState({color2:'#748fd1'});
  //             this.setState({color1:'#666666'});
  //             this.setState({color3:'#666666'});
  //             break;
  //         case 3:this.setState({tips:"睡眠总时间较为充足，青年人每天应睡8小时左右。睡觉时间过长，会打乱人体生物钟，导致精神不振，影响记忆力，并且会错过早餐，造成饮食紊乱；长期熬夜会影响内分泌，导致免疫力下降，皮肤受损。"});
  //             this.setState({color3:'#748fd1'});
  //             this.setState({color1:'#666666'});
  //             this.setState({color2:'#666666'});
  //             break;
  //     }
  //
  // },
  // changeColor(a){
  //     switch (a){
  //
  //         case 1:
  //             this.setState({color1:'#0096ff'});
  //             break;
  //         case 2:
  //             this.setState({color2:'#0096ff'});
  //             break;
  //         case 3:
  //             this.setState({color3:'#0096ff'});
  //             break;
  //     }
  // },
  //   recoverColor(a){
  //       switch (a){
  //
  //           case 1:
  //               this.setState({color1:'#666666'});
  //               break;
  //           case 2:
  //               this.setState({color2:'#666666'});
  //               break;
  //           case 3:
  //               this.setState({color3:'#666666'});
  //               break;
  //       }
  //   },

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
    var url="http://127.0.0.1:80/fitbook/poster.php?ssid=";
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
        <div style={{width: '100%'}}>
            {/*<div style={{display:'inline-block',width:170,height:170,verticalAlign:'top',marginTop:'6%'}}>*/}
                {/*<canvas id="c"></canvas>*/}
                {/*/!*<input type="range" name="range" min="0" max="100" step="1"/>*!/*/}
            {/*</div>*/}

            <div id="bluecircle" style={{display:'inline-block',background:'url(./assets/circleblue.png)',
                backgroundSize:'100% 100%',width:170,height:170,verticalAlign:'top',marginTop:'6%',cursor:'pointer'}}>
               <div style={{height:'30%'}}></div>
                <div style={{fontSize:18,color:'white',marginLeft:'17%'}}>
                    {/*<IconButton tooltiip="进入深度睡眠的时长" tooltipPosition="top-right">*/}
                        有效睡眠时长
                    {/*</IconButton>*/}
                </div>

                <div style={{fontSize:28,color:'white',marginLeft:'18%'}}>7h10min</div>
            </div>

            <div style={{display:'inline-block',width: '67%',marginTop:'9%',verticalAlign:'top',paddingLeft:'6%'}}>
                <div>

                    <ul className="nav nav-tabs nav-justified" style={{display:'inline-block',width: '90%'}}>
                        <li role="presentation" className="active"><a href="#distance" data-toggle="tab">入睡时间<br/>23:43</a></li>
                        <li role="presentation"><a href="#time" data-toggle="tab">起床时间<br/>08:00</a></li>
                        <li role="presentation"><a href="#calorie" data-toggle="tab">睡眠总时长<br/>8h17min</a></li>
                    </ul>

                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        style={{float:'right',marginTop:'-10px'}}
                    >
                        <MenuItem  onTouchTap={this.handleDialogOpen} primaryText="分享"  leftIcon={<ShareIcon />}/>
                        <Link to={{ pathname: '/stats/0' }}  style={{ textDecoration: 'none' }}>    <MenuItem primaryText="历史数据"  leftIcon={<HistoryIcon />}/> </Link>
                    </IconMenu>
                </div>

                <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade in active" id="distance">
                        <p>入睡时间较晚，应在十点左右入睡比较好，最晚不得晚于十一点。长时间熬夜，就算是睡足8小时，几年下来会容易内分泌失调生理时钟也会乱掉。</p>
                    </div>
                    <div className="tab-pane fade" id="time">
                        <p>起床时间较为适宜，根据研究在7:21之后起床对身体健康更加有益；早上喝一杯清水，可以补充晚上的缺水状态；</p>
                    </div>
                    <div className="tab-pane fade" id="calorie">
                        <p>睡眠总时间较为充足，青年人每天应睡8小时左右。睡觉时间过长，会打乱人体生物钟，导致精神不振，影响记忆力，
                            并且会错过早餐，造成饮食紊乱；长期熬夜会影响内分泌，导致免疫力下降，皮肤受损。</p>
                    </div>
                </div>
                {/*<div style={{height:'7%'}}> </div>*/}

                {/*<div className="sleepDiv"*/}
                     {/*onClick={()=>this.choose(1)}>*/}
                    {/*<span className="labelSpan" style={{color:this.state.color1}}>入睡时间</span>*/}
                    {/*<br/>*/}
                    {/*<span className="contentSpan" style={{color:this.state.color1}}>23:43</span>*/}
                {/*</div>*/}

                {/*<div className="sleepDiv" onClick={()=>this.choose(2)}>*/}
                    {/*<span className="labelSpan" style={{color:this.state.color2}}>起床时间</span>*/}
                    {/*<br/>*/}
                    {/*<span className="contentSpan" style={{color:this.state.color2}}>08:00</span>*/}
                {/*</div>*/}

                {/*<div className="sleepDiv" style={{border:'none'}} onClick={()=>this.choose(3)}>*/}
                    {/*<span className="labelSpan" style={{color:this.state.color3}}>睡眠总时长</span>*/}
                    {/*<br/>*/}
                    {/*<span className="contentSpan" style={{color:this.state.color3}}>8h17min</span>*/}
                {/*</div>*/}

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

                {/*<div style={{display:'inline-block',width: '100%',marginTop:'3%',verticalAlign:'top'}}>*/}
                    {/*<div style={{display:'inline-block',marginLeft:'8%',width:'1%',maxWidth:4,*/}
                        {/*height:'100%',minHeight:50,backgroundColor:'#748fd1',verticalAlign:'top'}}></div>*/}
                    {/*<p style={{display:'inline-block',marginLeft:'3%',width:'85%'}}>{this.state.tips}</p>*/}
                {/*</div>*/}
            </div>

        </div>


    );

  }
});

export default IndexCard;
