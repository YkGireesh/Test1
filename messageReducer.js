import { SYSTEM_ERROR_MESSAGE, CLEAR_ERROR_MESSAGE } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SYSTEM_ERROR_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        INITIAL_STATE
      };
    default:
      return state;
  }
}
