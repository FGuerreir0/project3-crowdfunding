import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { logout } from './../../services/authentication';
import SearchBar from './../SearchBar';

const NavBar = (props) => {
  const signOutAndLiftUserState = () => {
    logout()
      .then(() => {
        props.updateUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className='navbar'>
      <Link to='/'>
        <div className='logoImage ml-2 pt-1'>
          <img src={process.env.PUBLIC_URL + '/images/navbar.png'} alt='Logo' />
        </div>
      </Link>

      {(props.user && (
        <>
          <div className='SearchBarPosition'>
            <SearchBar />
          </div>
          <div className='md:mr-0 md:ml-16 sm:ml-0'>
            <Link to={`/user/${props.user._id}`}>
              <img
                className='profileImage '
                src={props.user.pictureUrl}
                alt={props.user.username}
              />
            </Link>
          </div>
          <div>
            <Link to={`/user/${props.user._id}`}>
              <span className='sm:text-lg text-base'> {props.user.username}</span>
            </Link>
          </div>
          <div className='ml-4 mr-5 sm:text-lg Logout_Button '>
            <Link to={'/'}>
              <button onClick={signOutAndLiftUserState}>Logout</button>
            </Link>
          </div>
        </>
      )) || (
        <>
          <div className='ml-16 mr-5 sm:text-lg '>
            <Link to='/authentication/login' className='link-no-login'>
              Login
            </Link>
          </div>
          <div className='ml-4 mr-5 sm:text-lg text-xs '>
            <Link to='/authentication/register' className='link-no-login'>
              Register
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
