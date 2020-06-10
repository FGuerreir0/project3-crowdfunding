import React, { Component } from 'react';
import './styles.scss';
import { updateProject } from './../../services/project';

class EditProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.project };
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleFileInputChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    this.setState({
      [name]: file
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { _id, title, description, location, coverPictureUrl } = this.state;

    updateProject({ _id, title, description, location, coverPictureUrl })
      .then((project) => {
        updateProject(project);
        this.props.history.push({ pathname: `/project/${project._id}`, project });
        console.log(this.state.props);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    {
      /*console.log(this.props.match.params);*/
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='update-title'
            name='title'
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <label htmlFor='description'>Description</label>
          <input
            type='textarea'
            className='update-description'
            name='description'
            value={this.state.description}
            onChange={this.handleInputChange}
          />

          <label htmlFor='location'>Location</label>
          <input
            type='text'
            className='update-location'
            name='location'
            value={this.state.location}
            onChange={this.handleInputChange}
          />

          <label htmlFor='coverPictureUrl'>Cover Picture</label>
          <input
            type='file'
            name='coverPictureUrl'
            id='coverPictureUrl'
            onChange={this.handleFileInputChange}
          />

          <button> Submit </button>
        </form>
      </div>
    );
  }
}

export default EditProjectView;
