import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/layout/NavBar';
import Alert from './components/layout/Alert';
import Search from './components/users/Search';
import Users from './components/users/Users';
import UserPage from './pages/User';
import AboutPage from './pages/About'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      user: {},
      repos: [],
      alert: null,
      isLoading: false,
    };
    this.searchUsers = this.searchUsers.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getUserRepos = this.getUserRepos.bind(this);
    this.clearUsers = this.clearUsers.bind(this);
    this.setAlert = this.setAlert.bind(this);
  }

  async searchUsers(text) {
    this.setState({ isLoading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, isLoading: false });
  }

  async getUser(username) {
    this.setState({ isLoading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, isLoading: false });
  }

  async getUserRepos(username) {
    this.setState({ isLoading: true });

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, isLoading: false });
  }

  clearUsers() {
    this.setState({ users: [], isLoading: false });
  }

  setAlert(msg, type) {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  render() {
    const {
      users,
      user,
      repos,
      alert,
      isLoading,
    } = this.state;

    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users isLoading={isLoading} users={users} />
                  </Fragment>
                )}
              />
              <Route
                exact
                path="/about"
                component={AboutPage}
              />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <UserPage
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    isLoading={isLoading}
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
