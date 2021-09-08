import React, { useContext } from "react";
import ProvisionCard from "./ProvisionCard";
import Spinner from "../layout/spinner";
import AppContext from "../../context/appContext";

const ProvisionItem = ({ env, site }) => {
  const appContext = useContext(AppContext);
  const { results } = appContext;

  if (!results) {
    return (
      <div className="ecc-bvt-container">
        <h3>{site}</h3>
        <div className="results-container loading">
          <ul className="results">
            <Spinner />
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ecc-bvt-container">
        <h3>{site}</h3>
        <div className="provisioning-container">
          <ul className="provisioning">
            {results[env][site].map((app) => (
              <ProvisionCard app={app} key={app.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default ProvisionItem;
