import React, { Component } from 'react';
import './styles.scss';

class EditProjectView extends Component {
  componentDidMount() {
    const { title } = this.props;
    this.setState({ title });
  }

  updateInputValue(e) {
    const {
      target: { value }
    } = e;
    this.setState({ title: value });
  }

  render() {
    return (
      <div>
        <h1>This is the Edit Account View</h1>
        <form action=''>
          <input
            type='text'
            className='update-project-title'
            name='title'
            placeholder='New title'
            value={this.state.title}
            onChange={this.updateInputValue}
          />
        </form>
      </div>
    );
  }
}

export default EditProjectView;
