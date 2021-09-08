import React, { useContext } from "react";
import ScriptResultCard from "./ScriptResultCard";
import Spinner from "../layout/spinner";
import ScriptContext from "../../context/scriptContext";

const ScriptResultItem = () => {
  const scriptContext = useContext(ScriptContext);
  const { results } = scriptContext;

  if (!results) {
    return (
        <div className="scripts-container loading">
          <ul className="scripts">
            <Spinner />
          </ul>
        </div>
    );
  } else {
    return (
        <div className="scripts-container">
          <ul className="scripts">
            {results.map((script) => (
              <ScriptResultCard script={script} key={script.script_name} />
            ))}
          </ul>
        </div>
    );
  }
};

export default ScriptResultItem;
