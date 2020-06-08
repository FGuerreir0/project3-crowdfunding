import React, { Component } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

class ProfileUserView extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    console.log(this.state);
    return (
      <div className=''>
        <img src={this.props.user.pictureUrl} alt='Profile' className='profile_img' />
        )}
        <br></br>
        <h1>{this.props.user.username}</h1>
        <br></br>
        <h2>Email: {this.props.user.email}</h2>
        <h2>Location: {this.props.user.location}</h2>
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
