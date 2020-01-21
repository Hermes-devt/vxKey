
import React, { Component } from 'react';

import {styles} from './style/main';
import Tags1 from './tags/tags1'
import Tags2 from './tags/tags2';
import Cursor from './cursor/_index';

class PrintRow extends Component {
  state = {  }

  onClick = (index)=>{
    let cursor = this.props.data.cursor;
    cursor.yPos = index;
    cursor = Cursor.withinBounds( this.props.data.list, cursor);
    this.props.onClick( cursor );
  }

  setLineStyle= (index, listItem, props )=> {
    return ( index=== this.props.data.cursor.yPos ? 
      {...styles.lineStyle, ...styles.activeLine, ...listItem.rowStyle } : 
      {...styles.lineStyle, ...listItem.rowStyle });
  }

  print = (listItem, index)=>{
    let text = listItem.text;
    const {cursor} = this.props.data;

    const textBeforeCursor = text.slice(0, cursor.xPos);
    const cursorAt = text.slice( cursor.xPos, cursor.xPos + 1);
    const textAfterCursor = text.substring( cursor.xPos + 1);
    
    const ifInactiveRow = ()=> { 
      return index !== cursor.yPos
    };


    const getInsertRow = ()=>{ 
      let insertMarker = ( listItem.rowStyle.backgroundColor !== 'black' ) ? {} : {...styles.commandMarker, ...{backgroundColor: 'white'}}
      return(
        <span>
            <span>{textBeforeCursor}</span>
            {!cursor.insertAfter && <span style={{ ...styles.insertMarker, ...insertMarker }}></span> }
            <span>{cursorAt}</span>
            {cursor.insertAfter && <span style={{ ...styles.insertMarker, ...insertMarker }}></span> }
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
        {/* <RowStyle data={{index, listItem, cursor}}> */}
        <span style={ styles.item } onClick={ ()=>this.onClick(index)} >
          <div style={{...styles.rowStyle }} >
            <Tags1 data={listItem} />
            {ifInactiveRow() && <span>{text}</span>}
            {!ifInactiveRow() && cursor.insertMode && getInsertRow() }
            {!ifInactiveRow() && !cursor.insertMode && getNonInsertRow() }
            <Tags2 fullString={listItem} />
            {/* <Tags1 data={listItem} />
            <Tags2 fullString={listItem} /> */}
          </div>
        </span>
        {/* </RowStyle> */}
      </div>
    )

  }

  render() { 
    return(
      <React.Fragment>
        {this.props.data.list.map( (listItem, index)=>{ return(
          <div key={index}> { this.print(listItem, index) } </div>
        )})}
      </React.Fragment>
    )
  }
}
 
export default PrintRow;