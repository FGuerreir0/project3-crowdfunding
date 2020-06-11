import React, { Component } from 'react';
import percentageCalc from './../../helper/percentageCalculator';

export class ProgressBar extends Component {
  render(props) {
    return (
      <div>
        <div className='relative pt-1 mr-16 ml-16'>
          <div className='overflow-hidden h-6 mb-4 text-xs flex rounded bg-indigo-200'>
            <div
              style={{
                width: `${percentageCalc(
                  this.props.project.needs.money.backed,
                  this.props.project.needs.money.total
                )}%`,
              }}
              className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500'
            >
              <div className='flex mb-3 items-center justify-between align-center'>
                <div>
                  <span className='text-small font-semibold inline-block text-white-600 mt-3 ml-3'></span>
                </div>
                <div className='text-right'>
                  <span className='text-small font-semibold inline-block text-white-600 mt-3 mr-3'>
                    {percentageCalc(this.props.project.needs.money.backed, this.props.project.needs.money.total)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
