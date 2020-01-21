import React, { Component } from 'react';
import {styles} from './style/main';
// import util_tag from './todo/util/tag';
// import TaskTag from './todo/tags/task';
// import Today from './todo/tags/today';
// import Tags from './todo/tags/tags';

class FinishedTasks extends Component {
  state = {
    list: [],
  }

  componentDidMount() {
    let list = localStorage.getItem('finishedTasks');
    if( !list ) return;
    
    list = JSON.parse(list);
    this.setState({list})
  }
  printOutArchivedTasks = (listIndex, listItem)=>{ 
    let {text} = listItem;
    return(
      <div style={{...styles.rowStyle }} onClick={ ()=>{ this.set.cursor.yPos( listIndex ); }} >
        {/* <TaskTag data={listItem} rowStyle={ listItem }/> */}
        {/* <Today data={listItem} /> */}
        <span>{text}</span>
        {/* <Tags fullString={listItem} /> */}
      </div>
    )
  }

  render() {
    if( this.state.list.length <= 0)
      return null;
      
    return (
      <React.Fragment>
        <h2 style={{textAlign: 'center', margin: '25px 0px', padding: '10px 0px', backgroundColor: 'white', color: 'black', fontStyle: 'italic', boxShadow: '5px 5px 5px white' }}>Finished tasks</h2> 
        <div style={{ ...styles.documentStyle }} tabIndex='0' >
          
          { this.state.list.map( (item, index)=>{ return( 
            <div key={index} style={{...styles.lineStyle}}>
            {/* { this.state.displayLineNumbers && <span style={{...styles.nr}}>{index}.</span>} */}
            <span style={ styles.item }>{ this.printOutArchivedTasks(index, item) }</span>
          </div>
          )})}
        </div>
      </React.Fragment>
    );
  }
}
 
export default FinishedTasks;