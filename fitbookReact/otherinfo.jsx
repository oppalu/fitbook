import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';

import { Link } from 'react-router';


import Avatar from 'material-ui/Avatar';

import Cover from './cover.jsx';
import CoverRight from './coverright.jsx';
import AandD from './appbaranddrawer.jsx';


const MyInfo = React.createClass({
  render() {

    return (
      <div>
          <AandD />

<div style={{width:'35%',position:'fixed',maxWidth:'350px',display:'inline-block',marginTop:'60px'}}>
         <Cover />
</div>
<div style={{display:'inline-block',marginLeft:'34%',width:'100%'}}>
         <CoverRight />
</div>

         </div>
    );
  }
});

export default MyInfo;
