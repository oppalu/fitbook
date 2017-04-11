import React from 'react';
import SadIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import RaisedButton from 'material-ui/RaisedButton';



const NotFound = React.createClass({
  back(){
    window.history.back();
  },

  render() {

    return (
      <div>
      <div style={{width:'100%',backgroundColor:'#00c1d7',height:'100%',textAlign:'center'}}>
        <SadIcon color={'white'} style={{marginTop:'10%',width:'200px',height:'200px',}}/>
        <div style={{color:'white',fontSize:'100px',marginTop:'20px'}}>404</div>
      </div>

      <div style={{width:'100%',textAlign:'center'}}>
      <div style={{color:'#777777',fontSize:'50px',marginTop:'20px'}}>页面找不到了</div>
      <RaisedButton label="返回" secondary={true} style={{marginTop:'20px'}} onTouchTap={this.back}/>
      </div>



      </div>

    );
  }
});

export default NotFound;
