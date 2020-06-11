import React, { Component } from 'react';

class Fact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      fact: [
        '"About 260 million children were still out of school in 2018 — nearly one fifth of the global population in that age group"',
        '"Food waste in Europe alone could feed 200 million hungry people"',
        '"More than 700 million people, or 10 per cent of the world population, still live in extreme poverty today, struggling to fulfil the most basic needs like health, education, and access to water and sanitation"',
        '"Today, more than 820 million people regularly go to bed hungry, of whom about 135 million suffer from acute hunger largely due to man-made conflicts, climate change and economic downturns"',
        '"Worldwide, one in three people do not have access to safe drinking water, two out of five people do not have a basic hand-washing facility"',
        '"There is a continuous deterioration of coastal waters owing to pollution, and ocean acidification is having an adversarial effect on the functioning of ecosystems and biodiversity."'
      ]
    };
  }

  render() {
    const { count } = this.state;
    return (
      <div className='mr-20 ml-20'>
        <p className='text-gray-700 italic text-sm'>{this.state.fact[count]}</p>
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
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
}

export default Fact;
