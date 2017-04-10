import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';

import { Link } from 'react-router';


import Avatar from 'material-ui/Avatar';

import CoverForGroup from './coverforgroup.jsx';
import CoverRight from './coverright.jsx';
import AandD from './appbaranddrawer.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import DateTimeRange from './DateTimeRange.jsx';
import GroupRight from './groupright.jsx';



const GroupInfo = React.createClass({
  getInitialState(){
    return{
    }
  },

  render() {

    return (
      <div>
      <AandD />

<div className="wholecover">
     <CoverForGroup />
</div>
<div className="rightcover">
         <GroupRight />
</div>


         </div>
    );
  }
});

export default GroupInfo;
