import React, { Component } from 'react';

class Input extends Component {
  state = { 
    value: '',
  }

  constructor(){
    super();

    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    // this.focus() = this.focus.bind(this);
  }

  componentDidMount = ()=>{
    //sets the value
    const value = (this.props && this.props.value ) ? this.props.value : '';
    this.setState({ value });
  }

  onChange = event =>{
    //on change
    this.setState({ value: event.target.value });
  }

  render() { 
    return (
      <input 
      type='text'
      onChange={ this.onChange }
      value={this.state.value}
      {...this.props.attr }
      />
    );
  }
}
 
export default Input;