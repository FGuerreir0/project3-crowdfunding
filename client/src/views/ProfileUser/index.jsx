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
        this.setState = { ...user[0] };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('update');
    console.log('history', this.props.location);
  }

  render() {
    let user;
    if (this.props.location.user) {
      user = this.props.location.user;
    } else {
      user = this.props.user;
    }

    return (
      <div>
        <img src={user.pictureUrl} alt='Profile' className='profile_img' />
        {this.props.location.state && <h1>{this.props.location.user.username} </h1>}
        <br></br>
        <h1>{user.username}</h1>
        <br></br>
        <h2>Email: {user.email}</h2>
        <h2>Location: {user.location}</h2>
        <br></br>
        <h2>About me: {user.bio}</h2>
        <br></br>
        <p>My Projects</p>
        <br></br>
        <p>Contributed Actions</p>
        <Link to={`/user/${user._id}/edit`}>Edit</Link>
      </div>
    );
  }
}

export default ProfileUserView;
