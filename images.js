import axios from 'axios';
import { APIS } from '../../AppConstants';

export function getImage(imageName, successCallback, errorCallback) {
  return dispatch => {
    axios
      .get(`${APIS.IMAGES}/${imageName}/`)
      .then(response => {
        successCallback(response.data);
      })
      .catch(error => {
        errorCallback();
      });
  };
}
