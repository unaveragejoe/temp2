import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { users: [] }
  
  componentDidMount(){
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
       <h1>Github</h1>
        {
          users.map(user => <div key={user.id}>{user.username}</div>)
        }
     <a href="https://github.com/login/oauth/authorize?client_id=e87c1c7838200c6a1f9a&scope=repo gist">Sign in to GitHub</a>
      </div>
    );
  }
}

export default App;
