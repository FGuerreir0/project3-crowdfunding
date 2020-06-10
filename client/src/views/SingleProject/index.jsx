import React, { Component } from 'react';
import './styles.scss';
import ProgressBar from './../../components/ProgressBar';
import { getProjectById } from './../../services/project';
import { Link } from 'react-router-dom';

export class SingleProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      loaded: false,
    };
  }

  loadSingleProject() {
    const id = this.props.match.params.project_id;
    getProjectById(id)
      .then((project) => {
        console.log('project:', project);
        this.setState({
          loaded: true,
          project: { ...project },
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
          <div>
            <img src={project.coverPictureUrl} />
            <h1>{project.title}</h1>
            <small>{project.shortDescription}</small>
            {project.needs.money.total && (
              <div className='text-center mt-10 mb-10'>
                <ProgressBar project={project} />
                <Link
                  className='text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                  to={`/project/${project._id}/contribute`}
                >
                  Support this cause
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SingleProjectView;
