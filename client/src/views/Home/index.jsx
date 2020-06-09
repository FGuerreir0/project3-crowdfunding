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
          projects: list
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.projects);
    return (
      <div>
        <div>
          <Link to='/create'>Create a Cause</Link>
        </div>
        <ProjectsList projects={this.state.projects} />
      </div>
    );
  }
}

export default HomeView;
