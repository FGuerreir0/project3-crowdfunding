import React, { Component } from 'react';

export default class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: 0,
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
      quantity: 0,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmission}>
        <input
          type='text'
          name='name'
          value={this.state.name}
          placeholder='type here ...'
          onChange={this.handleInputChange}
        />
        <label>Qtd: </label>
        <input type='number' name='quantity' value={this.state.quantity} onChange={this.handleInputChange} />
        <button>Add</button>
      </form>
    );
  }
}
