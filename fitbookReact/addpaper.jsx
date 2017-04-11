import React from 'react';
import Paper from 'material-ui/Paper';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

const AddPaper = React.createClass({

  render() {


    return (
      <div style={{display:'inline-block',marginLeft:'20px',cursor:'pointer'}} >
      <Paper className="generalpaper" zDepth={1} >
        <div style={{height:'70%',textAlign:'center'}}>
        <AddIcon color={'#757575'} style={{marginTop:'30%',width:'60px',height:'60px'}}/>

        </div>

        <p style={{textAlign:'center',fontSize:'15px',color:'#757575'}}>{this.props.content}</p>
      </Paper>

      </div>


    );

  }
});

export default AddPaper;
