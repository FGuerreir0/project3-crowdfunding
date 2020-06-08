import React, { Component } from 'react';
import './styles.scss';
import Needs from './../../components/Needs';

export default class CreateProjectView extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      picture: null,
      description: '',
      location: '',
      money: '',
      resources: [],
      volunteer: [],
    };
  }

  addResource = (name, quantity) => {
    const arr = [...this.state.resources];
    const obj = { name, quantity };
    arr.push(obj);
    this.setState({
      resources: arr,
    });
    console.log(this.state.resources);
  };

  addVolunteer = (name, quantity) => {
    const arr = [...this.state.volunteer];
    const obj = { name, quantity };
    arr.push(obj);
    this.setState({
      volunteer: arr,
    });
    console.log(this.state.volunteer);
  };

  prevent = (event) => {
    event.preventDefault();
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  deleteResource = (idx) => {
    const arr = [...this.state.resources];
    const newarr = arr.filter((resource, index) => idx !== index);
    this.setState({
      resources: newarr,
    });
    console.log(arr, newarr);
  };

  deleteVolunteer = (idx) => {
    const arr = [...this.state.volunteer];
    const newarr = arr.filter((v, index) => idx !== index);
    this.setState({
      volunteer: newarr,
    });
    console.log(arr, newarr);
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

          <label htmlFor='pictureUrl'>Picture </label>
          <input type='file' name='pictureUrl' id='pictureUrl' onChange={this.handleInputChange} />
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

          <label htmlFor='needs'>Needs: </label>
          {
            //<input type='number' id='money' name='money' value='money' onChange={this.handleInputChange}/>
          }
          <br></br>

          <button>Submit</button>
        </form>
        <div>
          <label>Resources</label>
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
          <Needs addResources={this.addResource} />
          <label>Volunteer</label>
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
          <Needs addResources={this.addVolunteer} />
        </div>
      </div>
    );
  }
}
