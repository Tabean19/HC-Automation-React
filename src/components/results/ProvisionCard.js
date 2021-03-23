import React, { Fragment, useState, useContext } from 'react';
import AppContext from '../../context/appContext';

export const ProvisionCard = ({ app }) => {
  const appContext = useContext(AppContext);
  const { postChange, getApps } = appContext;

  const [isActive, setActive] = useState(app.is_running);

  const handleToggle = (app) => {
    const newState = !app.is_running;
    const data = {
      name: app.name,
      is_running: newState,
    };
    postChange(data).then((res) => console.log(res));
    setActive(!isActive);
    getApps();
  };

  return (
    <Fragment>
      <li>{app.name}</li>{' '}
      {isActive ? (
        <i
          className='fas fa-toggle-on fa-3x'
          onClick={() => handleToggle(app)}
        ></i>
      ) : (
        <i
          className='fas fa-toggle-off fa-3x'
          onClick={() => handleToggle(app)}
        ></i>
      )}
    </Fragment>
  );
};

export default ProvisionCard;
