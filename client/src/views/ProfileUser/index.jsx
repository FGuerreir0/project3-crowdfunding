import React, { Component } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { getUserById } from './../../services/user';

class ProfileUserView extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.user };
  }

  componentDidMount = (props) => {
    let id = this.props.user._id;
    getUserById(id)
      .then((user) => {
        console.log(user[0]);
        this.setState = { ...user[0] };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <img src={this.state.pictureUrl} alt='Profile' className='profile_img' />

        <br></br>
        <h1>{this.state.username}</h1>
        <br></br>
        <h2>Email: {this.state.email}</h2>
        <h2>Location: {this.state.location}</h2>
        <br></br>
        <h2>About me: {this.state.bio}</h2>
        <br></br>
        <p>My Projects</p>
        <br></br>
        <p>Contributed Actions</p>
        <Link to={`/user/${this.props.user._id}/edit`}>Edit</Link>
      </div>
    );
  }
}

export default ProfileUserView;
