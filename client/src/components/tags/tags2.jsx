import React, {} from 'react';

const Tags2 = (props) => {

  const checkBase = props && props.fullString && props.fullString.tags ? true : false; 

  const severity = ( checkBase && props.fullString.tags.severity) ? props.fullString.tags.severity.str : null;
  const bugg     = ( checkBase && props.fullString.tags.bugg ) ? props.fullString.tags.bugg : null;
  const started = ( checkBase && props.fullString.tags.started ) ? props.fullString.tags.started.timestamp : null;
  const done    = ( checkBase && props.fullString.tags.done ) ? props.fullString.tags.done.timestamp : null;
  const feature = ( checkBase && props.fullString.tags.feature) ? props.fullString.tags.feature : null;
  const style = ( checkBase && props.fullString.tags.style) ? props.fullString.tags.style : null;

  // let newLine = ( (severity && severity !== "none") || bugg || done || started || feature || style) ? true : false;
  let newLine = false;
  return (
    <span style={{paddingLeft: 5}}>
      { newLine && <div style={{ height: 4}}></div>}
      {/* { (severity || bugg || started || done || feature || style) && <div></div>} */}
      {started && <div style={{...tag, ...{backgroundColor: '#34495E', color: 'white', padding: '2px 3px'}}}>Started{started}</div>}
      {done    && <div style={{...tag, ...{backgroundColor: 'green', color: 'white'}}}>Done{done}</div>}
      {bugg    && <div style={{...tag, ...{backgroundColor: 'gray', color: 'white'}}}>Bugg</div>}
      {feature && <div style={{...tag, ...{backgroundColor: 'navy', color: 'white'}}}>Feature</div>}
      {style   && <div style={{...tag, ...{backgroundColor: '#E59866', color: 'white'}}}>Style</div>}
      {severity === 'critical'     && <div style={{...tag, ...{backgroundColor: 'red'}}}>Critical</div>}
      {severity === 'high'         && <div style={{...tag, ...{backgroundColor: 'crimson'}}}>High</div>}
      {severity === 'medium'       && <div style={{...tag, ...{backgroundColor: 'purple'}}}>Medium</div>}
      {severity === 'low'          && <div style = {{...tag, ...{backgroundColor: 'blue'}}}>Low</div>}
    </span>)
}

const tag = {
  display: 'inline-block',
  padding: '1px 2px',
  borderRadius: '3px',
  marginRight: '5px',
  backgroundColor: 'red',
  color: 'white',
}
 
export default Tags2;