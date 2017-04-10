import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const Card_group = React.createClass({

    render() {


        return (
            <div style={{width:220,height:280,display:'inline-block',marginRight:'30px',
                marginBottom:'20px',cursor:'pointer'}}>

                <Link to="/groupInfo" style={{ textDecoration: 'none' }}>
                    <Card style={{width:220,height:280}}>
                        <div style={{width:220,height:130}}>
                            <img src="assets/coverforgroup.jpg" style={{width:220,height:130}}/>
                        </div>

                        <div style={{width:220,height:20,marginLeft:18}}>
                            <Avatar src="assets/taylor.jpg" size={30} style={{marginTop:"-50%",zIndex:30,position:"relative"}}/>
                            <Avatar src="assets/red.png" size={30} style={{marginTop:"-50%",marginLeft:"-7%",zIndex:20,position:"relative"}}/>
                            <Avatar src="assets/adam.jpg" size={30} style={{marginTop:"-50%",marginLeft:"-7%",zIndex:10,position:"relative"}}/>
                            <Avatar src="assets/purple.png" size={30} style={{marginTop:"-50%",marginLeft:"-7%",zIndex:7,position:"relative"}}/>
                            <Avatar src="assets/green.png" size={30} style={{marginTop:"-50%",marginLeft:"-7%",zIndex:4,position:"relative"}}/>
                        </div>

                        <div style={{width:220,height:130}}>
                            <CardTitle title="马拉松爱好者"  titleStyle={{fontSize:18,marginTop:"-8%"}}
                                       subtitle="5个成员" subtitleStyle={{marginTop:"-3%",marginLeft:"2%"}}/>

                            <p style={{fontSize:14,color:'grey',padding:8,marginTop:"-5%"}}>
                                这里是马拉松爱好者的聚集地!我们会不定期发布马拉松活动!
                            </p>
                        </div>

                    </Card>
                </Link>


            </div>

        );
    }
});

export default Card_group;