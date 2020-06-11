import React, { Component } from 'react';
import './styles.scss';
import { updateProject, getProjectById } from './../../services/project';

class EditProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = { project: null, loaded: false, money: '' };
  }

  handleInputChange = ({ target: { name, value } }) => {
    // console.log(this.state.project);
    const newProject = { ...this.state.project };
    newProject[name] = value;
    this.setState({
      project: newProject,
    });
  };

  handleMoneyInputChange = ({ target: { value } }) => {
    this.setState({
      money: value,
    });
  };

  loadSingleProject() {
    const id = this.props.match.params.project_id;
    getProjectById(id)
      .then((project) => {
        // console.log('project:', project);
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

  handleFileInputChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    const newProject = { ...this.state.project };
    newProject[name] = file;
    this.setState({
      project: newProject,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.project);
    const id = this.props.match.params.project_id;
    const money = this.state.money;
    console.log(money);
    const { title, location, shortDescription, coverPictureUrl, category } = this.state.project;

    // console.log(title, location, shortDescription, coverPictureUrl);
    updateProject({ id, title, location, shortDescription, coverPictureUrl, category, money })
      .then((project) => {
        this.props.history.push(`/project/${id}`);
      })
      .catch((error) => {
        // console.log('This is the error');
        console.log(error);
      });
  };

  render() {
    const project = this.state.project;

    return (
      <>
        {!this.state.loaded && (
          <>
            <span>Loading...</span>
          </>
        )}
        {project && (
          <div className='m-5'>
            <div>
              <p className='text-gray-700 text-4xl font-bold md:text-center pb-20 pt-10 md:mb-0 pr-4'>
                Editing Cause Details
              </p>
            </div>
            <form onSubmit={this.handleSubmit} className='w-full max-w-sm'>
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                  <label htmlFor='title' className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                    Title
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    required
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                    type='text'
                    //className='update-title'
                    name='title'
                    value={project.title}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                  <label className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='picture'>
                    Picture{' '}
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                    type='file'
                    name='coverPictureUrl'
                    id='coverPictureUrl'
                    onChange={this.handleFileInputChange}
                  />
                </div>
              </div>
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                  <label
                    htmlFor='description'
                    className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'
                  >
                    Description
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    required
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                    type='text'
                    //className='update-shortDescription'
                    name='shortDescription'
                    value={project.shortDescription}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                  <label htmlFor='location' className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                    Location
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    required
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                    type='text'
                    // className='update-location'
                    name='location'
                    value={project.location}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                  <label htmlFor='category' className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                    Category:
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <div className='inline-block relative w-64'>
                    <select
                      id='category'
                      name='category'
                      onChange={this.handleInputChange}
                      className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                    >
                      <option value='Food'>Food</option>
                      <option value='Education'>Education</option>
                      <option value='Environment'>Environment</option>
                      <option value='Sanitation'>Sanitation</option>
                      <option value='Human Rights'>Human Rights</option>
                      <option value='Donation'>Donation</option>
                      <option value='Other'>Other</option>
                    </select>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                      <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                  <label
                    htmlFor='money'
                    className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'
                  >
                    Money
                  </label>
                </div>
                <div className='md:w-2/3 flex flex-row'>
                  <input
                    min='0'
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                    id='money'
                    type='number'
                    name='money'
                    placeholder='insert amount'
                    onChange={this.handleMoneyInputChange}
                  />
                  <p className='mt-2'>€</p>
                </div>
        </div>*/}
            </form>
            <form className='mt-12 text-center' onSubmit={this.handleSubmit}>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
                {' '}
                Submit{' '}
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default EditProjectView;
