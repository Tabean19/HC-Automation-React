import React, { useReducer } from "react";
import AppContext from "./appContext";
import AppReducer from "./appReducer";
import { SET_ACTIVE, SET_LOADING, GET_APPS, CLEAR_ACTIVE, CLEAR_HIST, GET_SURVEY, SEARCH_APPS, GET_CONFIGS, GET_HIST } from "../types";

const AppState = (props) => {
  const initialState = {
    results: null,
    history: null,
    surveys: null,
    configs: null,
    active_application: {},
    isLoading: true,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  //trim records
  const trimHistory = (array) => {
    while (array.length > 100) {
      array.pop();
    }
  }

  //get apps -- prod
  const getApps = async () => {
    setLoading();
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch("https://bvrtormon001.uspsprod.usps.gov:1337/api/getapps", options);
    const data = await res.json();
    dispatch({ type: GET_APPS, payload: data });
  };

  //get historical data
  const getHistorical = async (name) => {

    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(`https://bvrtormon001.uspsprod.usps.gov:1337/api/historical/apps?name=${name}`, options);
    const data = await res.json();
    //sort by date
    data.sort((a,b) => (new Date(b.posted_time) - new Date(a.posted_time)));
    //trim data to 100 records
    trimHistory(data);
    dispatch({ type: GET_HIST, payload: data });
  };

  //set active application
  const setActiveApp = (app) => {

    dispatch({ type: SET_ACTIVE, payload: app });
  };

  //get survey data 
  const getSurveys = async () => {

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch("https://bvrtormon001.uspsprod.usps.gov:1337/api/survey", options);
    const data = await res.json();

    dispatch({ type: GET_SURVEY, payload: data });
  };

  //get configuration data for apps
  const getConfigs = async () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch('https://bvrtormon001.uspsprod.usps.gov:1337/api/configuration/retrieve', options);
    const data = await res.json();
    dispatch({ type: GET_CONFIGS, payload: data });
  }

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  //Clear Active Application
  const clearActiveApp = () => dispatch({ type: CLEAR_ACTIVE });

  //Clear History
  const clearHistory = () => dispatch({ type: CLEAR_HIST });

  //Search applications
  const searchApps = async (formData) => {
    setLoading();
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const res = await fetch(`https://bvrtormon001.uspsprod.usps.gov:1337/api/filterapps?name__contains=${formData}`, options);
    const data = await res.json();
    dispatch({ type: SEARCH_APPS, payload: data });
  }


  //Return
  return (
    <AppContext.Provider
      value={{
        results: state.results,
        history: state.history,
        surveys: state.surveys,
        configs: state.configs,
        active_application: state.active_application,
        isLoading: state.isLoading,
        getApps,
        getHistorical,
        getSurveys,
        getConfigs,
        setActiveApp,
        clearActiveApp,
        clearHistory,
        searchApps,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
