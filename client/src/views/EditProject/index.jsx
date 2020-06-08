import React, { Component } from 'react';
import './styles.scss';
import axios from 'axios';

class EditProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      description: '',
      location: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getProjectDetails() {
    let projectId = this.props.match.params.id;
    axios
      .get(/*Project single page path*/)
      .then((res) => {
        this.setState(
          {
            id: res.data.id,
            title: res.data.name,
            description: res.data.description,
            location: res.data.location
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((err) => console.log(err));
  }

  editProject(newProject) {
    // If everything is working, this would handle the form submit
  }

  onSubmit(e) {
    const newProject = {
      title: this.title.value,
      description: this.description.value,
      location: this.location.value
    };
    this.editProject(newProject);
    e.preventDefault();
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;

    const name = target.name;

    this.setState({
      [name]: value
    });
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
            onChange={this.handleInputChange}
          />
          <input
            type='text'
            className='update-project-description'
            name='description'
            placeholder='New Description'
            value={this.state.description}
            onChange={this.handleInputChange}
          />

          <input
            type='text'
            className='update-project-location'
            name='title'
            placeholder='New location'
            value={this.state.location}
            onChange={this.handleInputChange}
          />
        </form>
      </div>
    );
  }
}

export default EditProjectView;
