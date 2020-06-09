import React, { Component } from 'react';
import './styles.scss';
import { updateUser } from './../../services/user';

class EditAccountView extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.user };
  }

  updateInputValue = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({ username: value });
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { _id, username, location, bio } = this.state;
    updateUser({ _id, username, location, bio })
      .then((user) => {
        this.props.history.push(`/user/${user._id}`);
      })
      .catch((error) => {
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
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default EditAccountView;
