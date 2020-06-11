import React, { Component } from 'react';
import './styles.scss';
import { getAllprojects } from './../../services/project';
import { Link } from 'react-router-dom';
import ProjectsList from './../../components/ProjectList';
import Fact from './../../components/Fact';

class HomeView extends Component {
  constructor(props) {
    super(props);
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

  render(props) {
    return (
      <div>
        <div className='landing'></div>
        <div className='mt-12 mb-6 text-center'>
          {this.props.user && (
            <Link
              className=' text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded '
              to='/create'
            >
              Create a Cause
            </Link>
          )}
        </div>

        <div className='mt-2 mb-6 text-center' id='facts'>
          <Fact />
        </div>
        <ProjectsList projects={this.state.projects} user={this.props.user} />
      </div>
    );
  }
}

export default HomeView;

//ARTUR VERSION
/*
import React, { Component } from 'react';
import './styles.scss';
import { getAllprojects } from './../../services/project';
import { Link } from 'react-router-dom';
import ProjectsList from './../../components/ProjectList';
import Fact from './../../components/Fact';

class HomeView extends Component {
  constructor(props) {
    super(props);
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

  render(props) {
    return (
      <div>
        <div className='landing'></div>
        <div className='mt-12 mb-6 text-center'>
          {this.props.user && (
            <Link
              className=' text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded '
              to='/create'
            >
              Create a Cause
            </Link>
          )}
        </div>

        <div className='mt-2 mb-6 text-center' id='facts'>
          <Fact />
        </div>
        <ProjectsList projects={this.state.projects} user={this.props.user} />
      </div>
    );
  }
}

export default HomeView;*/
