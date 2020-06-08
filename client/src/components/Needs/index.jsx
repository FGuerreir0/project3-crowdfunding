import React, { Component } from 'react';
import InputComponent from '../Input';

export default class needs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'teste',
      quantity: 0,
    };
  }

  submitHandle = (event) => {
    event.preventDefault();
    console.log('zerou');
    this.setState({
      name: '',
      quantity: 0,
    });
  };

  passHandle = (name, value) => {
    console.log(name, value);
    this.setState({
      name,
      quantity: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    //console.log('this state: ', this.state);
  }

  render() {
    return (
      <form onSubmit={this.submitHandle}>
        <InputComponent pass={this.passHandle} />;
        <button onClick={() => this.props.addResources(this.state.name, this.state.quantity)}>Add</button>
      </form>
    );
  }
}
