
import React, { Component } from 'react';

import {styles} from './style/main';
import Tags1 from './tags/tags1'
import Tags2 from './tags/tags2';
// import { cursorStorage } from './cursor/storage';

// import Cursor from './cursor/_index';
class PrintRow extends Component {
  state = {  }

  onClick = ()=>{
    let cursor = this.props.data.cursor;
    cursor.yPos = this.props.data.index;
    this.props.onClick( cursor );
  }

  setLineStyle= ( onRow, listItem )=> {
    return (onRow === this.props.data.cursor.yPos ? 
      {...styles.lineStyle, ...styles.activeLine, ...listItem.rowStyle } : 
      {...styles.lineStyle, ...listItem.rowStyle });
  }
  

  render() { 

    let {index, listItem} = this.props.data;
    let {text} = this.props.data.listItem;
    const {cursor} = this.props.data;
    const textBeforeCursor = text.slice(0, cursor.xPos);
    const cursorAt = text.slice( cursor.xPos, cursor.xPos + 1);
    const textAfterCursor = text.substring( cursor.xPos + 1);
    
    const ifInactiveRow = ()=> { return index !== cursor.yPos};

    const getInsertRow = ()=>{ 
      let insertMarker = ( listItem.rowStyle.backgroundColor !== 'black' ) ? {} : {...styles.commandMarker, ...{backgroundColor: 'white'}}
      return(
        <span>
            <span>{textBeforeCursor}</span>
            {!this.state.insertAfter && <span style={{ ...styles.insertMarker, ...insertMarker }}></span> }
            <span>{cursorAt}</span>
            {this.state.insertAfter && <span style={{ ...styles.insertMarker, ...insertMarker }}></span> }
            <span>{textAfterCursor}</span>
        </span>)
    }

    const getNonInsertRow = ()=>{ 
      if( !listItem.rowStyle ) return null;

      let commandMarker = ( listItem.rowStyle.backgroundColor !== 'green' ) ? {...styles.commandMarker} : {...styles.commandMarker, ...{backgroundColor: 'white'}}
      return(
        <span>
          <span>{textBeforeCursor}</span>
          { listItem.text.length === 0 && <span style={{ ...commandMarker, ...{position: 'relative', display: 'inline-block', width: 4, height: 13, top: 3 } }}></span> }
          { listItem.text.length !== 0 && <span style={{ ...commandMarker }}>{text.slice(cursor.xPos, cursor.xPos + 1)}</span> }
          <span>{text.slice(cursor.xPos + 1, cursor.xPos + 1)}</span>
          <span>{text.slice(cursor.xPos + 1, text.length)}</span>
        </span>)
    }

    return(
      <div style={{...this.setLineStyle(index, listItem) }} >
        <span style={ styles.item } onClick={ this.onClick } >
          <div style={{...styles.rowStyle }} >
            <Tags1 data={listItem} />
            {ifInactiveRow() && <span>{text}</span>}
            {!ifInactiveRow() && this.state.insertMode && getInsertRow() }
            {!ifInactiveRow() && !this.state.insertMode && getNonInsertRow() }
            <Tags2 fullString={listItem} />
          </div>
        </span>
      </div>
    )
  }
}
 
export default PrintRow;