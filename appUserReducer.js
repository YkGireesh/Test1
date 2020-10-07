import { SIGN_IN_USER_SUCCESS, CURRENT_USER_PROFILE_SUCCESS, ESO_AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = { authenticated: false, authError: '' };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_IN_USER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        authError: ''
      };
    case CURRENT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        authError: ''
      };
    case ESO_AUTH_ERROR:
      return {
        ...state,
        authenticated: false,
        authError: action.payload
      };
    default:
      return state;
  }
}
