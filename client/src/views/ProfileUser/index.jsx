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

            {
              //só pra teste - no lugar do project.title vai um component com as informacoes do projeto
              this.state.projects.map((project) => {
                return <p>{project.title}</p>;
              })
            }

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
