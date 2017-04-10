import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const Card_aty = React.createClass({
    getInitialState(){
        return{
            title:this.props.title,
            atyid:this.props.atyid,
            intro: this.props.intro,
            num: this.props.num+"个成员",
            coverlink: this.props.coverlink,
            maincolor: this.props.maincolor,
            path:"/atyinfo/" + this.props.atyid
        }
    },

    render() {
        return (
            <div style={{width:220,height:250,display:'inline-block',marginRight:'30px',
                marginBottom:'20px',cursor:'pointer'}}>

                <Link to={this.state.path} style={{ textDecoration: 'none' }}>
                    <Card style={{width:220,height:250}}>
                        <div style={{width:220,height:130}}>
                            <img src={this.state.coverlink} style={{width:220,height:130}}/>
                        </div>

                        {/*<div style={{width:220,height:20,marginLeft:18}}>*/}
                            {/*<Avatar src="assets/taylor.jpg" size={30} style={{marginTop:"-50%",zIndex:30,position:"relative"}}/>*/}
                            {/*<Avatar src="assets/red.png" size={30} style={{marginTop:"-50%",marginLeft:"-7%",zIndex:20,position:"relative"}}/>*/}
                            {/*<Avatar src="assets/adam.jpg" size={30} style={{marginTop:"-50%",marginLeft:"-7%",zIndex:10,position:"relative"}}/>*/}
                            {/*<Avatar src="assets/purple.png" size={30} style={{marginTop:"-50%",marginLeft:"-7%",zIndex:7,position:"relative"}}/>*/}
                            {/*<Avatar src="assets/green.png" size={30} style={{marginTop:"-50%",marginLeft:"-7%",zIndex:4,position:"relative"}}/>*/}
                        {/*</div>*/}

                        <div style={{width:220,height:120,backgroundColor:this.state.maincolor}}>
                            <CardTitle title={this.state.title}  titleStyle={{fontSize:18,marginTop:"-8%",color:'white'}}
                                       subtitle={this.state.num} subtitleStyle={{marginTop:"-3%",marginLeft:"2%",color:'white'}}/>

                            <p style={{fontSize:14,color:'white',padding:8,marginTop:"-5%",marginLeft:"3%"}}>
                                {this.state.intro}
                            </p>
                        </div>

                    </Card>
                </Link>


            </div>

        );
    }
});

export default Card_aty;