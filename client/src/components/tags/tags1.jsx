import React from 'react';
import PropTypes from 'prop-types';




const Tags1 = ({data}) => {

  let today = null;
  let prio = null;
  let task = null;
  let tags = null;

  if ( data && data.tags){
    tags = data.tags;
    today = tags.today.timestamp ? tags.today.timestamp : null;
    task = (tags.task) ? tags.task : null;
  }

  const doneMarker = ( tags && tags.done && tags.done.timestamp && tags.done.timestamp.length > 0) ? true : false;
  const color = data.rowStyle && data.rowStyle.color ? data.rowStyle.color : 'black';
  const borderColor = { border: "1px solid " + color }

  prio = ( data && data.tags && data.tags.prio && data.tags.prio.str !== 'none') ? true : false;
  // const newLine = ( (task || today || prio ) || createNewLine(data) ) ? true : false;

  return (
    <React.Fragment>
      {/* {newLine && <div></div>} */}
      { prio  && <span style={prioStyle}>{data.tags.prio.str}</span>}
      { task && doneMarker && <span style={{ ...taskStyle, ...{backgroundColor: 'green'}, ...borderColor }}></span> }
      { task && !doneMarker && <span style={{ ...taskStyle, ...borderColor }}></span> }
      { today && <span style={start}>Today</span>}
    </React.Fragment>
  )
}
 
Tags1.propTypes = {
  data: PropTypes.object,
}


const start = { 
  backgroundColor: 'orange',
  color: 'black',
  marginRight: 5,
  padding: "1px 2px",
  borderRadius: "3px"
};

const prioStyle = { 
  backgroundColor: 'blue',
  color: 'white',
  marginRight: 5,
  padding: "1px 2px",
  borderRadius: "3px"
};

const taskStyle ={
  display: 'inline-block',
  width: 13,
  height: 13,
  border: '1px solid black',
  position: 'relative',
  top: 3,
  marginRight: 5,
  borderRadius: 3,
};

export default Tags1;