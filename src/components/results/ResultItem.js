import React, { useContext } from "react";
import ResultCard from "./ResultCard";
import Spinner from "../layout/spinner";
import AppContext from "../../context/appContext";

const ResultItem = ({ env, site }) => {
  const appContext = useContext(AppContext);
  const { results, isLoading } = appContext;

  if (!results) {
    return (
      <div className={`${env}-${site}-container`}>
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
      <div className={`${env}-${site}-container`}>
        <h3>{site}</h3>
        <div className="results-container">
          <ul className="results">
            {results[env][site].map((app) => (
              <ResultCard app={app} key={app.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default ResultItem;
