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
      [name]: value
    });
  };

  handleFileInputChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    this.setState({
      [name]: file
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
        console.log('This is the error');
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            className='update-username'
            name='username'
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <label htmlFor='location'>Location: </label>
          <input
            type='text'
            className='update-location'
            name='location'
            value={this.state.location}
            onChange={this.handleInputChange}
          />

          <label htmlFor='bio'>Bio: </label>
          <textarea
            type='text'
            className='update-bio'
            name='bio'
            value={this.state.bio}
            onChange={this.handleInputChange}
          />

          <label htmlFor='pictureUrl'>Picture </label>
          <input
            type='file'
            name='pictureUrl'
            id='pictureUrl'
            onChange={this.handleFileInputChange}
          />

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default EditAccountView;
