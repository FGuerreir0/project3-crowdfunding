import React, { Component } from 'react';
import './styles.scss';
import { getAllprojects } from './../../services/project';
import { Link } from 'react-router-dom';
import ProjectsList from './../../components/ProjectList';

class HomeView extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData() {
    getAllprojects()
      .then((list) => {
        this.setState({
          projects: [...list]
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className='mt-16 mb-16 text-center'>
          <Link
            className=' text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded '
            to='/create'
          >
            Create a Cause
          </Link>
        </div>
        <ProjectsList projects={this.state.projects} />
      </div>
    );
  }
}

export default HomeView;
