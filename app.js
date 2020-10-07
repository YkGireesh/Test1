import { CLEAR_ERROR_MESSAGE } from './types';

export function dismissError() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_ERROR_MESSAGE
    });
  };
}
