import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/appContext';

export const ResultCard = ({ app }) => {
  const appContext = useContext(AppContext);
  const { setActiveApp } = appContext;
  
    const diff = Math.floor((new Date() - new Date(app.posted_time)) / 60000);
    const hours = Math.floor(diff / 60);  
    const minutes = diff % 60;

 

  if (!app.is_running) {
    return (
      <Link to={`/application/${app.id}`}>
        <li className='result off' onClick={() => setActiveApp(app)}>
          <i className='fas fa-power-off fa-2x'></i>
          <div>{app.name}
          <p>{hours ? `${hours} hours and ${minutes} minutes ago` : `${minutes} minutes ago`}</p>
          </div>
          
        </li>
      </Link>
    );
  } else {
    return app.result === 'Fail' ? (
      <Link to={`/application/${app.id}`}>
        <li className={`result ${app.result}`} onClick={() => setActiveApp(app)}>
          <i className='fas fa-times fa-2x'></i>
          <div>{app.name}
          <p>{hours ? `${hours} hours and ${minutes} minutes ago` : `${minutes} minutes ago`}</p>
          </div>
        </li>
      </Link>
    ) : (
      <Link to={`/application/${app.id}`}>
        <li className={`result ${app.result}`} onClick={() => setActiveApp(app)}>
          <i className='fas fa-check fa-2x'></i>
          <div>{app.name}
          <p>{hours ? `${hours} hours and ${minutes} minutes ago` : `${minutes} minutes ago`}</p>
          </div>
        </li>
      </Link>
    );
  }
};

export default ResultCard;
