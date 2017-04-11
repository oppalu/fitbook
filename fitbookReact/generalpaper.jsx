import React from 'react';
import Paper from 'material-ui/Paper';

const GeneralPaper = React.createClass({

  render() {


    return (
      <div style={{display:'inline-block',marginLeft:'20px',cursor:'pointer'}}>
      <Paper className="generalpaper" zDepth={1} >
        <div style={{height:'70%',backgroundImage:this.props.src  }}>

        </div>

        <p style={{textAlign:'center',fontSize:'15px',marginBottom:'0px',paddingBottom:'12px'}}>{this.props.content}</p>


        
      </Paper>

      </div>


    );

  }
});

export default GeneralPaper;
