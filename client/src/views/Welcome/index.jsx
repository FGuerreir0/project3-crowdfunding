import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

export default class WelcomeView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='welcome-container'>
        <h1>App Instructions</h1>
        <h3>Welcome {this.props.user.username}</h3>
        <p>Insert here instructions </p>
        <div className='anchor-style'>
          <Link to='/'>→</Link>
        </div>
      </div>
    );
  }
}
