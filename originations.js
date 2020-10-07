import axios from 'axios';
import {
  ORIGINATION_CREATE_SUCCESS,
  ORIGINATION_GET_SUCCESS,
  ORIGINATION_LIST_ALL_SUCCESS,
  ORIGINATION_PORTFOILOS_SUCCESS
} from './types';
import { APIS } from '../../AppConstants';
import { ERROR_MESSAGES } from '../../MessagesEN';
import { destroy, initialize } from 'redux-form';
import { FORMS } from '../../AppConstants';

export function createOrigination(values, successCallback, errorCallback) {
  return dispatch => {
    axios
      .post(APIS.ORIGINATIONS, values)
      .then(response => {
        dispatch(destroy(FORMS.NEW_ORIGINATION_FORM));
        dispatch(
          initialize(FORMS.NEW_ORIGINATION_FORM, {
            application: values.application,
            portfolio: values.portfolio
          })
        );
        dispatch({ type: ORIGINATION_CREATE_SUCCESS, payload: response.data.data });
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function updateOrigination(values, successCallback, errorCallback) {
  return dispatch => {
    axios
      .put(`${APIS.ORIGINATIONS}/${values.originationNumber}`, values)
      .then(response => {
        dispatch({ type: ORIGINATION_CREATE_SUCCESS, payload: response.data.data });
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function updateOriginationStatus(values, successCallback, errorCallback) {
  return dispatch => {
    axios
      .put(`${APIS.ORIGINATIONS_STATUS}/${values.originationNumber}`, values)
      .then(response => {
        dispatch({ type: ORIGINATION_CREATE_SUCCESS, payload: response.data.data });
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function getOrigination(originationNumber, successCallback, errorCallback) {
  return dispatch => {
    axios
      .get(`${APIS.ORIGINATIONS}/${originationNumber}`)
      .then(response => {
        if (response.data.success) {
          dispatch({ type: ORIGINATION_GET_SUCCESS, payload: response.data.data });
          successCallback(response.data);
        } else {
          errorCallback(response.data.message);
        }
      })
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function listAllOriginations(year, successCallback, errorCallback) {
  return dispatch => {
    axios
      .get(`${APIS.LIST_ALL_ORIGINATIONS}/${year}`)
      .then(response => {
        dispatch({ type: ORIGINATION_LIST_ALL_SUCCESS, payload: response.data });
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function getOriginationPortfolioList(successCallback, errorCallback) {
  return dispatch => {
    axios
      .get(`${APIS.IDEAS_PORTFOILOS}`)
      .then(response => {
        if (response.data.success) {
          dispatch({ type: ORIGINATION_PORTFOILOS_SUCCESS, payload: response.data.data });
          successCallback(response.data);
        } else {
          errorCallback(response.data.message);
        }
      })
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}
