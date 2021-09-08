import React, { useReducer } from "react";
import ScriptContext from "./scriptContext";
import ScriptReducer from "./scriptReducer";
import { SET_ACTIVE, SET_LOADING, GET_SCRIPTS, CLEAR_ACTIVE } from "../types";

const ScriptState = (props) => {
  const initialState = {
    results: null,
    active_script: {},
    isLoading: true,
  };

  const [state, dispatch] = useReducer(ScriptReducer, initialState);

  //get scripts -- prod
  const getScripts = async () => {
    setLoading();
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch("https://bvrtormon001.uspsprod.usps.gov:1337/api/scripts/retrieve/", options);
    const data = await res.json();
    dispatch({ type: GET_SCRIPTS, payload: data });
  };

  //run script
  const runScript = async (script) => {
    updateScriptStatus(script, 'true');
    const JSONobj = JSON.stringify({ script_name: script.script_name });

    const options = {
      method: "POST",
      body: JSONobj,
      headers: { "Content-Type": "application/json" },
    };

    console.log('Running script...');
    const res = await fetch("https://bvrtormon001.uspsprod.usps.gov:1337/api/scripts/run", options).then(() => updateScriptStatus(script, 'false'));
  };

  //update script status on backend while its running/stopped
  const updateScriptStatus = async (script, status) => {
    const JSONobj = JSON.stringify({
      script_name: script.script_name, 
      currently_running: status,
    });

    const options = {
      method: "PATCH",
      body: JSONobj,
      headers: { "Content-Type": "application/json" },
    }
    console.log(`Updating application status to ${status}...`);
    const res = await fetch("https://bvrtormon001.uspsprod.usps.gov:1337/api/scripts/update/status", options);


  }

  //set active script
  const setActiveScript = (script) => {
    dispatch({ type: SET_ACTIVE, payload: script });
  };
  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  //Clear Active Script
  const clearActiveScript = () => dispatch({ type: CLEAR_ACTIVE });
  //Return
  return (
    <ScriptContext.Provider
      value={{
        results: state.results,
        active_script: state.active_script,
        isLoading: state.isLoading,
        getScripts,
        setActiveScript,
        clearActiveScript,
        runScript,
      }}
    >
      {props.children}
    </ScriptContext.Provider>
  );
};

export default ScriptState;
