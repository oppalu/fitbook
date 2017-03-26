import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

const DateTimeRange = React.createClass({

  render() {

    return (
      <div>
      <div>
        <div style={{width:'100px',display:'inline-block'}}>
        <DatePicker hintText="开始日期" textFieldStyle={{width:'100px'}}/>
        </div>
        <div style={{display:'inline-block',float:'right'}}>
        <TimePicker hintText="开始时间" textFieldStyle={{width:'100px'}}/>
        </div>
      </div>

      <div>
        <div style={{width:'100px',display:'inline-block'}}>
        <DatePicker hintText="结束日期" textFieldStyle={{width:'100px'}}/>
        </div>
        <div style={{display:'inline-block',float:'right'}}>
        <TimePicker hintText="结束时间" textFieldStyle={{width:'100px'}}/>
        </div>
      </div>
      </div>
    );
  }
});

export default DateTimeRange;
