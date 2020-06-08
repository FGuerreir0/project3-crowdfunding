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

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.pass(this.state.name, this.state.quantity);
    }
  }

  render() {
    return (
      <div>
        <input
          type='text'
          name='name'
          value={this.props.name}
          placeholder={this.props.name}
          onChange={this.handleInputChange}
        />
        <label>Qtd: </label>
        <input type='number' name='quantity' value={this.props.quantity} onChange={this.handleInputChange} />
      </div>
    );
  }
}
