import _ from 'lodash';
import ApiSauce from '../services/ApiSauce';

// export const BASE_URL = 'https://server.appsstaging.com:3017/api/v1/';
export const BASE_URL = 'https://server.appsstaging.com/0000/orderingpads/api/';
export const ASSETS_URL = 'https://server.appsstaging.com:3017/';
export const WEB_SOCKET_URL = 'wss://server.appsstaging.com:3017/';
// export const BASE_URL = "http://10.0.4.71:3018/api/v1/"; //local
// export const ASSETS_URL = "http://10.0.4.71:3018/"; //local
export const API_TIMEOUT = 20000;
export const NEW_API_KEY = '1d399038bef14b0497d028fc27999696';
const GEOCODE_API_KEY = 'AIzaSyBF9VFK-SLMz0iJWyCcmjG6hrD_BQPZBw0';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};
export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};
export const ERROR_CANCEL_ERROR = {
  message: 'Upload cancelled',
  error: 'Upload cancelled',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES
export const SIGNUP_URL = {
  route: 'auth/signup',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
const VERIFY_USER_URL = {
  route: 'auth/verify-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const RESEND_CODE_URL = {
  route: 'auth/generate-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
const COMPLETE_PROFILE_URL = {
  route: 'customers/update-customer-profile',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const VERIFY_PASSWORD_OTP_URL = {
  route: 'auth/forgot-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
const FORGOT_PASSWORD_URL = {
  route: 'auth/recover-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
const UPDATE_PASSWORD_URL = {
  route: 'auth/reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
const LOGIN_URL = {
  route: 'login',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const LOGOUT_URL = {
  route: 'logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const PROFILE_URL = {
  route: 'auth/profile',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const EDIT_PROFILE_URL = {
  route: 'profile/edit',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const CHANGE_PASSWORD_URL = {
  route: 'password/change',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
const SAVE_LOCATION_URL = {
  route: 'customers/add-customer-location',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
const USER_PROFILE_URL = {
  route: 'customers/get-customer-profile',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const RECOMMENDED_MENU_URL = {
  route: 'menu-categories',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const RECOMMENDED_CATEGORIES_URL = {
  route: 'categories/get-all-recommended',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const RECOMMENDED_RESTAURANTS_URL = {
  route: 'restaurants/get-all-recommended',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const CATEGORY_RESTAURANTS_URL = {
  route: 'categories/get-restaurants',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const RESTAURANT_DETAILS_URL = {
  route: 'restaurants',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const RESTAURANT_MENUS_URL = {
  route: 'menu-categories/get-restaurant-products',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const ADD_CARD_URL = {
  route: 'cards/save-stripe-card',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
const CHECKOUT_URL = {
  route: 'orders/create-order',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
const CUSTOMER_CARDS_URL = {
  route: 'cards/get-customer-cards',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const DEFAULT_CARD_URL = {
  route: 'cards/set-default-stripe-card',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
const BANNERS_URL = {
  route: 'banners/get-all-listed',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const ORDERS_LIST_URL = {
  route: 'orders/get-all-customer-orders',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const SEARCH_RESTAURANT_URL = {
  route: 'restaurants/get-all-verified',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const DIRECTION_API_URL = 'https://router.project-osrm.org/route/v1/driving/';
const DRIVER_ORDER_URL = {
  route: 'orders/get-all-rider-orders',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const DRIVER_PROFILE_URL = {
  route: 'riders/get-rider-profile',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
const UPDATE_ORDER_STATUS_URL = {
  route: 'orders/update-order-status',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const callRequest = function (
  url: any,
  data: any,
  parameter: any,
  header = {},
  // ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some errors, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    // const _access_token = Util.getCurrentUserAccessToken();
    const _access_token = 'ABC';
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: _access_token.includes('Bearer ')
            ? _access_token
            : 'Bearer ' + _access_token,
        },
      };
    }
  }

  const _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;
  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};

export default {
  SIGNUP_URL,
  RESEND_CODE_URL,
  VERIFY_USER_URL,
  FORGOT_PASSWORD_URL,
  UPDATE_PASSWORD_URL,
  LOGIN_URL,
  COMPLETE_PROFILE_URL,
  GEOCODE_URL,
  GEOCODE_API_KEY,
  SAVE_LOCATION_URL,
  USER_PROFILE_URL,
  RECOMMENDED_MENU_URL,
  RECOMMENDED_CATEGORIES_URL,
  RECOMMENDED_RESTAURANTS_URL,
  CATEGORY_RESTAURANTS_URL,
  RESTAURANT_DETAILS_URL,
  RESTAURANT_MENUS_URL,
  ADD_CARD_URL,
  CHECKOUT_URL,
  CUSTOMER_CARDS_URL,
  DEFAULT_CARD_URL,
  BANNERS_URL,
  ORDERS_LIST_URL,
  SEARCH_RESTAURANT_URL,
  DIRECTION_API_URL,
  DRIVER_ORDER_URL,
  DRIVER_PROFILE_URL,
  UPDATE_ORDER_STATUS_URL,
};
