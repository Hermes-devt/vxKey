import React, { Component } from 'react';

class RowWindowInputs extends Component {
  state = { 
    value: '',
  }
  constructor(props) {
    super(props);
    this.keyDown= this.keyDown.bind(this);
  }
  
  updateInputValue(evt){
    console.log('evt', evt.target.value);
    const value = evt.target.value;
    this.setState({value});
  }

  keyDown(e){
    console.log('e', e.key);
    if( e.key === 'Enter'){
      console.log('value', this.state.value );
    }
  }

  render() { 
    return (
      <div style={this.styles.container}>
        <span style={this.styles.text}>{this.props.name}</span>
        <input type="text" onChange={ evt=> this.updateInputValue(evt)} onKeyDown={ this.keyDown } />
      </div>
    );
  }

  styles ={
    text: {
      display: 'inline-block',
      color: 'white',
      marginRight: 15,
      marginBottom: 10,
      width: 120,
    }
  }
}
 
export default RowWindowInputs;