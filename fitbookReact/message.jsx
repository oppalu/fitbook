import React from 'react';
import AandD from './appbaranddrawer.jsx';
import MessageBar from './messagebar.jsx';


const Message = React.createClass({
  render() {

    return (
      <div>
          <AandD />
          <div style={{height:'61px'}}></div>
          <div style={{marginLeft:'23%',marginRight:'23%'}}>
          <p style={{color:'#5A5A5A'}}>你的消息</p>
          <MessageBar content={'对你发起挑战'}/>
          <MessageBar content={'邀请你加入活动 骑速'}/>
         </div>


      </div>
    );
  }
});

export default Message;
