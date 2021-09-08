import React, { useState, useRef, useContext} from 'react';
import { Link } from 'react-router-dom';
import AppContext from "../../context/appContext";

export const Navbar = () => {
  const appContext = useContext(AppContext);
  const { searchApps } = appContext;

  const [isActive, setActive] = useState('Monitoring');

  const text = useRef('');

  const handleToggle = (name) => {
    setActive(name);
  };


  const onSubmit = (event) => {
    event.preventDefault();
   searchApps(text.current.value);
  };

  return (
    <div className='navbar'>
      <div className='navbar-top'>
      <div className='nav-title'>
        <h1>NOC Healthcheck Dashboard</h1>
      </div>
      </div>
      <div className='navbar-bottom'>
      <div className='nav-links'>
        <ul>
          <li className={isActive === "Monitoring" ? 'active' : null} onClick={() => handleToggle("Monitoring")}>
            <Link to='/'>Monitoring</Link>
          </li>
          <li className={isActive === "Provisioning" ? 'active' : null} onClick={() => handleToggle("Provisioning")}>
            <Link to='/provisioning'>Provisioning</Link>
          </li>
          <li className={isActive === "Scripts" ? 'active' : null} onClick={() => handleToggle("Scripts")}>
            <Link to='/scripts'>Scripts</Link>
          </li>
          <li className={isActive === "Survey" ? 'active' : null} onClick={() => handleToggle("Survey")}>
            <Link to='/survey'>Survey</Link>
          </li>
        </ul>
      </div>
      <div className='nav-search'>
        <form id='form' onSubmit={onSubmit}>
          <input
            type='text'
            id='search'
            placeholder='Search by application string...'
            ref={text}
          />
          <input className="button" type="submit" value="Search" />
        </form>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
