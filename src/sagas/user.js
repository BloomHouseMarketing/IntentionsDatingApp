import { take, put, call, fork } from "redux-saga/effects";
import ActionTypes, {
  LOGOUT,
  VERIFY_PASSWORD_OTP,
  PROFILE,
  EDIT_PROFILE,
  CHANGE_PASSWORD
} from "../redux/ActionTypes";
import UserActions, {
  editUserProfileFailure,
  changePasswordFailure,
  changePasswordSuccess,
} from "../redux/actions/UserActions";
import API_URL, {
  LOGOUT_URL,
  VERIFY_PASSWORD_OTP_URL,
  PROFILE_URL,
  EDIT_PROFILE_URL,
  CHANGE_PASSWORD_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";
import * as NavigationService from "../services/NavigationService";
import { DRIVER, RESPONSE_TYPE } from "../constants";
import ProfileActions from "../redux/actions/profile.actions";
import { APP_ROUTES, ROUTES } from "../routes/routes";

function* login() {
  while (true) {
    const { payload } = yield take(ActionTypes.LOGIN.REQUEST);
    try {
      const response = yield call( callRequest, API_URL.LOGIN_URL, payload, "", {}, ApiSauce );
      // console.log('response',response)
      yield put(UserActions.loadingAction())
      if (response.status === RESPONSE_TYPE.success) {
        if(response.data?.user && response?.data?.user?.role === DRIVER) {
          yield put( UserActions.userLoginSuccess(response.data?.user, response.token) );
          yield put( ProfileActions.getDriverProfileRequest() );
        } else if(response?.data?.user && response?.data?.user?.isVerified === false) {
          yield put( UserActions.registerUserSuccess({ ...response, ...response?.data?.user}) );
          NavigationService.navigate(ROUTES.ACCOUNT_VERIFICATION.routeName, {email: payload?.email})
        } else if(response?.data?.user && response?.data?.user?.isProfileCompleted === false) {
          yield put( UserActions.registerUserSuccess({ ...response, ...response?.data?.user}) );
          NavigationService.navigate(ROUTES.COMPLETE_PROFILE.routeName, {isProfileCompleted: false})
        } else if(response?.data?.user && response?.data?.user?.isCustomerLocationAdded === false) {
          yield put( UserActions.registerUserSuccess({ ...response, ...response?.data?.user}) );
          NavigationService.navigate(APP_ROUTES.USER_LOCATIONS.routeName)
        } else {
          yield put( UserActions.userLoginSuccess(response.data?.user, response.token) );
          yield put( ProfileActions.getUserProfileRequest() );
        }
      } else {
        Util.DialogAlert(response.message);
      }
    } catch (err) {
      console.log('err',err)
      yield put(UserActions.loadingAction())
      Util.DialogAlert(err?.error?.message)
    }
  }
}

function* registerUser() {
  while(true) {
    const { payload } = yield take(ActionTypes.REGISTER_USER.REQUEST);
    try {
      const response = yield call( callRequest, API_URL.SIGNUP_URL, payload, "", {}, ApiSauce );
      yield put(UserActions.loadingAction())
      if (response.status === RESPONSE_TYPE.success) {
        yield put( UserActions.registerUserSuccess({ ...response, ...response?.data?.user}) );
        NavigationService.navigate(ROUTES.ACCOUNT_VERIFICATION.routeName)
      } else Util.DialogAlert(response.message)
    } catch (err) {
      console.log('error', err)
      Util.DialogAlert(err?.error?.message)
      yield put(UserActions.loadingAction())
    }
  }
}

function* verifyUser() {
  while(true) {
    try {
      const { payload } = yield take(ActionTypes.VERIFY_USER.REQUEST);
      const response = yield call( callRequest, API_URL.VERIFY_USER_URL, payload, "", {}, ApiSauce );
      console.log('response',response)
      yield put(UserActions.loadingAction())
      if (response.status === RESPONSE_TYPE.success) {
        Util.DialogAlert(response.message, 'Success', 'success')
        NavigationService.navigate(ROUTES.COMPLETE_PROFILE.routeName, {isProfileCompleted: false});
        // yield put( verifyUserSuccess(response.data, isResetingPassword) );
        // !isResetingPassword && NavigationService.navigate(completeProfileRoute);
      } else Util.DialogAlert(response.message)
    } catch (err) {
      yield put(UserActions.loadingAction())
      console.log('err',err)
      Util.DialogAlert(err?.error?.message)
    }
  }
}

function* resendverificationCode() {
  while (true) {
    const { payload } = yield take(ActionTypes.RESEND_VERIFICATION_CODE.REQUEST);
    try {
      const response = yield call( callRequest, API_URL.RESEND_CODE_URL, payload, "", {}, ApiSauce );
      yield put(UserActions.loadingAction())
      if (response.status === RESPONSE_TYPE.success) {
        Util.DialogAlert(response.message, "Success", "success")
      } else Util.DialogAlert(response.message)
    } catch (err) {
      Util.DialogAlert(err?.error?.message)
      yield put(UserActions.loadingAction())
    }
  }
}

function* completeProfile() {
  while (true) {
    const { payload, authToken } = yield take(ActionTypes.COMPLETE_PROFILE.REQUEST);
    try {
      const response = yield call( callRequest, API_URL.COMPLETE_PROFILE_URL, payload, "", {Authorization: authToken}, ApiSauce );
        yield put(UserActions.loadingAction())
        if (response.status === RESPONSE_TYPE.success) {
        Util.DialogAlert(response.message, "Success", "success")
        yield put( UserActions.completeProfileSuccess(response.data?.customer) );
        NavigationService.navigate(APP_ROUTES.USER_LOCATIONS.routeName);
      } else {
        Util.DialogAlert(response.message)
        yield put(UserActions.loadingAction())
      }
    } catch (err) {
      Util.DialogAlert(err?.error?.message)
      yield put(UserActions.loadingAction())
    }
  }
}

function* changePassword() {
  while (true) {
    const { payload } = yield take(CHANGE_PASSWORD.REQUEST);
    try {
      const response = yield call( callRequest, CHANGE_PASSWORD_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        Util.DialogAlert(response.message, "Success", "success")
        yield put( changePasswordSuccess() );
        NavigationService.goBack();
      } else {
        Util.DialogAlert(response.message)
        yield put(changePasswordFailure())
      }
    } catch (err) {
      Util.DialogAlert(err.message)
      yield put(changePasswordFailure())
    }
  }
}

function* verifyPasswordOtp() {
  while (true) {
    const { payload, responseCallback } = yield take(VERIFY_PASSWORD_OTP.REQUEST);
    try {
      const response = yield call( callRequest, VERIFY_PASSWORD_OTP_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        if (responseCallback) responseCallback(response.data, null);
      } else {
        Util.DialogAlert(response.message)
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

function* logout() {
  while (true) {
    const { payload } = yield take(LOGOUT.REQUEST);
    try {
      const response = yield call( callRequest, LOGOUT_URL, payload, "", {Authorization: Util.getCurrentUserAccessToken()}, ApiSauce );
      if (response.status==1) {
        yield put(UserActions.userLogoutSuccess());
      } else {
        Util.DialogAlert(response.message, "Error", 'error')
        yield put(UserActions.userLogoutFailure());
      }
    } catch (err) {
      Util.DialogAlert(err?.error?.message, "Error", 'error')
      yield put(UserActions.userLogoutFailure());
    }
  }
}

function* updateUserProfile() {
  while (true) {
    const { payload, responseCallback } = yield take( EDIT_PROFILE.REQUEST );
    try {
      const response = yield call( callRequest, EDIT_PROFILE_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        if (responseCallback) responseCallback(response.data, null);
        yield put(UserActions.editUserProfileSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(null, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      yield put(editUserProfileFailure(err.data))
      Util.DialogAlert(err.message)
    }
  }
}

function* forgotPassword() {
  while (true) {
    const { payload } = yield take( ActionTypes.FORGOT_PASSWORD.REQUEST );
    try {
      const response = yield call( callRequest, API_URL.FORGOT_PASSWORD_URL, payload, "", {}, ApiSauce );
      yield put(UserActions.loadingAction())
      if (response.status === RESPONSE_TYPE.success) {
        Util.DialogAlert(response.message, "Success", "success");
        NavigationService.navigate(ROUTES.ACCOUNT_VERIFICATION.routeName, {email: payload?.email, resetPassword: true});
      } else Util.DialogAlert(response.message)
    } catch (err) {
      yield put(UserActions.loadingAction())
      Util.DialogAlert(err?.error?.message)
    }
  }
}

function* updatePassword() {
  while (true) {
    const { payload, responseCallback } = yield take( ActionTypes.UPDATE_PASSWORD.REQUEST );
    try {
      const response = yield call( callRequest, API_URL.UPDATE_PASSWORD_URL, payload, "", {}, ApiSauce );
      yield put(UserActions.loadingAction())
      if (response.status === RESPONSE_TYPE.success) {
        Util.DialogAlert(response.message, 'Success', 'success')
        NavigationService.navigate(ROUTES.LOGIN.routeName)
      } else Util.DialogAlert(response.message)
    } catch (err) {
      Util.DialogAlert(err?.error?.message)
    }
  }
}

function* getProfileData() {
  while (true) {
    const { payload, responseCallback } = yield take( PROFILE.REQUEST );
    try {
      const response = yield call( callRequest, PROFILE_URL, payload, "", {}, ApiSauce );
      if (response.status==1) {
        if (responseCallback) responseCallback(response, null);
        yield put(UserActions.userProfileSuccess(response.data));
      } else {
        Util.DialogAlert(response.message)
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      Util.DialogAlert(err.message)
    }
  }
}

export default function* root() {
  yield fork(logout);
  yield fork(login);
  yield fork(registerUser);
  yield fork(verifyUser);
  // yield fork(updateUserProfile);
  yield fork(forgotPassword);
  yield fork(updatePassword);
  // yield fork(verifyPasswordOtp);
  // yield fork(getProfileData);
  yield fork(resendverificationCode);
  yield fork(completeProfile);
  // yield fork(changePassword);
}
