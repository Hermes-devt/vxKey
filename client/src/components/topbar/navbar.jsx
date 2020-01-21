import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HelpWindow from '../windows/popups/helpWindow';
import Dropdown from '../windows/popups/dropdown';
class Navbar extends Component {
  state = {
    user: false,
  }

  componentDidMount = ()=>{
    let user = localStorage.getItem('user');
    if( !user ) return;
    user = JSON.parse(user);
    console.log('user', user);
    this.setState({user});
  };

  logout = ()=>{
    localStorage.removeItem('token');
    window.location.reload();
  }
  render() { 
    const {user} = this.props;
    return (
      <div style={ this.styles.container}>
        <Link to='./'><span style={this.styles.logo}>vList</span></Link>
        <span style={this.styles.right}>
          { user && <React.Fragment>
            <Dropdown user={user.username} logout={this.logout}/>
              {/* <span style={{fontSize: 21,}}>{user.username}</span> */}
              <Link to='#' onClick={()=>false}><span style={this.styles.margin} onClick={this.logout}>Logout</span></Link>
              <HelpWindow />
          </React.Fragment> }

          {/* { !user &&
            <React.Fragment>
              <Link to='login'><span style={this.styles.margin}>Login</span></Link>
              <Link to='register'><span style={this.styles.margin}>Sign up</span></Link>
              <HelpWindow />
            </React.Fragment> } */}
        </span>
      </div>
    );
  }
  styles = {

    right: {
      float: 'right',
      marginRight: 30,
    },

    margin: {
      marginLeft: 15,
      marginRight: 5,
      fontSize: 21,
      color: 'silver',
      textDecoration: 'none',
    },

    container: {
      width: '100%',
      borderBottom: '1px solid silver',
      paddingTop: 5,
      paddingBottom: 5,
      fontStyle: 'italic',
      backgroundColor: 'black',
      textAlign: 'center',
    },

    trial: {
      position: 'absolute',
      // display: 'block',
      textAlign: 'center',
      top: 9,
      left: "47%",
      fontStyle: 'italic',
      fontSize: 25,
      color: 'silver',
    },

    logo: {
      color: 'silver',
      fontSize: 25,
      fontStyle: 'italic',
      marginLeft: 30,
      marginRight: 30,
    }
  }
}
 
export default Navbar;