import React, { Component } from 'react';
import './styles.scss';
import ProgressBar from './../../components/ProgressBar';
import { getProjectById, deleteProjectById } from './../../services/project';
import formatDate from './../../helper/formatDate';
import { Link } from 'react-router-dom';

export class SingleProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      loaded: false,
      resources: false,
      volunteers: false
    };
  }

  loadSingleProject() {
    const id = this.props.match.params.project_id;
    getProjectById(id)
      .then((project) => {
        //  console.log('project:', project);
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

  handleDelete = () => {
    this.deleteProject();
  };

  deleteProject() {
    const id = this.props.match.params.project_id;
    // console.log('vamos eliminar', id);
    deleteProjectById(id)
      .then((project) => {
        this.props.history.push(`/`);
      })
      .catch((error) => {
        // console.log('This is the error');
        console.log(error);
      });
  }

  render() {
    const project = this.state.project;
    let haveResources = false;
    let haveVolunteers = false;
    let iscreator = false;
    // console.log(this.props.user);

    if (project) {
      if (project.needs.resources.length !== 0) {
        haveResources = true;
      }
      if (project.needs.volunteer.length !== 0) {
        haveVolunteers = true;
      }
      if (this.props.user._id === project.creator._id) {
        iscreator = true;
      }
    }
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
                className='object-contain imageSingleProject'
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
              <p className='location'>
                <i className='fas fa-map-marker-alt'> </i>
                {' ' + project.location}
              </p>
              <p className='text-base'>{project.shortDescription}</p>

              {iscreator && (
                <div className='text-center mb-10'>
                  <Link
                    className='text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 border border-blue-700 rounded mr-4'
                    to={`/project/${project._id}/edit`}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={this.handleDelete}
                    className='text-center bg-red-800 hover:bg-red-900 text-white font-bold 
                   px-2 border border-red-900 rounded'
                  >
                    Delete
                  </button>
                </div>
              )}
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
              </div>
            )}
            <div className=' pt-6 pr-6 pl-6 mr-10 ml-10 flex flex-row justify-between'>
              {haveResources && (
                /* Something will show */
                <div>
                  <p>Resources needed:</p>
                  <table className='table-auto mt-6 mb-10'>
                    <thead>
                      <tr>
                        <th className='px-4 py-2'>Resource</th>
                        <th className='px-4 py-2'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* map */}
                      {project.needs.resources.map((resource) => (
                        <tr key={resource._id}>
                          <td className='border-2 px-4 py-2 text-center'>{resource.name}</td>
                          <td className='border-2 px-4 py-2 text-center'>
                            {resource.quantity} und.
                          </td>
                        </tr>
                      ))}
                      {/* FIM DE MAP */}
                    </tbody>
                  </table>
                </div>
              )}
              {haveVolunteers && (
                <div>
                  <p>Volunteers:</p>
                  <table className='table-auto mt-6 mb-10'>
                    <thead>
                      <tr>
                        <th className='px-4 py-2'>Type</th>
                        <th className='px-4 py-2'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* map */}
                      {project.needs.volunteer.map((volunteer) => (
                        <tr key={volunteer._id}>
                          <td className='border-2 px-4 py-2 text-center'>{volunteer.name}</td>
                          <td className='border-2 px-4 py-2 text-center'>{volunteer.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className='mb-8'>
              <p className='mb-4 mt-6'>If you want to contribute with any resources, needs: </p>
              <Link
                className='text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                to={`/user/${project.creator._id}`}
              >
                Contact me
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default SingleProjectView;
