import React, { Component } from 'react';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    isLoading: false
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const res = await axios.get('https://api.github.com/users');

    this.setState({ users: res.data, isLoading: false });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container">
          <Users isLoading={this.state.isLoading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
