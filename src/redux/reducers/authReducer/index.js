import {
  CURRENTUSERPROFILE,
  ISUSERLOGIN,
  USERLOGINDATA,
  USERLOGOUT,
} from '../../constants';

const INITIAL_STATE = {
  isUserLogin: false,
  user: null,
  currentUserProfile: {},
};

export default (states = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENTUSERPROFILE:
      return {
        ...states,
        currentUserProfile: action.payload,
      };
    case ISUSERLOGIN:
      return {
        ...states,
        isUserLogin: action.payload,
      };
    case USERLOGINDATA:
      console.log('action', action);
      return {
        ...states,
        user: action.payload,
        isUserLogin: true,
      };
    case USERLOGOUT:
      return {
        ...states,
        user: null,
        isUserLogin: false,
        currentUserProfile: {},
      };
    default:
      return states;
  }
};
