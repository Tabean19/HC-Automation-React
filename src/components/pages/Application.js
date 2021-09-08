import React, { useContext, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/appContext";

export const Application = ({ match }) => {
  const [showHist, setShowHist] = useState(false);
  const appContext = useContext(AppContext);
  const { active_application, clearActiveApp, getHistorical, history, clearHistory } = appContext;

  const {
    browser_image,
    desc,
    id,
    is_running,
    link,
    name,
    posted_time,
    result,
    steps
  } = active_application;
  //const formattedDate = new Date(posted_time);
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  }
  

  useEffect(() => {
     //get historical data for application checks
     clearHistory();
     const uriEncodedName = name.split(' ').join('+');
     getHistorical(uriEncodedName);
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container">
      <div>
        <Link to="/">
          <div className="btn" onClick={clearActiveApp}>
            <i className="fas fa-arrow-left"></i> Back
          </div>
        </Link>
      </div>
      <div className="application-container">
        {browser_image ? (
          <div className="image-container">
            <a href={browser_image} target="_blank">
              <img
                src={browser_image}
                alt={name}
                className="app-img"
              />
            </a>
          </div>
        ) : (
            <div className="image-container">
              <i className="far fa-image app-img fa-9x"></i>
              <p>Image not available...</p>
            </div>
          )}
        <div className="description-container">
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
                  <strong>Running:</strong> {"Yes"}
                </Fragment>
              ) : (
                  <Fragment>
                    <strong>Running:</strong> {"No"}
                  </Fragment>
                )}
            </li>
          </ul>
        </div>
        <div className="steps-container">
          <ul>
            <li>
              {steps && (
                <Fragment>
                  <strong>Steps:</strong>
                  <table className="step-container">
                    {
                      /* Need New way of displaying step Data*/
                      //comments in JS look like this, your comment is for CSS lololol how embarrasing.
                      /* But both work poopoo head */

                    }
                    <tr className="step-header">
                      <td>#</td>
                      <td>Step Name</td>
                      <td>Step Description</td>
                      <td>Step Result</td>
                      <td>Result Description</td>
                      <td>Is Running</td>
                    </tr>
                    {/*Changed step_is_running to be Casted to a string so it would be outputted to the page correctly */}
                    {steps.map((step, i) => {
                      return <tr className="step-item" key={i}>
                        <td>{step.step_num}</td>
                        <td>{step.step_name}</td>
                        <td>{step.step_description}</td>
                        <td>{step.step_result}</td>
                        <td>{step.step_result_description}</td>
                        <td>{String(step.step_is_running)}</td>
                      </tr>
                    })}
                  </table>
                </Fragment>
              )}
            </li>
            <li>
              {link && (
                <Fragment>
                  <strong>Link:</strong> <a href={link} target="_blank">{link}</a>
                </Fragment>
              )}
            </li>
            <li>
              {posted_time && (
                <Fragment>
                  <strong>Last Checked:</strong> {formatDate(posted_time)}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="history-header"><h1>History</h1></div>
      {showHist ? (<div className="history-container"><h2>Collapse <i className="fas fa-caret-up" onClick={() => setShowHist(false)}></i></h2><div className='history-body'>
      {history ? history.map(record => <div className='history-item-container'><div>{formatDate(record.posted_time)}:</div> <div className={record.result}>{record.result}</div></div>) : null }
      </div></div>) : (<div className="history-container"><h2>Expand <i className="fas fa-caret-down" onClick={() => setShowHist(true)}></i></h2></div>)}
    </div>
  );
};

export default Application;
