import React, { useReducer } from 'react';
import AppContext from './appContext';
import AppReducer from './appReducer';
import { SET_ACTIVE, SET_LOADING, GET_APPS, CLEAR_ACTIVE } from '../types';

const AppState = (props) => {
  const initialState = {
    results: null,
    active_application: {},
    isLoading: true,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  //get apps -- test
  const getApps = () => {
    setLoading();
    const res = require('../data.json');
    dispatch({ type: GET_APPS, payload: res });
  };
  // //get apps -- prod
  // const getApps = async () => {
  //   setLoading();
  //   const options = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   };
  //   const res = await fetch('api/getApps', options);
  //   const data = await res.json();
  //   dispatch({ type: GET_APPS, payload: data });
  // };
  //set active application
  const setActiveApp = (app) => {
    dispatch({ type: SET_ACTIVE, payload: app });
  };
  //post changes in running to API
  const postChange = async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const res = await fetch('api/appsrunning', options);
    return res.json();
  };
  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  //Clear Active Application
  const clearActiveApp = () => dispatch({ type: CLEAR_ACTIVE });
  //Return
  return (
    <AppContext.Provider
      value={{
        results: state.results,
        active_application: state.active_application,
        isLoading: state.isLoading,
        getApps,
        setActiveApp,
        clearActiveApp,
        postChange,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
