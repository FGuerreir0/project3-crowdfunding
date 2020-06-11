import React, { Component } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { getUserById } from './../../services/user';
import HorizontalCardList from './../../components/HorizontalCardList';

class ProfileUserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false,
      isOwner: false,
      projects: [],
    };
  }

  componentDidMount = (props) => {
    let isOwner = false;
    if (this.props.user) isOwner = this.props.match.params.id === this.props.user._id;
    getUserById(this.props.match.params.id)
      .then((result) => {
        console.log('owner', isOwner);
        console.log('result', result);
        this.setState({
          user: result.user,
          loaded: true,
          isOwner,
          projects: [...result.projects],
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
          <div className='main'>
            <div className='profile'>
              <img src={user.pictureUrl} alt='Profile' className='img' />
              <p className='name'>{user.username}</p>
              <p className='email'>{user.email}</p>
              <p className='aboutme'>{user.bio}</p>
              <p className='location'>
                <i className='fas fa-map-marker-alt'> </i>
                {' ' + user.location}
              </p>

              {this.state.isOwner && (
                <Link to={`/user/${user._id}/edit`}>
                  <p className='edit'>Edit</p>
                </Link>
              )}
            </div>
            <hr />
            <div className='section'>
              <p>Projects</p>
              <HorizontalCardList projects={this.state.projects}></HorizontalCardList>

              <p className='actions'>Contributed Actions</p>
              <HorizontalCardList projects={this.state.projects}></HorizontalCardList>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileUserView;
