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
      <div>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            name='username'
            type='text'
            placeholder='Username'
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <label htmlFor='email-input'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <label htmlFor='password-input'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterView;
