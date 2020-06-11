import React, { Component } from 'react';
import './styles.scss';
import { updateProject, getProjectById } from './../../services/project';
import NeedsInput from './../../components/Input';

class EditProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  loadSingleProject() {
    const id = this.props.match.params.project_id;
    getProjectById(id)
      .then((project) => {
        const title = project.title;
        const shortDescription = project.shortDescription;
        const coverPictureUrl = project.coverPictureUrl;
        const location = project.location;
        const category = project.category;
        const money = project.needs.money.total;
        const resources = project.needs.resources;
        const volunteer = project.needs.volunteer;
        //console.log('tutin', title, shortDescription, coverPictureUrl, location, money, resources, volunteer);
        this.setState({
          loaded: true,
          title,
          shortDescription,
          coverPictureUrl,
          category,
          location,
          money,
          resources: [...resources],
          volunteer: [...volunteer],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadSingleProject();
  }

  componentDidUpdate() {
    //console.log(this.state);
  }

  handleFileInputChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];

    this.setState({
      [name]: file,
    });
  };

  addResource = (name, quantity) => {
    const arr = [...this.state.resources];
    const obj = { name, quantity };
    arr.push(obj);
    this.setState({
      resources: arr,
    });
  };

  addVolunteer = (name, quantity) => {
    const arr = [...this.state.volunteer];
    const obj = { name, quantity };
    arr.push(obj);
    this.setState({
      volunteer: arr,
    });
  };

  deleteResource = (idx) => {
    const arr = [...this.state.resources];
    const newarr = arr.filter((resource, index) => idx !== index);
    this.setState({
      resources: newarr,
    });
  };

  deleteVolunteer = (idx) => {
    const arr = [...this.state.volunteer];
    const newarr = arr.filter((v, index) => idx !== index);
    this.setState({
      volunteer: newarr,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.project_id;
    const { title, location, shortDescription, coverPictureUrl, category, money, resources, volunteer } = this.state;

    //console.log(title, location, shortDescription, coverPictureUrl, category, money, resources, volunteer);
    updateProject({ id, title, location, shortDescription, coverPictureUrl, category, money, resources, volunteer })
      .then((project) => {
        this.props.history.push(`/project/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const project = this.state;

    return (
      <>
        {!this.state.loaded && (
          <>
            <span>Loading...</span>
          </>
        )}
        {project.title && (
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
                      value={project.category}
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
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                  <label htmlFor='money' className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                    Money
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    required
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name'
                    type='number'
                    // className='update-location'
                    name='money'
                    value={project.money}
                    onChange={this.handleInputChange}
                  />
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
            <div className='md:flex md:items-center mb-6'>
              <div className='md:w-1/3'>
                <label htmlFor='resources' className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                  Resources
                </label>
              </div>
              <div className='md:w-2/3'>
                <NeedsInput addResources={this.addResource}></NeedsInput>
              </div>
            </div>
            <div className='mb-5 mt-3'>
              {project.resources.map((resource, index) => {
                return (
                  <div key={index} style={{ display: 'flex' }}>
                    <p>
                      {resource.quantity} {resource.name}
                    </p>
                    <form onSubmit={this.prevent}>
                      <button onClick={() => this.deleteResource(index)} className='delete-btn'>
                        <p>X</p>
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
            <div className='md:flex md:items-center mb-6'>
              <div className='md:w-1/3'>
                <label htmlFor='volunteer' className='block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4'>
                  Volunteer
                </label>
              </div>
              <div className='md:w-2/3'>
                <NeedsInput addResources={this.addVolunteer}></NeedsInput>
              </div>
            </div>
            <div className='mb-5 mt-3'>
              {project.volunteer.map((volunteer, index) => {
                return (
                  <div key={index} style={{ display: 'flex' }}>
                    <p>
                      {volunteer.quantity} {volunteer.name}
                    </p>
                    <form onSubmit={this.prevent}>
                      <button onClick={() => this.deleteVolunteer(index)} className='delete-btn'>
                        <p>X</p>
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
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
