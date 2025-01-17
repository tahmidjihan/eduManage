import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../Routes/AuthProvider';

function Navbar() {
  const { user, logout } = useAuth();
  function UserActions() {
    return (
      <>
        <li className='dropdown dropdown-end'>
          <button className='avatar btn'>
            <div className='mask mask-squircle w-12 h-12'>
              <img src={user?.photoURL} />
            </div>
          </button>
          <ul className='menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
            <li>
              <button className='btn btn-error' onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </li>
      </>
    );
  }
  function Menu() {
    return (
      <>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/classes'>Classes</Link>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </>
    );
  }
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
            <Menu />
          </ul>
        </div>
        <a className='btn btn-ghost text-xl font-bold'>EduManage </a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <Menu />
        </ul>
      </div>
      <div className='navbar-end'>
        {user ? (
          <UserActions />
        ) : (
          <>
            <Link to='/login' className='btn btn-primary mr-2'>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
