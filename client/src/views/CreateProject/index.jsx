import React, { Component } from 'react';
import './styles.scss';
import NeedsInput from './../../components/Input';
import { createProject } from './../../services/project';

export default class CreateProjectView extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      coverPictureUrl: null,
      description: '',
      category: 'Food',
      location: '',
      money: '',
      resources: [],
      volunteer: []
    };
  }

  addResource = (name, quantity) => {
    const arr = [...this.state.resources];
    const obj = { name, quantity };
    arr.push(obj);
    this.setState({
      resources: arr
    });
  };

  addVolunteer = (name, quantity) => {
    const arr = [...this.state.volunteer];
    const obj = { name, quantity };
    arr.push(obj);
    this.setState({
      volunteer: arr
    });
  };

  prevent = (event) => {
    event.preventDefault();
  };

  handleInputChange = ({ target: { name, value } }) => {
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  handleFileInputChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    this.setState({
      [name]: file
    });
  };

  deleteResource = (idx) => {
    const arr = [...this.state.resources];
    const newarr = arr.filter((resource, index) => idx !== index);
    this.setState({
      resources: newarr
    });
  };

  deleteVolunteer = (idx) => {
    const arr = [...this.state.volunteer];
    const newarr = arr.filter((v, index) => idx !== index);
    this.setState({
      volunteer: newarr
    });
  };

  create = (event) => {
    event.preventDefault();
    const data = { ...this.state };
    createProject(data)
      .then((result) => {
        console.log('result');
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <form>
          <label htmlFor='title'>Title </label>
          <input
            id='title'
            type='text'
            name='title'
            placeholder='Insert title here'
            onChange={this.handleInputChange}
          />
          <br></br>
          <label htmlFor='picture'>Picture </label>
          <input
            type='file'
            name='coverPictureUrl'
            id='picture'
            onChange={this.handleFileInputChange}
          />
          <br></br>
          <label htmlFor='description'>Description </label>
          <input
            id='description'
            type='text'
            name='description'
            placeholder='Insert description here'
            onChange={this.handleInputChange}
          />
          <br></br>
          <label htmlFor='location'>Location </label>
          <input
            id='location'
            type='location'
            name='location'
            placeholder='Insert location here'
            onChange={this.handleInputChange}
          />
          <br></br>
          <label htmlFor='category'>Choose a category:</label>
          <select id='category' name='category' onChange={this.handleInputChange}>
            <option value='Food'>Food</option>
            <option value='Education'>Education</option>
            <option value='Environment'>Environment</option>
            <option value='Sanitation'>Sanitation</option>
            <option value='Human Rights'>Human Rights</option>
            <option value='Donation'>Donation</option>
            <option value='Other'>Other</option>
          </select>

          <br></br>
          <h1>Needs: </h1>
          <label htmlFor='money'>Money: </label>
          <input
            type='number'
            id='money'
            name='money'
            value={this.state.money}
            onChange={this.handleInputChange}
          />
          <br></br>
        </form>
        <div>
          <label>Resources</label>

          <NeedsInput addResources={this.addResource} />

          <label>Volunteer</label>

          <NeedsInput addResources={this.addVolunteer} />

          {this.state.resources.map((resource, index) => {
            return (
              <div key={index}>
                <p>
                  name:{resource.name} qty:{resource.quantity}
                </p>
                <form onSubmit={this.prevent}>
                  <button onClick={() => this.deleteResource(index)}>delete</button>
                </form>
              </div>
            );
          })}
          {this.state.volunteer.map((volunteer, index) => {
            return (
              <div key={index}>
                <p>
                  name:{volunteer.name} qty:{volunteer.quantity}
                </p>
                <form onSubmit={this.prevent}>
                  <button onClick={() => this.deleteVolunteer(index)}>delete</button>
                </form>
              </div>
            );
          })}
        </div>
        <form onSubmit={this.create}>
          <button>Create Project</button>
        </form>
      </div>
    );
  }
}
