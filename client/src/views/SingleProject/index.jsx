import React, { Component } from 'react';
import './styles.scss';

import { getProjectById } from './../../services/project';

class SingleProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      project: null
    };
  }

  getSingleProject() {
    const id = this.props.match.params.id;
    getProjectById(id)
      .then((project) => {
        this.setState({
          loaded: true,
          project
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getSingleProject();
  }

  render() {
    const project = this.state.project;

    return (
      <div>
        {this.state.loaded && (
          <>
            <span>Loading... </span>
          </>
        )}

        {project && (
          <>
            <img src={project.coverPictureUrl} alt={project.title} />
            <h1>{project.title}</h1>
            <small>{/* TODO: Contribution - (Backed/Total) */}</small>
            <div>
              <h2>{project.location}</h2>
              <p>{project.description}</p>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default SingleProjectView;
