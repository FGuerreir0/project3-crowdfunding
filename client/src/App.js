import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

//IMPORT ROUTES HERE

import RegisterView from './views/Register';
import LoginView from './views/Login';
import WelcomeView from './views/Welcome';

//IMPORT SERVICES HERE
import { loadAuthenticatedUser } from './services/authentication';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    loadAuthenticatedUser()
      .then((user) => {
        this.updateUser(user);
        this.setState({
          loaded: true
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateUser = (user) => {
    this.setState({
      user
    });
  };

  render() {
    return (
      <div className='App'>
        {this.state.loaded && (
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path='/authentication/register'
                render={(props) => <RegisterView {...props} updateUser={this.updateUser} />}
              />

              <Route
                exact
                path='/authentication/login'
                render={(props) => <LoginView {...props} updateUser={this.updateUser} />}
              />

              <Route
                exact
                path='/welcome'
                render={(props) => <WelcomeView {...props} user={this.state.user} />}
              />
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}
export default App;
