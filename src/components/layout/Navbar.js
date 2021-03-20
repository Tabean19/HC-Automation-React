import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isActive, setActive] = useState(true);

  const handleToggle = (param) => {
    if (!isActive == param) {
      setActive(param);
    }
  };

  return (
    <div className='navbar'>
      <div className='nav-links'>
        <ul>
          {isActive ? (
            <Fragment>
              <li className='active' onClick={() => handleToggle(true)}>
                <Link to='/'>Monitoring</Link>
              </li>
              <li onClick={() => handleToggle(false)}>
                <Link to='/provisioning'>Provisioning</Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li onClick={() => handleToggle(true)}>
                <Link to='/'>Monitoring</Link>
              </li>
              <li className='active' onClick={() => handleToggle(false)}>
                <Link to='/provisioning'>Provisioning</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
      <div className='nav-title'>
        <h1>NOC Healthcheck Dashboard</h1>
      </div>
      <div className='nav-search'>
        <form id='form'>
          <input
            type='text'
            id='search'
            placeholder='Search by application string...'
          />
          <button>Search</button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
