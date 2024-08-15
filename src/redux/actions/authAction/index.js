import {USERLOGINDATA, USERLOGOUT} from '../../constants';

export function loginUser(payload) {
  return {
    type: USERLOGINDATA,
    payload,
  };
}
export function logoutUser() {
  return {
    type: USERLOGOUT,
  };
}
