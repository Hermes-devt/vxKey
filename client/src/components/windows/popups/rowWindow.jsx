
import React, { Component } from 'react';

class RowWindow extends Component {
  state = {}

  constructor(props){
    super(props);
    this.state = {backgroundColor: '', color: '', textAlign: '', fontSize: '' }
    this.keyDown = this.keyDown.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  handleChange = (e)=>{
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event){
  }

  componentDidMount(){
    this.nameInput.focus();

    const {rowStyle: style} = this.props.data ? this.props.data : {};
    this.setState({
      backgroundColor: style.backgroundColor ? style.backgroundColor : '',
      fontSize: style.fontSize ? style.fontSize : '',
      textAlign: style.textAlign ? style.textAlign : '',
      color: style.color ? style.color : '',
    })
  }

  keyDown(e){
    if( e.key !== 'Enter') return;
    let rowStyle = {...this.state}
    rowStyle.fontSize = rowStyle.fontSize > 0 ? parseInt( rowStyle.fontSize ) : '';

    const displayRowWindow = false;
    const listItem = this.props.data;
    listItem.rowStyle = {...listItem.rowStyle, ...rowStyle};

    this.props.onClose( listItem, displayRowWindow );
  }

  render() { 
    console.log( this.props.data);
    const renderInput = name => <input type='text' value={this.state[name]} onKeyDown={this.keyDown} name={name} onChange={ this.handleChange } />
    const renderInputText = text=> <span style={ this.styles.text}>{text}</span>
    const hotkey = char => <span style={{color: 'red', display: 'inline-block', width: '25px'}}>[{char}] </span>

    return (
      <div style={this.styles.container}>
        <h1 style={this.styles.header}>Set row style</h1>
        {/* <input type="text" ref={(input) => this.nameInput = input } name="blaa" id=""/> */}
        <div>
          {hotkey('a')}
          {renderInputText('background color')}
          <input 
            value={this.state['backgroundColor']}
            onKeyDown={this.keyDown}
            onChange={this.handleChange}
            name={'backgroundColor'}
            type="text"
            ref={(input) => this.nameInput = input }
          />
          {/* {renderInput('backgroundColor') } */}
        </div>
        <div>
          {hotkey('b')}
          {renderInputText('Color')}
          {renderInput('color') }
        </div>
        <div>
          {hotkey('c')}
          {renderInputText('Size')}
          {renderInput('fontSize') }
        </div>
        <div>
          {hotkey('d')}
          {renderInputText('Align')}
          {renderInput('textAlign') }
        </div>
        <div>
          {hotkey('q')}
          {renderInputText('Custome style')}
        </div>
        <div>
          {hotkey('e')}
          {renderInputText('Default row style')}
        </div>
      </div>
    );
  }
  styles = {
    container: {
      position: 'fixed',
      display: 'block',
      top: '20vh',
      width: '50vw',
      paddingLeft: 30,
      paddingBottom: 30,
      border: '1px solid black',
      borderRadius: 5,
      color: 'white',
      marginLeft: '25vw',
      backgroundColor: '#1a202c',
      boxShadow: '2px 2px 2px black',
    },

    text: {
      display: 'inline-block',
      width: 150,
    },

    row: {
      marginBottom: 5,
    },

    header: {
      textAlign: 'center',
    }
  }
}
 
export default RowWindow;