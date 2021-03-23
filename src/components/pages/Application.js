import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/appContext';

export const Application = ({ match }) => {
  const appContext = useContext(AppContext);
  const { active_application, clearActiveApp } = appContext;

  const {
    browser_image,
    desc,
    id,
    is_running,
    link,
    name,
    posted_time,
    result,
  } = active_application;

  return (
    <div className='container'>
      <div>
        <Link to='/'>
          <btn className='btn' onClick={clearActiveApp}>
            <i className='fas fa-arrow-left'></i> Back
          </btn>
        </Link>
      </div>
      <div className='application-container'>
        {browser_image ? (
          <div className='image-container'>
            <img
              src={`${process.env.REACT_APP_API_IMAGE_URI}${browser_image}`}
              alt={name}
              className='app-img'
            />
          </div>
        ) : (
          <div className='image-container'>
            <i className='far fa-image app-img fa-9x'></i>
            <p>Image not available...</p>
          </div>
        )}
        <div className='description-container'>
          <h1>{name}</h1>
          <ul>
            <li>
              {result && (
                <Fragment>
                  <strong>Result:</strong> {result}
                </Fragment>
              )}
            </li>
            <li>
              {desc && (
                <Fragment>
                  <strong>Description:</strong> {desc}
                </Fragment>
              )}
            </li>
            <li>
              {is_running ? (
                <Fragment>
                  <strong>Running:</strong> {'Yes'}
                </Fragment>
              ) : (
                <Fragment>
                  <strong>Running:</strong> {'No'}
                </Fragment>
              )}
            </li>
            <li>
              {link && (
                <Fragment>
                  <strong>Link:</strong> {link}
                </Fragment>
              )}
            </li>
            <li>
              {posted_time && (
                <Fragment>
                  <strong>Last Checked:</strong> {posted_time}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Application;
