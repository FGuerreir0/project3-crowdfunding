import React, { Component } from 'react';
import './styles.scss';
import ProgressBar from "./../../components/ProgressBar"
import { getProjectById } from './../../services/project';

export class SingleProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      loaded: false
    };
  }

  loadSingleProject() {
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
    this.loadSingleProject();
  }
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
          <>
            <ProgressBar />
            <img src={project.coverPictureUrl} />
            <h1>{project.title}</h1>
            <small>{project.shortDescription}</small>
          </>
        )}
      </div>
    );
  }
}

export default SingleProjectView;
