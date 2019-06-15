import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Alert from './components/layout/Alert';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import AboutPage from './pages/About';
import NotFoundPage from './pages/404';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <NavBar />
            <div className="container">
              <Alert />
              <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/about" component={AboutPage} exact />
                <Route path="/user/:login" component={UserPage} exact />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
