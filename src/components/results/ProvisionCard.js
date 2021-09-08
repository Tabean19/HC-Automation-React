import React, { useState, useContext} from "react";
import { Link } from 'react-router-dom';
import AppContext from '../../context/appContext';
import Spinner from "../../components/layout/spinner";

export const ProvisionCard = ({ app }) => {
  const appContext = useContext(AppContext);
  const { setActiveApp } = appContext;


  //component state management
  const [isLoading, setLoading] = useState(false);
  const [isOn, setOn] = useState(app.is_running);
  const [isBtnActive, setBtnActive] = useState(!app.currently_running);

  
   //changes whether app is on or not
   const toggleApp = async () => {
    setLoading(true);
    const data = JSON.stringify({
      name: app.name,
      is_running: !app.is_running
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };
    const res = await fetch("https://bvrtormon001.uspsprod.usps.gov:1337/api/appsrunning", options).then(() => {
      setOn(!isOn);
      setLoading(false);
    });
    
  };

  //runs the app check
  const runApp = async () => {
      setBtnActive(false);
    const data = JSON.stringify({
      name: app.name,
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    };
    const res = await fetch("https://bvrtormon001.uspsprod.usps.gov:1337/api/apprun", options).then(() => {
      setBtnActive(true);
    });
    
  };

  if (isLoading) {
    return <div className="provision-item">
      <li>{app.name}</li>{" "}
      <div className="loading-spinner">
        <Spinner />
      </div>
    </div>
  } else {
    return (
      <div className="provision-item">
        <li>{app.name}</li>{" "}
        <div className="prov-btn-container">
        {isOn ? (
          <div className="prov-btn on" onClick={() => toggleApp()}><i className="fas fa-power-off"></i>Turn off</div>
        ) : (
          <div className="prov-btn off" onClick={() => toggleApp()}><i className="fas fa-power-off"></i>Turn on</div>
          )}
        {isBtnActive ? (
          <div className="prov-btn stop" onClick={() => runApp()}><i className="fas fa-play"></i>Run App</div>
        ) : (
          <div className="prov-btn run" ><i className="fas fa-play"></i><div className="play-loader-prov">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
      </div></div>
          )}
          <Link to={`/config/${app.id}`}>
          <div className="prov-btn edit" onClick={() => setActiveApp(app)} ><i className="fas fa-edit"></i>Edit</div>
          </Link>
          </div>
      </div>
    );
  }
};

export default ProvisionCard;
