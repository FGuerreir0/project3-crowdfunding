import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { logout } from './../../services/authentication';

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
  console.log(props.user);
  return (
    <nav className='navbar'>
      <Link to='/'>
        <div className='logo'>
          <img src='#' alt='Logo' />
        </div>
      </Link>

      {(props.user && (
        <>
          <Link to={`/user/${props.user._id}`}>
            <img src={props.user.pictureUrl} alt={props.user.username} />
            <span> {props.user.username}</span>
            <button onClick={signOutAndLiftUserState}>Logout</button>
          </Link>
        </>
      )) || (
        <>
          <Link to='/authentication/login' className='link-no-login'>
            Login
          </Link>
          <Link to='/authentication/register' className='link-no-login'>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
