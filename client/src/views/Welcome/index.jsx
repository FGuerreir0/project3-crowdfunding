import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

export default class WelcomeView extends Component {
  render(props) {
    return (
      <div className='welcome-container text-center'>
        <div className='text-center mt-10 mb-10'>
          <img
            src={process.env.PUBLIC_URL + '/images/navbar.png'}
            alt='Logo'
            className='object-contain h-48 w-full ... '
          />
        </div>
        <div
          className='md:flex md:justify-around md:text-center md:mt-20 md:border-2 md:max-w-screen-lg '
          style={{ margin: '0 auto', padding: '0' }}
        >
          <div>
            <img
              src={process.env.PUBLIC_URL + '/images/welcome.png'}
              alt='Logo'
              className='sm:h-auto sm:w-20px md:h-auto md:w-40px '
            />
          </div>
          <div className='px-4 py-4 m-14 flex content-center flex-wrap'>
            <div style={{ margin: '0 auto' }}>
              <h3 className='text-3xl'>Welcome {this.props.user.username}!</h3>
              <br></br>
            </div>
            <p className='text-xl mr-16 ml-16'>
              By registering you just became part of the flow of people help or getting help with
              various humanitarian causes.
            </p>
            <div style={{ margin: '0 auto' }}>
              <div className='anchor-style'>
                <Link to='/'>→</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
