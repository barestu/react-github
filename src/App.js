import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/layout/NavBar';
import Alert from './components/layout/Alert';
import Search from './components/users/Search';
import Users from './components/users/Users';
import AboutPage from './pages/About'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isLoading: false,
      alert: null,
    };
    this.searchUsers = this.searchUsers.bind(this);
    this.clearUsers = this.clearUsers.bind(this);
    this.setAlert = this.setAlert.bind(this);
  }

  async searchUsers(text) {
    this.setState({ isLoading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, isLoading: false });
  }

  clearUsers() {
    this.setState({ users: [], isLoading: false });
  }

  setAlert(msg, type) {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  render() {
    const { alert, users, isLoading } = this.state;

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
              <Route exact path="/about" component={AboutPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
