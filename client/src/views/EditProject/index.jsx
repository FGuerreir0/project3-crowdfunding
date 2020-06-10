import React, { Component } from 'react';
import './styles.scss';
import { updateProject, getProjectById } from './../../services/project';

class EditProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = { project: null, loaded: false };
  }

  handleInputChange = ({ target: { name, value } }) => {
    console.log(this.state.project);
    this.setState({
      project: { [name]: value }
    });
  };

  loadSingleProject() {
    const id = this.props.match.params.project_id;
    getProjectById(id)
      .then((project) => {
        console.log('project:', project);
        this.setState({
          loaded: true,
          project: { ...project }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadSingleProject();
  }

  handleFileInputChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    this.setState({
      project: { [name]: file }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.project);
    const id = this.props.match.params.project_id;
    const { title, location, description, coverPictureUrl } = this.state.project;

    console.log(this.state);
    updateProject({ id, title, location, description, coverPictureUrl })
      .then((project) => {
        this.props.history.push(`/project/${id}`);
      })
      .catch((error) => {
        console.log('This is the error');
        console.log(error);
      });
  };

  render() {
    const project = this.state.project;

    return (
      <div>
        {!this.state.loaded && (
          <>
            <span>Loading...</span>
          </>
        )}
        {project && (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              className='update-title'
              name='title'
              value={project.title}
              onChange={this.handleInputChange}
            />
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              className='update-description'
              name='description'
              value={project.description}
              onChange={this.handleInputChange}
            />

            <label htmlFor='location'>Location</label>
            <input
              type='text'
              className='update-location'
              name='location'
              value={project.location}
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
        )}
      </div>
    );
  }
}

export default EditProjectView;
