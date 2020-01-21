import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
// import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <App />, document.getElementById('root'));
serviceWorker.unregister();
