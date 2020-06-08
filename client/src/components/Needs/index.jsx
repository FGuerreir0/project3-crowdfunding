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

  // submitHandle = (event) => {
  //   event.preventDefault();
  //   console.log('zerou');
  //   this.setState({
  //     name: '',
  //     quantity: 0,
  //   });
  // };

  // passHandle = (name, value) => {
  //   console.log(name, value);
  //   this.setState({
  //     name,
  //     quantity: value,
  //   });
  // };

  render() {
    return <InputComponent {...this.props} />;
  }
}
