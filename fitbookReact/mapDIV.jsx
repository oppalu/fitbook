import React from 'react';


const MapDIV = React.createClass({
  componentDidMount: function() {
      doMap();


  },
  render() {


    return (
    <div id="mapdiv" style={{width:'100%',height:'500px'}}></div>

    );

  }
});

export default MapDIV;
