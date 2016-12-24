import React from 'react';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FriendIcon from 'material-ui/svg-icons/action/face';
import GroupIcon from 'material-ui/svg-icons/social/people';
import AtyIcon from 'material-ui/svg-icons/image/assistant-photo';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import GeneralPaper from './generalpaper.jsx'
import AddPaper from './addpaper.jsx'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';

const GroupRight = React.createClass({
  getInitialState(){
    return{
      dropvalue:1,
      showAty:'',
      showMem:'none',
      isDialogShow:false,
    }
  },
  handleDropDownChange(event, index, value){
    this.setState({dropvalue: value});
  },
  gotoMember(){
    this.setState({showAty: 'none'});
    this.setState({showMem: ''});
  },
  gotoAty(){
    this.setState({showAty: ''});
    this.setState({showMem: 'none'});
  },
  handleDialogOpen(){
    this.setState({isDialogShow: true});
  },
  handleDialogClose(){
    this.setState({isDialogShow: false});
  },

  render() {
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="添加"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogClose}
      />,
    ];

    return (

      <div className="rightwidth">
      <div className="quanzi">
      <DropDownMenu value={this.state.dropvalue} onChange={this.handleDropDownChange} underlineStyle={{display:'none'}} style={{paddingLeft:'0px'}}>
          <MenuItem value={1} primaryText="群组活动" onTouchTap={this.gotoAty}/>
          <MenuItem value={2} primaryText="群组成员" onTouchTap={this.gotoMember}/>
    </DropDownMenu>

      </div>


      <div style={{display:this.state.showAty}}>

      <GeneralPaper src="url(../assets/green.png)" content="竞走挑战"/>
      <GeneralPaper src="url(../assets/red.png)" content="小型马拉松"/>
      <GeneralPaper src="url(../assets/run1.jpg)" content="超长马拉松"/>
      <GeneralPaper src="url(../assets/purple.png)" content="半马"/>
      <GeneralPaper src="url(../assets/run2.jpg)" content="练习"/>

      </div>


      <div style={{display:this.state.showMem}}>
      <div onTouchTap={this.handleDialogOpen} style={{display:'inline-block'}}><AddPaper content="添加新成员"  /></div>

      <GeneralPaper src="url(../assets/taylor.jpg)" content="MeiMei"/>
      <GeneralPaper src="url(../assets/red.png)" content="Adele"/>
      <GeneralPaper src="url(../assets/adam.jpg)" content="Adam Levine"/>
      <GeneralPaper src="url(../assets/purple.png)" content="Justin Bieber"/>
      <GeneralPaper src="url(../assets/green.png)" content="Rihanna"/>

      </div>


          <Dialog
                title="添加新成员"
                actions={actions}
                modal={true}
                open={this.state.isDialogShow}
                onRequestClose={this.handleDialogClose}
                contentStyle={{maxWidth: '350px'}}
                autoScrollBodyContent={true}
              >
              <List>
        <Subheader>我的好友</Subheader>
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Maroon 5"
          rightAvatar={<Avatar src="assets/avatar/2.jpeg" />}
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Bruno Mars"
          rightAvatar={<Avatar src="assets/avatar/3.jpeg"/>}
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Coldplay"
          rightAvatar={<Avatar src="assets/avatar/1.jpeg" />}
        />

        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Maroon 5"
          rightAvatar={<Avatar src="assets/avatar/2.jpeg" />}
        />

        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Coldplay"
          rightAvatar={<Avatar src="assets/avatar/1.jpeg" />}
        />
        <ListItem
          leftCheckbox={<Checkbox />}
          primaryText="Bruno Mars"
          rightAvatar={<Avatar src="assets/avatar/3.jpeg"/>}
        />

      </List>

          </Dialog>







      </div>


    );
  }
});

export default GroupRight;
