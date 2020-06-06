import React, { Component } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { login } from './../../services/authentication';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    login({ email, password })
      .then((user) => {
        //console.log(user);
        console.log('Login: Success');
        this.props.updateUser(user);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className='login-container'>
        <img src='#' alt='Logo image' />
        <form onSubmit={this.handleFormSubmission}>
          <div className='input-container'>
            <label htmlFor='email-input'>Email: </label>
            <br></br>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor='password-input'>Password: </label>
            <br></br>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='input-container'>
            <button>Login</button>
          </div>
          <div className='no-account'>
            <small>
              Don’t have a account? Take your fist step to change the world and Register{' '}
              <Link to='/authentication/register'>here</Link>
            </small>
          </div>
        </form>
      </div>
    );
  }
}
