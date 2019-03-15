import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";
import Button from 'react-bootstrap/Button';

// smart component
class App extends Component {
  state = { users: [] }
  
  componentDidMount(){
    console.log(d3)

    fetch('/test')
    .then(res => res.json())
    .then(users => this.setState({ users }))
    .catch(err => console.log(err.message))
  }
  render() {
    const { users } = this.state;
    console.log('hey', users);
    return (
      <div className="App">
       <h1 className='App-h1'>Github</h1>
        {
          users.map(user => <div key={user.id}>{user.username}</div>)
        }
        <Button>Help</Button>
     <a href="https://github.com/login/oauth/authorize?client_id=fc4e944b148c9a51afeb">Sign in to GitHub</a>
      </div>
    );
  }
}

export default App;
