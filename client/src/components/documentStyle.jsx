
import React from 'react';
// import {styles} from './style/main';

const DocumentStyle = (props) => {
  return (
        // <div style={{ ...styles.documentStyle, ...{overflowX: 'scroll', outline: 0}}} tabIndex='0' >
        <div style={{ ...documentStyle, ...{overflowX: '', outline: 0}}} tabIndex='0' >
          {props.children}
        </div>
  );
}
 
const documentStyle = {
  fontSize: 12,
  backgroundColor: 'white', 
  color: 'black',
  paddingBottom: 15,
}

export default DocumentStyle;