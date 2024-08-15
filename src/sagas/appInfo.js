import { take, put, call, fork } from "redux-saga/effects";
import ActionTypes, {
//   PRIVACY_POLICY,
} from "../redux/ActionTypes";
import { RESPONSE_TYPE, SAGA_ALERT_TIMEOUT } from "../constants";
import appInfoActions, {
//   termsSuccess,
//   aboutSuccess,
//   privacySuccess,
//   loadingAction
} from "../redux/actions/appInfo.actions";
import API_URL, {
//   PRIVACY_POLICY as PRIVACY_POLICY_URL,
//   TERMS_AND_CONDITION as TERMS_AND_CONDITION_URL,
  callRequest
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import Util from "../util";
import {goBack} from "../services/NavigationService";

// function alert(message, type = "error") {
//   setTimeout(() => {
//     Util.topAlert(message, type);
//   }, SAGA_ALERT_TIMEOUT);
// }

// function* sendFeedBack() {
//   while (true) {
//     const { payload } = yield take(FEED_BACK.REQUEST);
//     try {
//       const response = yield call( callRequest, FEED_BACK_URL, payload, "", {}, ApiSauce );
//       if (response.status==1) {
//         Util.DialogAlert(response.message, "Success", "success")
//         yield put( feedBackSuccess(response.data) );
//         goBack();
//       } else {
//         yield put( feedBackFailure() )
//         Util.DialogAlert(response.message)
//       }
//     } catch (err) {
//       Util.DialogAlert(err.message)
//       yield put( feedBackFailure() )
//     }
//   }
// }

// function* termsrequest() {
//   while (true) {
//     const { payload } = yield take(ActionTypes.TERMS_AND_CONDITION);
//     try {
//       const response = yield call( callRequest, TERMS_AND_CONDITION_URL, payload, "", {}, ApiSauce );
//       if (response.status==1) {
//         yield put(termsSuccess(response.data));
//       } else {
//         yield put(loadingAction({ isLoading: false }));
//         Util.DialogAlert(response.message)
//       }
//     } catch (err) {
//       yield put(loadingAction({ isLoading: false }));
//       Util.DialogAlert(response.message)
//     }
//   }
// }
// function* aboutusrequest() {
//   while (true) {
//     const { responseCallback } = yield take(ABOUT_US.REQUEST);
//     try {
//       const response = yield call(
//         callRequest,
//         ABOUT_US_URL,
//         {},
//         "",
//         {},
//         ApiSauce
//       );
//       if (response.success) {
     
//         if (responseCallback) responseCallback(true, response.success.content);
//         yield put(aboutSuccess(response.success.content));
//       } else {
//         if (responseCallback) responseCallback(null, null);
//         alert("Something went wrong");
//       }
//     } catch (err) {
//       if (responseCallback) responseCallback(null, err);
//       alert(Util.getErrorText(err.message));
//     }
//   }
// }
// function* privacypolicyRequest() {
//   while (true) {
//     const { payload } = yield take(PRIVACY_POLICY.REQUEST);
//     try {
//       const response = yield call( callRequest, PRIVACY_POLICY_URL, payload, "", {}, ApiSauce );
//       if (response.status==1) {
//         yield put(privacySuccess(response.data));
//       } else {
//         yield put(loadingAction({ isLoading: false }));
//         Util.DialogAlert(response.message)
//       }
//     } catch (err) {
//       yield put(loadingAction({ isLoading: false }));
//       Util.DialogAlert(response.message)
//     }
//   }
// }

function* banners() {
	while (true) {
		yield take(ActionTypes.HOME_BANNERS);
		try {
			const response = yield call( callRequest, API_URL.BANNERS_URL, null, "", {}, ApiSauce );
			if (response.status === RESPONSE_TYPE.success) {
				yield put(appInfoActions.getHomeBannersResponse(response.data?.banners))
			} else {
				yield put(appInfoActions.getHomeBannersResponse([]))
			}
		} catch (err) {
			yield put(appInfoActions.getHomeBannersResponse([]))
		}
	}
}

export default function* root() {
	// yield fork(termsrequest);
	// yield fork(aboutusrequest);
	// yield fork(privacypolicyRequest);
	// yield fork(sendFeedBack);
	yield fork(banners);
}
