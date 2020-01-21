import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi-browser';

class Login extends Component {
  state = {  }

  schema = {
    username: Joi.string().min(3),
    password: Joi.string().min(3),
  }

  submit = async ()=> {
    const username = document.getElementById('submitUsername').value;
    const password = document.getElementById('submitPassword').value;
    const user = { username: username, password: password }
    const result = Joi.validate(user, this.schema);

    if( result.error){
      console.log('error');
      return;
    }

    try{
      console.log('user', user);
      const response = await axios.post('/auth', user);
      console.log('response', response.headers['x-auth-token']);
      localStorage.setItem('token', response.headers['x-auth-token']);
      window.location = '/';
    }catch(ex){
      console.log('error loggin in', ex.message);
    }
  }

  render() { 
    return (
      <div style={this.styles.container}>
        <h3 style={this.styles.header}>Sign in</h3>
        <Link to='./'><div style={this.styles.close}>X</div></Link>

        <input type="text" style={this.styles.inputBox} placeholder="username" id='submitUsername' />
        <input type="password" style={this.styles.inputBox} placeholder="password" id='submitPassword' />

        <div style={this.styles.forgot}>Forgot your username or password?</div>
        <button style={this.styles.login} onClick={ this.submit }>Login</button>
      </div>
    );
  }


  styles = {
    close: {
      position: 'absolute',
      top: 10,
      right: 20,
      color: 'black',
      cursor: 'pointer',
    },

    forgot: {
      textAlign: 'center',
      marginBottom: 10,
      marginTop: -10,
    },

    container: {
      position: 'absolute',
      top: 50,
      right: 115,
      display: 'block',
      width: 350,
      paddingBottom: 20,
      color: 'black',
      backgroundColor: 'white',
      border: '1px solid black',
      zIndex: 100,
    },

    header: {
      fontSize: 20,
      padding: '10px 0px',
      textAlign: 'center',
    },

    inputBox: {
      width: '80%',
      marginLeft: "10%",
      border: '1px solid black',
      textAlign: 'center',
      marginBottom: 15,
      borderRadius: 3,
      color: 'black',
    },

    login: {
      display: 'block',
      width: '60%',
      margin: '0px auto',
      textAlign: 'center',
      padding: '2px 10px',
      border: '1px solid black',
      cursor: 'pointer',
      tabIndex: '1',
    }

  }
}
 
export default Login;