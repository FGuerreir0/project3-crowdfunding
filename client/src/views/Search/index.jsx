import React, { Component } from 'react';
import queryString from 'query-string';

import ProjectList from './../../components/ProjectList';

import { searchForProject } from './../../services/project';

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
        <ProjectList projects={projects} />
      </div>
    );
  }
}

export default SearchView;
