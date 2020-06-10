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
      <div className='register-container  sm:text-center  lg:flex flex-row'>
        <img
          src={process.env.PUBLIC_URL + '/images/generalogo.png'}
          alt='Logo'
          className='logoImageBodyLogin'
        />

        <form onSubmit={this.handleFormSubmission} className='border-2 '>
          <div className='input-container'>
            <label htmlFor='username'>Username</label>
            <br></br>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
              required
              id='username'
              name='username'
              type='text'
              placeholder='Insert username here'
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor='email-input'>Email</label>
            <br></br>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
              required
              id='email'
              name='email'
              type='email'
              placeholder='Insert email here'
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='input-container'>
            <label htmlFor='password-input'>Password</label>
            <br></br>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
              required
              id='password'
              name='password'
              type='password'
              placeholder='A strong password here'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='input-container'>
            <button className='text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
              Register
            </button>
          </div>
          <div className='mr-4 ml-4 mb-2'>
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
