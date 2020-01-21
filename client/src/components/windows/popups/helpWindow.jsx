import React, { Component } from 'react';

class HelpWindow extends Component {
  state = {
    popup: false,
  }

  componentDidMount= ()=>{
    document.addEventListener('keydown', (e)=>{
      if( this.state.popup ){
        const popup  = false;
        this.setState({popup});
      }
    });

  }

  col2 = (str1, str2)=>{
    return (
      <div>
        <div style={styles.col1}>{str1}</div>
        <div style={styles.col2}>{str2}</div>
      </div>
    )
  }

  header = str=>{ return ( <div style={styles.colHeader}>{str}</div>) }

  popupWindow = ()=>{
    return (
      <div style={styles.container}>
        <h3 style={styles.header}>help window</h3>
        <div className="row">

          <div style={styles.block}>
            { this.header('Navigation')}
            { this.col2('b / w', 'prev / next word')}
            { this.col2('h, j, k, l', 'Arrow keys')}
            { this.col2('e / E', 'previous/next end of word')}
            { this.col2( '0 (zero)', "start of line")}
            { this.col2( 'f / F', 'find next/prev character')}
            { this.col2( '/  ?', 'Go to next/prev matching string')}
          </div>

          <div style={styles.block}>
            { this.header('Editing')}
            { this.col2('a', 'Append after cursor')}
            { this.col2( 'A', 'append at the end of the line')}
            { this.col2('i', 'insert before cursor')}
            { this.col2('o', 'Create new line below cursor')}
            { this.col2('O', 'Create new line above cursor')}
            { this.col2('x', 'Delete char and insert')}
            {/* { this.col2('S', 'Delete line and insert')} */}
            { this.col2('C', 'Delete until the of line')}
            { this.col2('r', 'replace single character')}
            {/* { this.col2('R', 'replace multiple characters')} */}
            { this.col2('U', 'Undo changes')}
            { this.col2('', '')}
          </div>

          <div style={styles.block}>
            { this.header('Tags')}
            { this.col2('d', 'checkbox')}
            { this.col2('S, (ts)', '@StartTag')}
            { this.col2('T, (tt)', '@Today')}
            { this.col2('L, (tl)', '@Low')}
            { this.col2('M, (tm)', '@Medium')}
            { this.col2('H, (th)', '@High')}
            { this.col2('C, (tc)', '@Critical')}
            { this.col2('D, (td)', '@Done')}
          </div>
        </div>
      </div>
    );
  }

  setEvent = ()=>{
  }

  onClick = ()=>{
    const popup = !this.state.popup;
    this.setState({popup});
  }

  render() {
    return (
      <span>
        <span onClick={ ()=>this.onClick() } style={styles.questionMark}>?</span>
        { this.state.popup && this.popupWindow() }
      </span>
    );
  }
}

const styles = {
  questionMark: {
    cursor: 'pointer',
    padding: "2px 4px",
    border: '1px solid silver',
    borderRadius: "5px",
    marginLeft: 15,
  },

  container: {
    position: 'absolute',
    width: '90vw',
    left: "50%",
    // top: '50%',
    transform: "translate(-50%, 0%)",

    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: 5,
    color: 'black',
    padding: 30,
    zIndex: 100,
  },

  header: {
    textAlign: 'center',
    marginTop: -15,
  },

  block: {
    width: 300,
    border: '1px solid silver',
    borderRadius: 5,
    padding: 5,
  },

  colHeader: {
    textAlign: 'center',
    color: 'purple',
  },
  col1: {
    display: 'inline-block',
    width: 75,
  },

  col2: {
    display: 'inline-block',
  }
}

export default HelpWindow;