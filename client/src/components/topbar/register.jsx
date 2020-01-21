import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import axios from 'axios';

class Register extends Component {
  state = {  }

  schema = {
    username: Joi.string().min(3).max(45),
    email: Joi.string().min(3).max(100),
    password: Joi.string().min(3).max(50),
  }

  submit = async ()=> {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const email    = document.getElementById('registerEmail').value;
    const user = { username, password, email };

    const result = Joi.validate( user, this.schema);
    if( result.error){
      console.log('error', result.error.message);
      return;
    }

    try{
      // const response = await axios.post('/user/register', user);
      const response = await axios.post('/')
      // console.log('user registering process', response.headers['x-auth-token']);
      localStorage.setItem('token', response.headers['x-auth-token']);
      window.location = '/';
    }catch(ex){
      if( ex.response && ex.response.status === 400 ){
        // let errors = { ...this.state.errors };
        // errors.username = ex.response.data;
        // this.setState({errors});
      }
      console.log('ex', ex.message);
    }
  }

  render() { 
    return (
      <div style={this.styles.container}>
        <h3 style={this.styles.header}>Register</h3>
        <Link to='./'><div style={this.styles.close}>X</div></Link>
        <input type="text" style={this.styles.inputBox} placeholder="Username" id='registerUsername' />
        <input type="text" style={this.styles.inputBox} placeholder="Email" id='registerEmail' />
        <input type="password" style={this.styles.inputBox} placeholder="password" id='registerPassword' />
        <div style={this.styles.forgot}>Password need to be at least 6 characters long</div>
        <button style={this.styles.submit} onClick={ this.submit }>register</button>
      </div>
    );
  }

  styles = {
    close: {
      position: 'absolute',
      top: 13,
      right: 20,
      cursor: 'pointer',
      color: 'black',
      padding: '1px 7px',
      fontSize: 14,
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      borderRadius: 3,
    },

    forgot: {
      textAlign: 'center',
      marginBottom: 10,
      marginTop: -10,
    },

    container: {
      position: 'absolute',
      top: 50,
      right: 50,
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

    submit: {
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
 
export default Register;