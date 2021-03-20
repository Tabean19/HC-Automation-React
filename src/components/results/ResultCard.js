import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/appContext';

export const ResultCard = ({ app }) => {
  const appContext = useContext(AppContext);
  const { setActiveApp } = appContext;

  if (!app.is_running) {
    return (
      <Link to={`/application/${app.id}`}>
        <li className='result off' onClick={() => setActiveApp(app)}>
          <i className='fas fa-power-off fa-4x'></i>
          {app.name}
        </li>
      </Link>
    );
  } else {
    return app.result === 'Pass' ? (
      <Link to={`/application/${app.id}`}>
        <li className='result success' onClick={() => setActiveApp(app)}>
          <i className='fas fa-check fa-4x'></i>
          {app.name}
        </li>
      </Link>
    ) : (
      <Link to={`/application/${app.id}`}>
        <li className='result fail' onClick={() => setActiveApp(app)}>
          <i className='fas fa-times fa-4x'></i>
          {app.name}
        </li>
      </Link>
    );
  }
};

export default ResultCard;
