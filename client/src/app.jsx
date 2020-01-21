
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
import Todo from './components/_index';
import Navbar from './components/topbar/navbar';
import Login from './components/topbar/login2';

import Register from './components/topbar/register';

import {listStorage} from './components/storage/list';
import FinishedTasks from './components/archived_finishedTasks';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';

class App extends Component {
  state = {
    list: [],
    displayFinishedTags: true,
    loading: true,
  }

  componentDidMount = async()=>{
    const list = listStorage();
    this.setState({list});
  }

  render() { 
    return (
      <React.Fragment>
        <BrowserRouter>
        <Navbar data={this.state.user} user={this.state.user}/>
          <Switch>
            <Route path="/login"    render={ (props)=>{ return <Login {...props} /> }} />
            <Route path="/register" render={ (props)=>{ return <Register {...props} /> }} />
          </Switch>

          {this.state.list && <Todo data={this.state.list}/> }
          {this.displayFinishedTags && <FinishedTasks /> }
          {/* <FinishedTasks /> */}
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
