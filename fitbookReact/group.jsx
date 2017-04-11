import React from 'react';
import {Card,CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ShowmoreIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import GroupIcon from 'material-ui/svg-icons/social/people';
import { Link } from 'react-router';


const GroupCard = React.createClass({

  render() {

    return (

      <div>
      <Card>
    <CardHeader
          title="群组"
          titleStyle={{fontSize:'25px'}}
          style={{cursor:'pointer'}}
        >


        </CardHeader>
        <List>
              <ListItem
              primaryText="马拉松爱好者"
              leftAvatar={<GroupIcon/>}
              />
              <ListItem
              primaryText="暴走群"
              leftAvatar={<GroupIcon/>}
               />
              <ListItem primaryText="骑车竞速"
              leftAvatar={<GroupIcon/>}
              />

        </List>

      </Card>





        </div>
    );
  }
});

export default GroupCard;
