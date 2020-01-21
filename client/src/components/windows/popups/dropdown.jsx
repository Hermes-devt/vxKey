import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DropDownMenu extends Component {
  state = {
    displayDropDown: false,
    onUserName: false,
    onUserMenu: false
  };

  changeDisplayState = () => {
    const displayDropDown = !this.state.displayDropDown;
    this.setState({ displayDropDown });
  };

  mouseoverUser = () => {
    const onUserName = true;
    this.setState({ onUserName });
    const displayDropDown = !this.state.displayDropDown;
    this.setState({ displayDropDown });
  };

  mouseoutfromUser = () => {
    const onUserName = false;
    this.setState({ onUserName });
  };

  mouseenterMenu = ()=>{
    const onUserMenu = true; 
    this.setState({onUserMenu});
  }

  mouseLeftMenu= ()=> {
    const onUserName = true;
    this.setState({ onUserName });
  }

  render() {
    return (
      <React.Fragment>
        <div style={style.container}>
          <span
            style={style.user}
            onMouseEnter={this.mouseoverUser}
            onMouseLeave={this.mouseoutfromUser}
          >
            {this.props.user && this.props.user}
          </span>

          {this.state.displayDropDown && (
            <div style={style.dropdown}
            onMouseLeave={this.mouseLeftMenu}
            >
              <Link to="#" onClick={() => false}>
                <span style={style.menuOption} onClick={this.props.logout}>Logout</span>
              </Link>
              <span style={style.menuOption}>Settings</span>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const style = {
  menuOption: {
    color: 'white',
    display: 'block',
    textDecoration: 'none',
    fontSize: 21,
    borderBottom: '1px solid silver',
    paddingLeft: 20,
    cursor: 'pointer',
  },

  container: {
    position: 'relative',
  },

  dropdown: {
    position: 'absolute',
    top: 40,
    left: -50,
    width: '200px',
    height: 200,
    backgroundColor: 'black',
    borderRadius: 5,
    border: '1px solid black',
  },
  user: {
    display: 'inline-block',
    color: 'silver',
    fontSize: 22,
    fontStyle: 'italic',
    cursor: 'pointer',
  },
}
 
export default DropDownMenu;