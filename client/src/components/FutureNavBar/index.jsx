import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { logout } from '../../services/authentication';

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
    <div className='border-b md:flex md:items-center md:justify-between p-4 pb-0 bg-blue-200 shadow-lg md:pb-4'>
      <div className='flex items-center justify-between mb-4 md:mb-0'>
        <Link to='/'>
          <div className='logoImage'>
            <img src={process.env.PUBLIC_URL + '/images/navbar.png'} alt='Logo' />
          </div>
        </Link>
      </div>

      <form className=' mb-4 w-full md:mb-0 md:w-1/2'>
        <label className='hidden' htmlFor='search-form'>
          Search
        </label>
        <input
          className='bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full'
          placeholder='Search'
          type='text'
        />
        <button className='hidden'>Submit</button>
      </form>

      <nav>
        {(props.user && (
          <ul className='list-reset md:flex md:items-center'>
            <li className='md:ml-2'>
              <div className='flex flex-row'>
                <Link to={`/user/${props.user._id}`}>
                  <img
                    className='profileImage'
                    src={props.user.pictureUrl}
                    alt={props.user.username}
                  />
                </Link>
                <div className='md:mt-1 md:ml-2'>
                  <Link to={`/user/${props.user._id}`}>
                    <p className='cursor-pointer'> {props.user.username}</p>
                  </Link>
                </div>
              </div>
            </li>
            <li className='md:ml-4'>
              <Link to={'/'}>
                <button onClick={signOutAndLiftUserState}>Logout</button>
              </Link>
            </li>
          </ul>
        )) || (
          <ul className='list-reset md:flex md:items-center'>
            <li className='md:ml-4'>
              <Link to='/authentication/login' className='link-no-login'>
                Login
              </Link>
            </li>
            <li className='md:ml-4'>
              <Link to='/authentication/register' className='link-no-login'>
                Register
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
