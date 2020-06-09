import React, { Component } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { getUserById } from './../../services/user';

class ProfileUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false,
      isOwner: false,
    };
  }

  componentDidMount = (props) => {
    let isOwner = false;
    if (this.props.user) isOwner = this.props.match.params.id === this.props.user._id;
    getUserById(this.props.match.params.id)
      .then((user) => {
        console.log('owner', isOwner);
        this.setState({
          user,
          loaded: true,
          isOwner,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('update');
  }

  render() {
    let user;
    if (this.props.location.user) {
      user = this.props.location.user;
    } else {
      user = this.state.user;
    }

    return (
      <div>
        {!this.state.loaded && <span>Loading</span>}
        {this.state.user && (
          <div>
            <img src={user.pictureUrl} alt='Profile' className='profile_img' />
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
            {this.state.isOwner && <Link to={`/user/${user._id}/edit`}>Edit</Link>}
          </div>
        )}
      </div>
    );
  }
}

export default ProfileUserView;
