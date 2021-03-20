import {
  SET_ACTIVE,
  SET_LOADING,
  GET_APPS,
  CLEAR_ACTIVE,
  TOGGLE_APP,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_APPS:
      return {
        ...state,
        results: action.payload,
        isLoading: false,
      };
    case SET_ACTIVE:
      return {
        ...state,
        active_application: action.payload,
      };
    // case TOGGLE_APP:
    //   return {
    //     ...state,
    //     results:
    //   };
    case CLEAR_ACTIVE:
      return {
        ...state,
        active_application: {},
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
