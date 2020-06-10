import React, { Component } from 'react';
import './styles.scss';
import ProgressBar from './../../components/ProgressBar';
import { getProjectById } from './../../services/project';
import formatDate from './../../helper/formatDate';
import { Link } from 'react-router-dom';

export class SingleProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      loaded: false
    };
  }

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
  render() {
    const project = this.state.project;
    console.log(this.state.project);
    return (
      <div>
        {!this.state.loaded && (
          <>
            <span>Loading...</span>
          </>
        )}
        {project && (
          <div className='mr-16 ml-16 mt-20'>
            <div>
              <img
                className='object-contain h-50 w-full'
                src={project.coverPictureUrl}
                alt={project.title}
              />
              <div className='project_dateCreator'>
                <small>
                  <strong>Created by: </strong>
                  {project.creator.username}
                </small>
                <small>
                  <strong>Date: </strong>
                  {formatDate(project.updatedDate)}
                </small>
              </div>
            </div>

            <div className='project_information mt-16 mb-16'>
              <h2 className='text-3xl'>{project.title}</h2>
              <p className='text-base'>{project.shortDescription}</p>
            </div>

            {project.needs.money.total && (
              <div className='border-2 mb-6'>
                <div className='text-center mt-10 mb-10'>
                  <small>
                    Goal: {project.needs.money.total}€ || Achieved: {project.needs.money.backed}€
                  </small>
                  <ProgressBar project={project} />
                  <Link
                    className='text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                    to={`/project/${project._id}/contribute`}
                  >
                    Support this cause
                  </Link>
                </div>
                <div className='text-center mb-10'>
                  <Link
                    className='text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                    to={`/project/${project._id}/edit`}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default SingleProjectView;
