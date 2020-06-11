import React, { Component } from 'react';
import './styles.scss';
import { updateUser } from './../../services/user';

class EditAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.user };
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleFileInputChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    this.setState({
      [name]: file,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { _id, username, location, bio, pictureUrl } = this.state;

    updateUser({ _id, username, location, bio, pictureUrl })
      .then((user) => {
        this.props.updateUser(user);
        this.props.history.push({ pathname: `/user/${user._id}`, user });
      })
      .catch((error) => {
        // console.log('This is the error');
        console.log(error);
      });
  };

  render() {
    return (
      <div className='m-5'>
        <div>
          <p className='text-gray-700 text-4xl font-bold md:text-center pb-20 pt-10 md:mb-0 pr-4'>Editing Profile</p>
        </div>
        <form onSubmit={this.handleSubmit} className='w-full max-w-sm'>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label htmlFor='username' className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                Username:{' '}
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                type='text'
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                name='username'
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label htmlFor='location' className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                Location:{' '}
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                type='text'
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                name='location'
                value={this.state.location}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label htmlFor='bio' className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                Bio:{' '}
              </label>
            </div>
            <div className='md:w-2/3'>
              <textarea
                type='text'
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                name='bio'
                value={this.state.bio}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='pictureUrl'>
                Picture{' '}
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                type='file'
                name='pictureUrl'
                id='pictureUrl'
                onChange={this.handleFileInputChange}
              />
            </div>
          </div>
          <div className='mt-12 text-center'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditAccountView;
