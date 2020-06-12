import React, { Component } from 'react';
import queryString from 'query-string';

import ProjectList from './../../components/ProjectList';
import './styles.scss';
import { Link } from 'react-router-dom';
import { searchForProject } from './../../services/project';
import Fact from './../../components/Fact';

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  triggerSearch() {
    const { term } = queryString.parse(this.props.location.search);
    searchForProject(term)
      .then((projects) => {
        this.setState({
          projects
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.triggerSearch();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.location.search !== this.props.location.search) {
      // Search term has changed, search should be triggered
      this.triggerSearch();
    }
  }

  render() {
    const projects = this.state.projects;
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
        <ProjectList projects={projects} />
      </div>
    );
  }
}

export default SearchView;
