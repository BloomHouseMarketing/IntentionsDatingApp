import {LOADER, ERRMSG, SEARCHEDREST} from '../../constants';

const INITIAL_STATE = {
  loader: false,
  errMsg: '',
  searchedRest: [],
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADER:
      return {
        ...states,
        loader: action.payload,
      };
    case ERRMSG:
      return {
        ...states,
        errMsg: action.payload,
      };
    case SEARCHEDREST:
      return {
        ...states,
        searchedRest: action.payload,
      };

    default:
      return states;
  }
};
