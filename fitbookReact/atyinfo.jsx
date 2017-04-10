import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';

import { Link } from 'react-router';


import Avatar from 'material-ui/Avatar';
import AandD from './appbaranddrawer.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import DateTimeRange from './DateTimeRange.jsx';
import Cover from './coverforaty.jsx';
import CoverRight from './atyright.jsx';



const GroupInfo = React.createClass({
  getInitialState(){
    return{
      atyid:this.props.atyid,
    }
  },

  render() {

    return (
      <div>
      <AandD />

<div className="wholecover">
     <Cover atyid={this.state.atyid}/>
</div>
<div className="rightcover">
    <CoverRight atyid={this.state.atyid}/>
</div>


         </div>
    );
  }
});

export default GroupInfo;
