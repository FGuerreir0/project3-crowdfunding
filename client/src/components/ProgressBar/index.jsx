import React, { Component } from 'react';

import percentageCalculator from './../../helper/percentageCalculator';

export class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: percentageCalculator(backed, total)
    };
  }
  render() {
    return (
      <div>
        <h3>Progress</h3>
        <ProgressBar percentage={this.state.percentage} />
      </div>
    );
  }
}


export default ProgressBar;
