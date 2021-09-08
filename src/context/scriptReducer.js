import { SET_ACTIVE, SET_LOADING, GET_SCRIPTS, CLEAR_ACTIVE } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_SCRIPTS:
      return {
        ...state,
        results: action.payload,
        isLoading: false,
      };
    case SET_ACTIVE:
      return {
        ...state,
        active_script: action.payload,
      };
    case CLEAR_ACTIVE:
      return {
        ...state,
        active_script: {},
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