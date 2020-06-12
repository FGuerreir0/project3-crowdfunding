import React, { Component } from 'react';

export default class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: '',
    };
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmission = (event) => {
    event.preventDefault();
    this.props.addResources(this.state.name, this.state.quantity);
    this.setState({
      name: '',
      quantity: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmission}>
        <input
          className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          type='text'
          name='name'
          value={this.state.name}
          placeholder='type here ...'
          onChange={this.handleInputChange}
        />
        <div className='w-full flex row mt-3'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            type='number'
            name='quantity'
            value={this.state.quantity}
            placeholder='insert quantity'
            onChange={this.handleInputChange}
          />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
            Add
          </button>
        </div>
      </form>
    );
  }
}
