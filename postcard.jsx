import React from 'react';
import {Card,CardHeader,CardMedia,CardText,CardActions} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import UpIcon from 'material-ui/svg-icons/action/thumb-up';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import {darkBlack,grey300,grey400} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

const PostCard = React.createClass({

  getInitialState(){

    return{
      likebg:'#eaeaea',
      isManage:this.props.isManage,
      isDeleted:'',
      likenum:this.props.likenum,
      username:this.props.username,
      timesection:this.props.datetime,
      content:this.props.content,
      sporttypeurl:this.props.sporttypeurl,
      sportdata:this.props.sportdata,
      avatarlink:this.props.avatarlink,
      icondisplay:"",
      isliked:this.props.isliked,
      postid:this.props.postid,
      isDelDiaShow:false,
    }
  },

  handleLike(){
    if(this.state.likebg=='#eaeaea'){
      this.setState({likebg: '#41B0CA'});
      this.setState({likenum: this.state.likenum+1});
      this.sendlikedata(1);

    }else{
      this.setState({likebg: '#eaeaea'});
      this.setState({likenum: this.state.likenum-1});
      this.sendlikedata(-1);
    }
  },
  handleDelete(){
    this.setState({isDeleted: 'none'});

    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://localhost:8888/fitbook/postdeleter.php?postid=";

    url+=this.state.postid;


    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
          if(xmlHttp.responseText=="0"){
            alert("删除失败，请检查网络");
            this.setState({isDeleted: ''});
          }

          that.handleDelDiaClose();
      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();

  },
  handleDelDiaOpen(){
    this.setState({isDelDiaShow:true});
  },
  handleDelDiaClose(){
    this.setState({isDelDiaShow:false});
  },
  handleExpand(){
    if(this.state.expanded == true) {
        this.setState({expanded:false});
    } else {
        this.setState({expanded:true});
    }

  },
  componentDidMount: function() {
      if(this.state.sporttypeurl=="null"){
        this.setState({icondisplay: 'none'});
      }


      if(this.state.isliked==1){
          this.setState({likebg: '#41B0CA'});
      }else{
        this.setState({likebg: '#eaeaea'});
      }
  },

  sendlikedata(params){
    var xmlHttp =GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Browser does not support HTTP Request")
      return
    }
    var url="http://localhost:8888/fitbook/likedealer.php?ssid=";
    url+=getCookie("ssid");
    url+="&postid=";
    url+=this.state.postid;
    url+="&action=";
    url+=params;

    var that=this;
    xmlHttp.onreadystatechange=function(){
      // that.setState({btntext: xmlHttp.responseText});
      if (xmlHttp.readyState==4 && xmlHttp.status==200){
          if(xmlHttp.responseText=="0"){
            alert("点赞失败，请检查网络");
          }
      }
    };

    xmlHttp.open("GET",url,true);
    xmlHttp.send();
  },


  render() {
    var displaystate='none';
    if(this.state.isManage==1){
      displaystate='';
    }

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

    const rightIconMenu = (
        <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem primaryText="点赞" />
          <MenuItem primaryText="回复" />
        </IconMenu>
    );

    return (

      <div style={{marginTop:'25px',display:this.state.isDeleted}}>
      <Card expanded={this.state.expanded}>
        <CardHeader
          title={this.state.username}
          avatar={this.state.avatarlink}
          style={{cursor:'pointer'}}
          titleStyle={{fontWeight:'600',marginTop:'12%'}}
        >
          <span style={{float:'right',fontSize:'13px',color:'#ff0079',marginTop:'8px',display:displaystate}} onTouchTap={this.handleDelDiaOpen}>删除</span>
          <span style={{fontSize:'13px'}} id="posthour">{this.state.timesection}</span>
        </CardHeader>

        <CardText style={{marginTop: '-3%'}}>
          {this.state.content}
        </CardText>

        <CardMedia>
          <img src="assets/cover.jpg"/>
        </CardMedia>

        <CardActions>
          <span
              style={{marginLeft:5}}>
            <IconButton
                iconStyle={{color: this.state.likebg,width:20,height:20}}
                onTouchTap={this.handleLike}
                tooltip="点赞"
                tooltipPosition="bottom-right">
              <UpIcon/>
            </IconButton>
            <span>{this.state.likenum}赞</span>
          </span>
          <span
              style={{marginLeft:20}}>
            <IconButton
                iconStyle={{color: grey400,width:20,height:20}}
                onTouchTap={this.handleExpand}
                tooltip="查看评论"
                tooltipPosition="bottom-right">
              <CommentIcon/>
            </IconButton>
            <span>2评论</span>
          </span>
          <div style={{display:'inline-block',float:'right',marginTop:'5px'}}>
            <img src={this.state.sporttypeurl} height={30} width={30} style={{display:this.state.icondisplay}}/>
            <span style={{fontSize:'18px',color:'#00c1d7',paddingLeft:'15px',verticalAlign:'40%',display:this.state.icondisplay}}>{this.state.sportdata}</span>
          </div>
        </CardActions><Divider/>

        <CardMedia>
          <div style={{margin:15}}>
            <Avatar src="assets/avatar/1.jpeg" />
            <TextField
                style={{paddingLeft:15}}
                hintText="发表评论..."
            />
            <FlatButton label="发布"/>
          </div>
        </CardMedia>

        <Divider/>

        <CardMedia expandable={true}>
          <List>
            <ListItem
                leftAvatar={<Avatar src="assets/avatar/1.jpeg" />}
                primaryText="Test"
                rightIconButton={rightIconMenu}
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>2017-01-21</span><br/>
                    厉害了加油
                  </p>
                }
                secondaryTextLines={2}
            />
            <Divider inset={true} />
            <ListItem
                leftAvatar={<Avatar src="assets/avatar/2.jpeg" />}
                primaryText="Test2"
                rightIconButton={rightIconMenu}
                secondaryText={
                  <p>
                    <span style={{color: darkBlack}}>2017-01-21</span><br/>
                    厉害了加油
                  </p>
                }
                secondaryTextLines={2}
            />
          </List>
        </CardMedia>

      </Card>


        <Dialog
          title="删除?"
          actions={delactions}
          modal={true}
          open={this.state.isDelDiaShow}
          contentStyle={{width:'100%'}}
      ></Dialog>
      </div>
    );
  }
});

export default PostCard;
