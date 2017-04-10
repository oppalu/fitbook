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

const subbarstyle = {
  height: 70,
  width: '97%',
  marginLeft: 5,
  marginTop:45,
  display: 'block',
};


const IndexCard = React.createClass({
  getInitialState(){
        return {
            isDialogOpen: false,
            isSnackerOpen:false,
            walk:0,
            // color3:'#666666',
            // color1:'#666666',
            // color2:'#666666',
            // tips:"走路步数较少，专家认为每天走6000步才能达到健身的效果，但只是只一次性的运动量，每天总共最好走1万步以上，" +
            // "4000步很容易达到，这6000必须一口气走完才能对健康有改善，提高人体血液循环能力，刺激心肺功能，增强免疫力。",
        }
  },

    // choose(a){
    //     switch (a){
    //         case 0:this.setState({tips:"走路步数较少，专家认为每天走6000步才能达到健身的效果，但只是只一次性的运动量，每天总共最好走1万步以上，" +
    //         "4000步很容易达到，这6000必须一口气走完才能对健康有改善，提高人体血液循环能力，刺激心肺功能，增强免疫力。"});
    //             this.setState({color1:'#666666'});
    //             this.setState({color2:'#666666'});
    //             this.setState({color3:'#666666'});
    //             break;
    //         case 1:this.setState({tips:"行走距离较远，每次行走的距离在5到10公里左右为最佳。也可根据自身情况逐步达到此水平。速度越快效果越好，但要量力而为，可根据身体情况逐步提高要求和速度。" +
    //         "注意量的增加，不要暴走。根据自身状况循序渐进贵在坚持。"});
    //             this.setState({color1:'#748fd1'});
    //             this.setState({color2:'#666666'});
    //             this.setState({color3:'#666666'});
    //             break;
    //         case 2:this.setState({tips:"行走时间较长，可以保持；每次要至少持续半个小时以上有利于健康，如果时间有限，也可以将30分钟到1个小时的集中行走分散到各个零散时间段内进行，" +
    //         "但是要保持总时间量的不变；每个人的体力不同，总体原则是运动后轻微出汗、自我感觉不过度疲劳；速度很关键，应保持在每分钟120步到140步左右。"});
    //             this.setState({color2:'#748fd1'});
    //             this.setState({color1:'#666666'});
    //             this.setState({color3:'#666666'});
    //             break;
    //         case 3:this.setState({tips:"消耗热量较多，人体每减掉一公斤脂肪，需消耗7700卡热量，有两种燃烧热量的方法：" +
    //         "交替间隔步行(燃烧500卡路里，需持续75分钟），5分钟的热身后，以12分钟走1.5公里的速度走完4公里，再以正常的速度走10分钟，" +
    //         "然后快速走完4公里再常速行走10分钟；长距离的步行(燃烧500卡路里，需持续60分钟）。"});
    //             this.setState({color3:'#748fd1'});
    //             this.setState({color1:'#666666'});
    //             this.setState({color2:'#666666'});
    //             break;
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
            <div style={{display:'inline-block',background:'url(./assets/circleblue.png)',
                backgroundSize:'100% 100%',width:170,height:170,marginTop:'5%',cursor:'pointer'}}>
                <div style={{height:'30%'}}></div>
                <div style={{fontSize:18,color:'white',marginLeft:'27%'}}>昨日计步</div>
                <div style={{fontSize:28,color:'white',marginLeft:'28%'}}>5127</div>
            </div>

            <div style={{display:'inline-block',width: '67%',marginTop:'8%',verticalAlign:'top',paddingLeft:'6%'}}>
                <div>

                <ul className="nav nav-tabs nav-justified" style={{display:'inline-block',width: '90%'}}>
                    <li role="presentation" className="active"><a href="#walkdistance" data-toggle="tab">行走距离<br/>6.7km</a></li>
                    <li role="presentation"><a href="#walktime" data-toggle="tab">活跃时间<br/>5h4min</a></li>
                    <li role="presentation"><a href="#walkcalorie" data-toggle="tab">消耗热量<br/>46.76kCal</a></li>
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
                    <div className="tab-pane fade in active" id="walkdistance">
                        <p>行走距离较远，每次行走的距离在5到10公里左右为最佳。也可根据自身情况逐步达到此水平。速度越快效果越好，
                            但要量力而为，可根据身体情况逐步提高要求和速度。注意量的增加，不要暴走。根据自身状况循序渐进贵在坚持。</p>
                    </div>
                    <div className="tab-pane fade" id="walktime">
                        <p>行走时间较长，可以保持；每次要至少持续半个小时以上有利于健康，如果时间有限，也可以将30分钟到1个小时的集中行走分散到各个零散时间段内进行，
                            但是要保持总时间量的不变；每个人的体力不同，总体原则是运动后轻微出汗、自我感觉不过度疲劳；速度很关键，应保持在每分钟120步到140步左右。</p>
                    </div>
                    <div className="tab-pane fade" id="walkcalorie">
                        <p>消耗热量较多，人体每减掉一公斤脂肪，需消耗7700卡热量，有两种燃烧热量的方法：
                            交替间隔步行(燃烧500卡路里，需持续75分钟），5分钟的热身后，以12分钟走1.5公里的速度走完4公里，再以正常的速度走10分钟，
                            然后快速走完4公里再常速行走10分钟；长距离的步行(燃烧500卡路里，需持续60分钟）。</p>
                    </div>
                </div>
                {/*<div className="sleepDiv" onClick={()=>this.choose(1)}>*/}
                    {/*<span className="labelSpan" style={{color:this.state.color1}}>行走距离</span>*/}
                    {/*<br/>*/}
                    {/*<span className="contentSpan" style={{color:this.state.color1}}>6.7km</span>*/}
                {/*</div>*/}

                {/*<div className="sleepDiv"*/}
                     {/*onClick={()=>this.choose(2)}>*/}
                    {/*<span className="labelSpan" style={{color:this.state.color2}}>活跃时间</span>*/}
                    {/*<br/>*/}
                    {/*<span className="contentSpan" style={{color:this.state.color2}}>5h4min</span>*/}
                {/*</div>*/}

                {/*<div className="sleepDiv" style={{border:'none'}}*/}
                     {/*onClick={()=>this.choose(3)} >*/}
                    {/*<span className="labelSpan" style={{color:this.state.color3}}>消耗热量</span>*/}
                    {/*<br/>*/}
                    {/*<span className="contentSpan" style={{color:this.state.color3}}>46.76kCal</span>*/}
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
