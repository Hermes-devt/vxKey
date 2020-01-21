
import React, { Component } from 'react';
import Joi from 'joi-browser';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Register extends Component {
  state = {
    // username: '',
    email: '',
    password: '',
  }

  componentDidMount = ()=>{
    this.username.focus();
  }
  
  schema = {
    email: Joi.string().min(3).max(255).label("Email"),
    password: Joi.string().min(3).max(50)
  }

  onSubmit = async()=>{

    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    const result = Joi.validate( user, this.schema);

    console.log('user', user);
    if( result.error){ console.log( result.error.message ); return; }

    try{
      const response = await axios.post('/api/register', user);
      console.log('response', response );
    }catch(ex){
      console.log( ex);
    }
  }

  render() { 
    return (
      <React.Fragment>
        <Link to='/'><div style={style.container}></div></Link>
        <div style={style.popup}>
          <h2 style={style.header}>Sign in</h2>

          <div style={style.spacing}>
            <span style={style.text}>Email</span>
            <input
              ref={input => {this.username = input}}
              value={this.state.email} 
              onChange={evt => this.setState({email: evt.target.value})}
              type="text" style={style.input} placeholder="Email" />
          </div>

          <div style={style.spacing}>
            <span style={style.text}>Password</span>
            <input 
              value={this.state.password} 
              type="password" style={style.input} placeholder="Password"
              onChange={evt => this.setState({password: evt.target.value})} />
          </div>

          <button style={style.submit} onClick={ ()=>{ this.onSubmit()}} >Submit</button>
        </div>
      </React.Fragment>
    );
  }
}
export default Register;


const style ={
  spacing: {
    marginBottom: 15,
  },

  input: {
    width: 200,
    paddingLeft: 10,
  },

  text: {
    display: 'inline-block',
    width: 110,
    padding: '0px 15px',
  },

  submit: {
    position: 'relative',
    width: 100,
    textAlign: 'center',
    padding: '4px 10px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 5,
    marginLeft: "50%",
    left: -50,
    marginTop: 20,
    cursor: 'pointer',
    tabIndex: 1,
  },

  popup: {
    width: 350,
    height: 200,
    position: 'fixed', 
    top: "50%", left: "50%", 
    marginTop: -115, marginLeft: -205,
    borderRadius: 15,
    border: '1px solid black',
    backgroundColor: 'white',
    boxShadow: '2px 2px 2px black',
  },

  header: {
    textAlign: 'center',
    paddingTop: 5,
  },

  container: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.6,
  },

}