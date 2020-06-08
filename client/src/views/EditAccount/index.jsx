import React, { Component } from 'react';
import './styles.scss';

class EditAccountView extends Component {
  componentDidMount() {
    const { username } = this.props;
    this.setState({ username });
  }

  updateInputValue(e) {
    const {
      target: { value }
    } = e;
    this.setState({ username: value });
  }

  render() {
    return (
      <div>
        <h1>This is the Edit Account View</h1>
        <form action=''>
          <input
            type='text'
            className='update-username'
            name='username'
            placeholder='Your new username'
            value={this.state.username}
            onChange={this.updateInputValue}
          />
        </form>
      </div>
    );
  }
}

export default EditAccountView;
