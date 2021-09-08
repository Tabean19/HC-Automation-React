import { SET_ACTIVE, SET_LOADING, GET_APPS, CLEAR_ACTIVE, CLEAR_HIST, GET_SURVEY, SEARCH_APPS, GET_CONFIGS, GET_HIST } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_APPS:
      return {
        ...state,
        results: action.payload,
        isLoading: false,
      };
    case GET_HIST:
      return {
        ...state,
        history: action.payload,
      };
    case SEARCH_APPS:
      return {
        ...state,
        results: action.payload,
        isLoading: false,
      };
    case GET_SURVEY:
      return {
        ...state,
        surveys: action.payload,
        isLoading: false,
      };
    case GET_CONFIGS:
      return {
        ...state,
        configs: action.payload,
        isLoading: false,
      };
    case SET_ACTIVE:
      return {
        ...state,
        active_application: action.payload,
      };
    case CLEAR_ACTIVE:
      return {
        ...state,
        active_application: {},
      };
    case CLEAR_HIST:
      return {
        ...state,
        history: null,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
