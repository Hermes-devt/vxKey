
import React from 'react';
import {styles} from './style/main';

const setLineStyle = (index, listItem, cursor)=> {
  return ( index=== cursor.yPos ? 
    {...styles.lineStyle, ...styles.activeLine, ...listItem.rowStyle } : 
    {...styles.lineStyle, ...listItem.rowStyle });
}
const RowStyle = (props) => {
  return (
    <div style={{...setLineStyle(props.data.index, props.data.listItem, props.data.cursor) }} >
      {props.children}
    </div>
  );
}
 
export default RowStyle;