import axios from 'axios';
import {
  SIGN_IN_USER_SUCCESS,
  SIGN_OUT_USER_SUCCESS,
  CURRENT_USER_PROFILE_SUCCESS,
  USER_LIST_ALL_SUCCESS,
  USER_BIRTHDAYS_SUCCESS,
  USER_LOCATIONS_SUCCESS,
  ESO_AUTH_ERROR,
} from './types';
import { APIS, APP, URLS } from '../../AppConstants';
import { ERROR_MESSAGES } from '../../MessagesEN';
import { reset } from 'redux-form';
import { FORMS } from '../../AppConstants';

export function isRegistrationAllowed(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .get(`${APIS.USER_IS_REGISTRATION_ALLOWED}/${values.enterpriseId}/`)
      .then((response) => {
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function signUp(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .post(APIS.SIGN_UP_USER, values)
      .then(() => {
        axios.post(APIS.USER_LOGIN, values).then((response) => {
          localStorage.setItem(APP.JWT_TOKEN, response.headers.authorization);
          dispatch({
            type: SIGN_IN_USER_SUCCESS,
          });
          successCallback();
        });
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function isRegistered(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .get(`${APIS.USER_IS_REGISTERED}/${values.enterpriseId}/`)
      .then((response) => {
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function verifySecurityAnswer(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .post(APIS.VERIFY_SECURITY_ANSWER, values)
      .then((response) => {
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function resetPassword(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .post(APIS.RESET_PASSWORD, values)
      .then(() => {
        axios.post(APIS.USER_LOGIN, values).then((response) => {
          localStorage.setItem(APP.JWT_TOKEN, response.headers.authorization);
          dispatch({
            type: SIGN_IN_USER_SUCCESS,
          });
          successCallback();
        });
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function changePassword(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .post(APIS.CHANGE_PASSWORD, values)
      .then((response) => {
        dispatch(reset(FORMS.CHANGE_PASSWORD));
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function changeSecurityAnswer(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .post(APIS.CHANGE_SECURITY_ANSWER, values)
      .then((response) => {
        dispatch(reset(FORMS.CHANGE_SECURITY_ANSWER));
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function signInUser(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .post(APIS.USER_LOGIN, values)
      .then((response) => {
        localStorage.setItem(APP.JWT_TOKEN, response.headers.authorization);
        dispatch({
          type: SIGN_IN_USER_SUCCESS,
        });
        successCallback();
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.AUTHENTICATION_FAILED);
      });
  };
}

export function validateAccessToken(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .get(APIS.VALIDATE_ACCESS_TOKEN, { headers: { 'Azure-Access-Token': values } })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem(APP.JWT_TOKEN, response.data.data);
          dispatch({
            type: SIGN_IN_USER_SUCCESS,
          });
          successCallback();
        } else {
          dispatch({
            type: ESO_AUTH_ERROR,
            payload: response.data.message,
          });
          errorCallback(response.data.message);
        }
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.AUTHENTICATION_FAILED);
      });
  };
}

export function signOutUser() {
  localStorage.removeItem(APP.JWT_TOKEN);
  localStorage.removeItem(APP.ACCESS_TOKEN);
  localStorage.removeItem(APP.PROFILE_PHOTO);
  return {
    type: SIGN_OUT_USER_SUCCESS,
  };
}

export function clearStorage() {
  localStorage.removeItem(APP.JWT_TOKEN);
  localStorage.removeItem(APP.ACCESS_TOKEN);
  localStorage.removeItem(APP.PROFILE_PHOTO);
  return {
    type: '',
  };
}

export function sessionExpired(successCallback) {
  localStorage.removeItem(APP.JWT_TOKEN);
  localStorage.removeItem(APP.ACCESS_TOKEN);
  localStorage.removeItem(APP.PROFILE_PHOTO);
  successCallback();
  return {
    type: SIGN_OUT_USER_SUCCESS,
  };
}

export function fetchUserProfile(successCallback) {
  return function (dispatch) {
    axios.get(APIS.USER_PROFILE).then((response) => {
      if (response.data.photoUpdated) {
        axios.get(`${APIS.IMAGES}/${response.data.enterpriseId}/`).then((photo) => {
          localStorage.setItem(APP.PROFILE_PHOTO, photo.data.content);
          dispatch({
            type: CURRENT_USER_PROFILE_SUCCESS,
            payload: response.data,
          });
        });
      } else {
        dispatch({
          type: CURRENT_USER_PROFILE_SUCCESS,
          payload: response.data,
        });
      }
      successCallback();
    });
  };
}

export function updateUserDetails(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .post(APIS.USER_PROFILE, values)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: CURRENT_USER_PROFILE_SUCCESS,
            payload: response.data.data,
          });
          successCallback(response.data);
        }
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function setPhoto(values, successCallback, errorCallback) {
  return function (dispatch) {
    axios.post(APIS.IMAGES, values).then((response) => {
      if (response.data) {
        axios.post(APIS.USER_PHOTO).then((response) => {
          if (response.data.success) {
            localStorage.setItem(APP.PROFILE_PHOTO, values.content);
            dispatch({
              type: CURRENT_USER_PROFILE_SUCCESS,
              payload: response.data.data,
            });
            successCallback(response.data);
          }
        });
      }
    });
  };
}

export function getBasicProfile(enterpriseId, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .get(`${APIS.USER_PROFILE}/${enterpriseId}/`)
      .then((response) => {
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function fetchTeamUserProfile(enterpriseId, successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .get(`${APIS.USER_PROFILE_DETAILS}/${enterpriseId}/`)
      .then((response) => {
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function listUsers(successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .get(APIS.USER_LIST)
      .then((response) => {
        dispatch({
          type: USER_LIST_ALL_SUCCESS,
          payload: response.data.data,
        });
        successCallback();
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function listBirthdays(successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .get(APIS.USERS_BIRTHDAYS)
      .then((response) => {
        dispatch({
          type: USER_BIRTHDAYS_SUCCESS,
          payload: response.data.data,
        });
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function getLocations(successCallback, errorCallback) {
  return function (dispatch) {
    axios
      .get(APIS.USERS_LOCATIONS)
      .then((response) => {
        dispatch({
          type: USER_LOCATIONS_SUCCESS,
          payload: response.data.data,
        });
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(error.response.data.message || ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

axios.interceptors.request.use(
  function (config) {
    config.headers.authorization = localStorage.getItem(APP.JWT_TOKEN);
    config.headers.appVersion = APP.BUILD_VERSION;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 500) {
      if (
        error.response.data &&
        (error.response.data.exception === 'io.jsonwebtoken.ExpiredJwtException' ||
          error.response.data.exception === 'io.jsonwebtoken.MalformedJwtException' ||
          error.response.data.exception === 'io.jsonwebtoken.SignatureException')
      ) {
        localStorage.setItem(APP.REFERRER, window.location.pathname);
        document.location = URLS.SESSION_EXPIRED;
      }
    } else if (error.response && error.response.status === 403) {
      if (
        error.response.data &&
        error.response.data.exception === 'org.springframework.security.access.AccessDeniedException'
      ) {
        localStorage.setItem(APP.REFERRER, window.location.pathname);
        document.location = URLS.SESSION_EXPIRED;
      }
    } else if (error.response && error.response.status === 412) {
      window.location.reload(true);
    }
    return Promise.reject(error);
  }
);
