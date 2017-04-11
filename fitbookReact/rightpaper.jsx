import React from 'react';
import Paper from 'material-ui/Paper';

const RightPaper = React.createClass({

  render() {


    return (
      <div>
      <Paper className="statspaper" zDepth={2} >
        <div style={{height:'50%',backgroundImage:this.props.src  }}>
          <p style={{color:'white',fontSize:'30px',textAlign:'center',fontWeight:'600',paddingTop:'55px'}}>{this.props.title}</p>
        </div>

        <p style={{textAlign:'center',fontSize:'37px',fontWeight:'600'}}>{this.props.content}</p>
      </Paper>

      </div>


    );

  }
});

export default RightPaper;
