import React, { Component } from 'react';
import { register } from './../../services/authentication';
import './styles.scss';

class RegisterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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

    const { username, email, password } = this.state;
    //console.log(username, email, password);
    register({ username, email, password })
      .then((user) => {
        //console.log(user);
        this.props.updateUser(user);
        this.props.history.push('/welcome');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className='register-container'>
        <img src='#' alt='Logo image' />

        <form onSubmit={this.handleFormSubmission}>
          <div className='input-container'>
            <label htmlFor='username'>Username</label>
            <br></br>
            <input
              id='username'
              name='username'
              type='text'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor='email-input'>Email</label>
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
            <label htmlFor='password-input'>Password</label>
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
            <button>Register</button>
          </div>
          <div>
            <small className='smaller-container'>
              Did you know?<br></br>
              Food waste in Europe alone could feed 200 million hungry people
            </small>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterView;
