import React, { Component } from 'react';


class Hotkeys extends Component {
  state = { display: true, }


  // componentDidMount = ()=>{ }
  
  render() { 
    const cols = (obj)=>{
      return(
        <div>
          <div style={style.leftColumn}>{obj.col1}</div>
          <div style={style.rightColumn}>{obj.col2}</div>
          <div style={{height: '1px', display: 'inline-block', width: '100%', backgroundColor: 'black'}}></div>
        </div>);
    } 

    console.log('props in', this.props.display )
    
    return (
      <React.Fragment>
      { this.state.display &&
        <div style={ style.container }>
          {
            [{col1: 'caw', col2: 'Replace the current word'},
            {col1: 'dw', col2: 'Delete current word'},
            {col1: 'dd', col2: 'Delete whole line'},
            {col1: 'de', col2: 'Delete to the end of the word'},
            {col1: 'dE', col2: 'delete to end of the line'},
            {col1: 'db', col2: 'Delete to the beginning of the word'},
            {col1: 'cc', col2: 'Copy line'},
            {col1: 'w', col2: 'Go to the beginning of the next word'},
            {col1: 'E', col2: 'Go to the end of the previous word'},
            {col1: 'e', col2: 'Go to the end of the current word'},
            {col1: 'P', col2: 'Refresh the page'},
            {col1: 'arrowup', col2: 'Go up DOESENT WORK'},
            {col1: 'arrowdown', col2: 'Scroll down'},
            {col1: 'k', col2: 'Go up one line'},
            {col1: 'j', col2: 'Go down one line'},
            {col1: 'h', col2: 'Go one character to the left'},
            {col1: 'l', col2: 'Go one line down'},
            {col1: 'n', col2: 'Delete to the beginning of the word'},
            {col1: 'm', col2: 'Delete to the beginning of the word'},

            {col1: 'c', col2: "isnt a command just let you use multiple character str"},
            {col1: 'd', col2: 'same here'},
            {col1: '9', col2: 'Go to the end of the line'},
            {col1: 'X', col2: 'Delete the whole line'},
            {col1: 'p', col2: 'paste line copy'},
            {col1: 'x', col2: 'Replace current character'},
            {col1: '0', col2: 'Go to the beginning of the line'},
            {col1: '>', col2: 'Shift line x pixels to the right'},
            {col1: '<', col2: 'Shift line x pixels to the left'},
            {col1: 'O', col2: 'Create a line above the current line'},
            {col1: 'o', col2: 'Create a line below the current line'},

            {col1: 't', col2: 'Open the tag window'},
            {col1: 'Enter', col2: 'Create a new line below the current line'},
            {col1: '˚', col2: 'Shift line upwards'},
            {col1: 'ArrowDown+alt', col2: 'Shift the current line with the line below'},
            {col1: 'ArrowUp+alt', col2: 'Shift the current line one line upwards'},
            ].map( (obj)=> cols(obj))}
            <div 
            style={style.close}
            onClick={ ()=>{ 
              // const display = false; this.setState({display}); 
              this.props.onClose();
            }}
            >Close</div>
        </div>
      }
      </React.Fragment>
    );
  }
}

const style = {
  close: {
    display: 'block',
    cursor: 'pointer',
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
  },

  leftColumn: {
    display: 'inline-block',
    width: 100,
    border: 'none',
    textAlign: 'center',
    color: 'black',
    borderLeft: '1px solid silver',
    backgroundColor: 'white',
    opacity: 1,
    wordWrap: 'wrap',
    overflow: 'hidden',
  },

  rightColumn: {
    display: 'inline-block',
    width: 200,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 15,
    paddingLeft: 20,
  },

  container: {
    position: 'absolute',
    display: 'block',
    width: 400,
    height: '80vh',
    overflowY: 'scroll',
    backgroundColor: 'white',
    top: 60, 
    left: 0,
  }
}
export default Hotkeys;