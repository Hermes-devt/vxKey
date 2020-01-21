import React, { Component } from 'react';
import Cursor from './cursor/_index';
class JumpBox extends Component {
  state = {
    value: '',
  }

  componentDidMount() {
    this.nameInput.focus();
    if( this.props.data.jumpBox.skipSearch){
      const cursor = this.props.data.jumpBox.next ?
        Cursor.jumpToNextMatch( this.props.data.list, this.props.data.jumpBox.oldSearch, this.props.data.cursor) :
        Cursor.jumpToPreviousMatch( this.props.data.list, this.props.data.jumpBox.oldSearch, this.props.data.cursor);
      const displayFindWindow = false;
      this.props.onSubmit( cursor, displayFindWindow, this.props.data.jumpBox);
    }
  }

  updateInputValue(evt) {
    const value = evt.target.value;
    this.setState({value});
  }

  listener(e){
    if( e.key === 'Escape'){
      const displayFindWindow = false;
      this.props.onSubmit(this.props.data.cursor, displayFindWindow);
      this.props.onSubmit(this.props.data.cursor, displayFindWindow, this.props.data.jumpBox);
    }
    if( e.key === 'Enter'){
      let cursor = (this.props.data.jumpBox.next) ? 
        Cursor.jumpToNextMatch( this.props.data.list, this.state.value, this.props.data.cursor) :
        Cursor.jumpToPreviousMatch( this.props.data.list, this.state.value, this.props.data.cursor);
      cursor.xPos -= 1;
      const displayFindWindow = false;
      this.props.data.jumpBox.oldSearch = this.state.value;
      this.props.onSubmit( cursor, displayFindWindow, this.props.data.jumpBox);
      // this.props.onSubmit(cursor, displayFindWindow);
    }
  }

  render() { 
    // console.log( this.props.data.jumpBox)

    return (
      <React.Fragment>
        <div style={ container }>
          <input 
            ref={(input) => { this.nameInput = input; }} 
            value={this.state.value}
            onChange={evt => { this.updateInputValue(evt) }}
            onKeyPress={evt=>{ this.listener(evt)}}
            style={ input }
            type="text"/>
        </div>
      </React.Fragment>
    );
  }
}
 
const container = {
    position: 'fixed',
    bottom: 10,
    left: '47vw',
    padding: '3px 2px',
    borderRadius: 5,
    // backgroundColor: 'black',
    textAlign: 'center',
    // color: 'white',
    fontSize: 12,
}

const input = {
  backgroundColor: 'black',
  color: 'white',
  borderRadius: 5,
}
export default JumpBox;
