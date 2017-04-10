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
            // color4:'#666666',
            // tips:"晚上9-11点为免疫系统排毒时间，此段时间应安静或听音乐；晚间11-凌晨1点，肝的排毒，需在熟睡中进行；凌晨1-3点，胆的排毒，亦同；" +
            // "凌晨3-5点，肺的排毒；" +
            // "凌晨5-7点，大肠的排毒；早上7-9点，小肠大量吸收营养的时段。",
        }
  },
    //
    // choose(a){
    //     switch (a){
    //         case 0:this.setState({tips:"总距离略微有点短，每天应跑3千米左右，结合自身情况量力而行，不能太累，目的在于出汗，促进血液循环流通，增强身体免疫力，" +
    //         "可随跑步天数增加而适当增加距离，重在坚持。"});
    //             this.setState({color1:'#666666'});
    //             this.setState({color2:'#666666'});
    //             this.setState({color3:'#666666'});
    //             this.setState({color4:'#666666'});
    //             break;
    //         case 1:this.setState({tips:"中小学生，入睡时间应安排在晚上8点-9点；一般工薪阶层，入睡应安排在晚上9点-10点；年轻人习惯于入睡时间不应晚于11点-12点，否则会影响身体的正常代谢," +
    //         "爱美的人，应该在凌晨2:00之前睡,老人在晚上9:00--10:00之间睡觉比较好。"});
    //             this.setState({color1:'#748fd1'});
    //             this.setState({color2:'#666666'});
    //             this.setState({color3:'#666666'});
    //             this.setState({color4:'#666666'});
    //             break;
    //         case 2:this.setState({tips:"研究发现，那些在早上5:22―7:21 分起床的人，其血液中有一种能引起心脏病的物质含量较高，" +
    //         "因此，在7:21之后起床对身体健康更加有益；早上喝一杯清水，可以补充晚上的缺水状态；" +
    //         "早饭可以帮助你维持血糖水平的稳定；" +
    //         "早晨免疫系统在这个时间的功能最弱，不宜锻炼"});
    //             this.setState({color2:'#748fd1'});
    //             this.setState({color1:'#666666'});
    //             this.setState({color3:'#666666'});
    //             this.setState({color4:'#666666'});
    //             break;
    //         case 3:this.setState({tips:"60岁以上老年人：每天应睡5.5~7小时;30～60岁成年人：每天应睡7小时左右;13～29岁青年人：每天应睡8小时左右;" +
    //         "4～12岁儿童：每天应睡10～12小时;1～3岁幼儿：每晚12小时，白天两三个小时;1～3岁幼儿：每晚12小时，白天两三个小时"});
    //             this.setState({color3:'#748fd1'});
    //             this.setState({color1:'#666666'});
    //             this.setState({color2:'#666666'});
    //             this.setState({color4:'#666666'});
    //             break;
    //         case 4:this.setState({tips:"60岁以上老年人：每天应睡5.5~7小时;30～60岁成年人：每天应睡7小时左右;13～29岁青年人：每天应睡8小时左右;" +
    //         "4～12岁儿童：每天应睡10～12小时;1～3岁幼儿：每晚12小时，白天两三个小时;1～3岁幼儿：每晚12小时，白天两三个小时"});
    //             this.setState({color4:'#748fd1'});
    //             this.setState({color1:'#666666'});
    //             this.setState({color2:'#666666'});
    //             this.setState({color3:'#666666'});
    //             break;
    //
    //     }
    //
    // },

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
            alert("发布失败，请检查 网络");
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
            <div style={{display:'inline-block',background:'url(./assets/circleblue.png)',
                backgroundSize:'100% 100%',width:170,height:170,marginTop:'5%',cursor:'pointer'}}>
                <div style={{height:'30%'}}></div>
                <div style={{fontSize:18,color:'white',marginLeft:'25%'}}>昨日骑行</div>
                <div style={{fontSize:28,color:'white',marginLeft:'25%'}}>16.7km</div>
            </div>

            <div style={{display:'inline-block',width: '67%',marginTop:'8%',verticalAlign:'top',paddingLeft:'6%'}}>
                <div>

                    <ul className="nav nav-tabs nav-justified" style={{display:'inline-block',width: '90%'}}>
                        <li role="presentation" className="active"><a href="#time" data-toggle="tab">耗时<br/>32min</a></li>
                        <li role="presentation"><a href="#avgspeed" data-toggle="tab">平均速度<br/>5.2km/h</a></li>
                        <li role="presentation"><a href="#maxspeed" data-toggle="tab">最大速度<br/>7.2km/h</a></li>
                        <li role="presentation"><a href="#calorie" data-toggle="tab">消耗热量<br/>1098.8kCal</a></li>
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
                    <div className="tab-pane fade in active" id="time">
                        <p>中小学生，入睡时间应安排在晚上8点-9点；一般工薪阶层，入睡应安排在晚上9点-10点；年轻人习惯于入睡时间不应晚于11点-12点，
                            否则会影响身体的正常代谢,爱美的人，应该在凌晨2:00之前睡,老人在晚上9:00--10:00之间睡觉比较好。</p>
                    </div>
                    <div className="tab-pane fade" id="avgspeed">
                        <p>研究发现，那些在早上5:22―7:21 分起床的人，其血液中有一种能引起心脏病的物质含量较高，
                            因此，在7:21之后起床对身体健康更加有益；早上喝一杯清水，可以补充晚上的缺水状态；
                            早饭可以帮助你维持血糖水平的稳定；
                            早晨免疫系统在这个时间的功能最弱，不宜锻炼。</p>
                    </div>
                    <div className="tab-pane fade" id="maxspeed">
                        <p></p>
                    </div>
                    <div className="tab-pane fade" id="calorie">
                        <p></p>
                    </div>
                </div>
                {/*<div style={{height:'7%'}}></div>*/}

                {/*<div style={{width:'23%'}} className="sleepDiv"*/}
                     {/*onClick={()=>this.choose(1)}>*/}
                    {/*<span className="labelSpan" style={{color:this.state.color1}}>耗时</span>*/}
                    {/*<br/>*/}
                    {/*<span className="contentSpan" style={{color:this.state.color1}}>32min</span>*/}
                {/*</div>*/}

                {/*<div style={{width:'23%'}} className="sleepDiv"*/}
                     {/*onClick={()=>this.choose(2)}>*/}
                    {/*<span className="labelSpan" style={{color:this.state.color2}}>平均速度</span>*/}
                    {/*<br/>*/}
                    {/*<span className="contentSpan" style={{color:this.state.color2}}>5.2km/h</span>*/}
                {/*</div>*/}

                {/*<div style={{width:'23%'}} className="sleepDiv"*/}
                     {/*onClick={()=>this.choose(3)}>*/}
                    {/*<span className="labelSpan" style={{color:this.state.color3}}>最大速度</span>*/}
                    {/*<br/>*/}
                    {/*<span className="contentSpan" style={{color:this.state.color3}}>7.2km/h</span>*/}
                {/*</div>*/}

                {/*<div style={{width:'23%',border:'none'}} className="sleepDiv"*/}
                     {/*onClick={()=>this.choose(4)}>*/}
                    {/*<span className="labelSpan" style={{color:this.state.color4}}>消耗热量</span>*/}
                    {/*<br/>*/}
                    {/*<span className="contentSpan" style={{color:this.state.color4}}>1098.8kCal</span>*/}
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
                        {/*height:'100%',minHeight:80,backgroundColor:'#748fd1',verticalAlign:'top'}}></div>*/}
                    {/*<p style={{display:'inline-block',marginLeft:'3%',width:'85%'}}>{this.state.tips}</p>*/}
                {/*</div>*/}
            </div>
        </div>

    );

  }
});

export default IndexCard;
