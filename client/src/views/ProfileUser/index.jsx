import React, { Component } from 'react';
import './styles.scss';

class ProfileUserView extends Component {
  constructor(props) {
    super(props);
  }
  render(props) {
    console.log(this.props.user);
    return (
      <div>
        <h1>This is the Profile User Project View</h1>
        <h2>{this.props.user.username}'s Profile</h2>
      </div>
    );
  }
}

export default ProfileUserView;
