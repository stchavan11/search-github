import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar.component';
import Users from './components/users/Users.component';
import User from './components/users/User.component';
import axios from 'axios';
import Search from './components/users/Search.component';
import About from './components/pages/About.component';
class App extends React.Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  // async componentDidMount() {

  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ users: res.data, loading: false });
  // }
  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  };

  //Get single github user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  }

  // Get user repo
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false });
  }


  clearUsers = () => this.setState({ users: [], loading: false });
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar title="SEARCH Github"
            icon="fab fa-github" />
          <div className="container">
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
                    showClear={this.state.users.length > 0 ? true : false}
                  />
                  <Users loading={this.state.loading} users={this.state.users} />

                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/users/:login' render={props => (
                <User {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={this.state.user}
                  repos={this.state.repos}
                  loading={this.state.loading} />
              )} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }

}

export default App;
