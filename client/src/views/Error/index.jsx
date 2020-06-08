import React, { Component } from 'react';
import './styles.scss';

class ErrorView extends Component {
  render() {
    const code = this.props.match.params.code;

    let message;

    switch (code) {
      case '404':
        message = 'Page Not Found';
        break;
      case '401':
        message = 'Not authorized';
        break;
      default:
        message = '):';
    }

    return (
      <div>
        <h1>Something went wrong</h1>
        <p>{message}</p>
      </div>
    );
  }
}

export default ErrorView;
