// import React, { Component } from 'react';
// import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   state = {
//     response: '',
//     post: '',
//     responseToPost: '',
//   };
  
//   componentDidMount = async ()=>{
//     this.callApi()
//       .then(res => this.setState({ response: res.express }))
//       .catch(err => console.log(err));

//     const response = await axios.get('/api/hello')
//     console.log( 'response', response.data);

//       // .then

//   }
  
//   callApi = async () => {
//     fetch('/api/hello')
//       .then(response=> response.json())
//       .then(data=> this.setState({ data }))
//       .catch(error=> this.setState({error, isLoading: false}));
    


//     // const response = await fetch('/api/hello');
//     // const body = await response.json();
//     // if (response.status !== 200) throw Error(body.message);
    
//     const response2 = await fetch('/api/buu')
//     const body2 = await response2.json();
//     console.log( 'response2', body2);

//     return body2;
//   };
  
//   handleSubmit = async e => {
//     e.preventDefault();
//     const response = await fetch('/api/world', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ post: this.state.post }),
//     });
//     const body = await response.text();
    
//     this.setState({ responseToPost: body });
//   };
  
// render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//         <p>{this.state.response}</p>
//         <form onSubmit={this.handleSubmit}>
//           <p>
//             <strong>Post to Server:</strong>
//           </p>
//           <input
//             type="text"
//             value={this.state.post}
//             onChange={e => this.setState({ post: e.target.value })}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <p>{this.state.responseToPost}</p>
//       </div>
//     );
//   }
// }

// export default App;
