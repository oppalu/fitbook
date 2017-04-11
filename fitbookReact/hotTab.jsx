import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import OneIcon from 'material-ui/svg-icons/image/looks-one';

import TwoIcon  from 'material-ui/svg-icons/image/looks-two';

import ThreeIcon  from 'material-ui/svg-icons/image/looks-3';

import Paper from 'material-ui/Paper';

const ListExampleContacts = () => (
    <div>
        <Subheader>热门计步活动</Subheader>
        <List>
            <ListItem
                primaryText="梅花山踏青"
                leftIcon={<OneIcon color="red" />}
                insetChildren={true}
                leftAvatar={<Avatar src="assets/coverforaty.jpg" />}
            />
            <ListItem
                primaryText="定向越野"
                leftIcon={<TwoIcon color="blue" />}
                insetChildren={true}
                leftAvatar={<Avatar src="assets/cover.jpg" />}
            />
            <ListItem
                primaryText="鸡鸣寺赏花"
                leftIcon={<ThreeIcon color="green" />}
                insetChildren={true}
                leftAvatar={<Avatar src="assets/run1.jpg" />}
            />
        </List>
        <Divider />
        <Subheader>热门跑步活动</Subheader>
        <List>

            <ListItem
                primaryText="玄武湖夜跑"
                insetChildren={true}
                leftIcon={<OneIcon color="red"/>}
                leftAvatar={<Avatar src="assets/cover.jpg" />}
            />
            <ListItem
                primaryText="荧光跑"
                insetChildren={true}
                leftIcon={<TwoIcon color="blue" />}
                leftAvatar={<Avatar src="assets/run1.jpg" />}
            />
            <ListItem
                primaryText="tracy's own aty"
                insetChildren={true}
                leftIcon={<ThreeIcon color="green" />}
                leftAvatar={<Avatar src="assets/coverforaty.jpg" />}
            />
        </List>

        <Divider />
        <Subheader>热门骑行活动</Subheader>
        <List>

            <ListItem
                primaryText="公路骑行赛"
                insetChildren={true}
                leftIcon={<OneIcon color="red" />}
                leftAvatar={<Avatar src="assets/run1.jpg" />}
            />
            <ListItem
                primaryText="环湖骑行"
                insetChildren={true}
                leftIcon={<TwoIcon color="blue" />}
                leftAvatar={<Avatar src="assets/coverforaty.jpg" />}
            />
            <ListItem
                primaryText="自驾游"
                insetChildren={true}
                leftIcon={<ThreeIcon color="green" />}
                leftAvatar={<Avatar src="assets/cover.jpg" />}
            />
        </List>
    </div>
);

export default ListExampleContacts;
