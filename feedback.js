import axios from 'axios';
import { FEEDBACK_LIST_SUCCESS } from './types';
import { APIS } from '../../AppConstants';
import { ERROR_MESSAGES } from '../../MessagesEN';
import { destroy } from 'redux-form';
import { FORMS } from '../../AppConstants';

export function createFeedback(values, successCallback, errorCallback) {
  return dispatch => {
    axios
      .post(APIS.FEEDBACK, values)
      .then(response => {
        dispatch(destroy(FORMS.GIVE_FEEDBACK));
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function listFeedback(values, successCallback, errorCallback) {
  return dispatch => {
    axios
      .get(APIS.FEEDBACK_LIST_ALL)
      .then(response => {
        dispatch({
          type: FEEDBACK_LIST_SUCCESS,
          payload: response.data
        });
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}
