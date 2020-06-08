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

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
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
          <Needs addResources={this.addResource} />
          <label>Volunteer</label>
          <Needs addResources={this.addVolunteer} />
        </div>
      </div>
    );
  }
}
