import React, {} from 'react';
import PropTypes from 'prop-types';

const Tags = (props) => {

  const checkBase = props && props.fullString && props.fullString.tags ? true : false;

  const severity = ( checkBase ) ? props.fullString.tags.severity.str : null;
  const bugg     = ( checkBase && props.fullString.tags.bugg ) ? props.fullString.tags.bugg : null;
  const started = ( checkBase && props.fullString.tags.started ) ? props.fullString.tags.started.timestamp : null;
  const done    = ( checkBase && props.fullString.tags.done ) ? props.fullString.tags.done.timestamp : null;
  const feature = ( checkBase && props.fullString.tags.feature) ? props.fullString.tags.feature : null;

  // const severity = ( props && props.fullString && props.fullString.tags ) ? props.fullString.tags.severity.str : null;
  // const bugg     = ( props && props.fullString && props.fullString.tags && props.fullString.tags.bugg ) ? props.fullString.tags.bugg : null;
  // const started = ( props && props.fullString && props.fullString.tags && props.fullString.tags.started ) ? props.fullString.tags.started.timestamp : null;
  // const done    = ( props && props.fullString && props.fullString.tags && props.fullString.tags.done ) ? props.fullString.tags.done.timestamp : null;
  // const feature = ( props && props.fullString && props.fullString.tags && props.fullString.tags.feature) ? props.fullString.tags.feature : null;

  const style = ( props && props.fullString && props.fullString.tags && props.fullString.tags.style) ? props.fullString.tags.style : null;

  return (
    <React.Fragment>
      {started && <div style={{...tag, ...{backgroundColor: 'black', color: 'white'}}}>Started{started}</div>}
      {done    && <div style={{...tag, ...{backgroundColor: 'green', color: 'white'}}}>Done{done}</div>}
      {bugg    && <div style={{...tag, ...{backgroundColor: 'gray', color: 'white'}}}>Bugg</div>}
      {feature && <div style={{...tag, ...{backgroundColor: 'navy', color: 'white'}}}>Feature</div>}
      {style   && <div style={{...tag, ...{backgroundColor: '#E59866', color: 'white'}}}>Style</div>}
      {severity === 'critical'     && <div style={{...tag, ...{backgroundColor: 'red'}}}>Critical</div>}
      {severity === 'high'         && <div style={{...tag, ...{backgroundColor: 'crimson'}}}>High</div>}
      {severity === 'medium'       && <div style={{...tag, ...{backgroundColor: 'purple'}}}>Medium</div>}
      {severity === 'low'          && <div style = {{...tag, ...{backgroundColor: 'blue'}}}>Low</div>}
    </React.Fragment>)
}

Tags.propTypes = { props: PropTypes.object, }

const tag = {
  display: 'inline-block',
  padding: '1px 2px',
  borderRadius: '3px',
  marginRight: '5px',
  backgroundColor: 'red',
  color: 'white',
}
 
export default Tags;