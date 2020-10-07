import axios from 'axios';
import { APIS } from '../../AppConstants';
import { ERROR_MESSAGES } from '../../MessagesEN';

export function uploadRoster(file, successCallback, errorCallback) {
  return dispatch => {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios
      .post(APIS.ROSTER, formData, config)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}
