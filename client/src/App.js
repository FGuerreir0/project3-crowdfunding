import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

//IMPORT COMPONENTS HERE
import NavBar from './components/Navbar';

//IMPORT ROUTES HERE
import RegisterView from './views/Register';
import LoginView from './views/Login';
import WelcomeView from './views/Welcome';
import CreateProjectView from './views/CreateProject';
import ProfileView from './views/ProfileUser';
import SingleProjectView from './views/SingleProject';
import EditProfileView from './views/SingleProject';

//IMPORT SERVICES HERE
import { loadAuthenticatedUser } from './services/authentication';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
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
            <NavBar user={this.state.user} updateUser={this.updateUser} />

            <Switch>
              {/* AUTHENTICATION ROUTES*/}
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

              {/* PROJECT ROUTES*/}
              <Route
                exact
                path='/create'
                render={(props) => <CreateProjectView {...props} user={this.state.user} />}
              />
              <Route
                exact
                path='/project/:project_id'
                render={(props) => <SingleProjectView {...props} />}
              />

              <Route
                exact
                path='/project/:project_id/edit'
                render={(props) => <EditProfileView {...props} />}
              />

              {/* PROFILE ROUTES*/}
              <Route
                exact
                path='/user/:id'
                render={(props) => <ProfileView {...props} user={this.state.user} />}
              />

              <Route
                exact
                path='/user/:user_id/edit'
                render={(props) => <EditProfileView {...props} />}
              />

              <Route
                exact
                path='/user/:user_id/projects'
                render={(props) => <EditProfileView {...props} />}
              />

              <Route
                exact
                path='/user/:user_id/actions'
                render={(props) => <EditProfileView {...props} />}
              />
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}
export default App;
