import React, { Component } from 'react';

class Fact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fact: ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c']
    };
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <p>{this.state.fact[count]}</p>
      </div>
    );
  }
  // setInterval
  // clearInterval
  componentDidMount() {
    let factLength = this.state.fact.length;

    this.myInterval = setInterval(() => {
      let newcount = Math.floor(Math.random() * factLength);

      this.setState({
        count: newcount
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
}

export default Fact;
