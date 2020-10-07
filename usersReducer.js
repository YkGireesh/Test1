import { USER_LIST_ALL_SUCCESS, USER_BIRTHDAYS_SUCCESS, USER_LOCATIONS_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LIST_ALL_SUCCESS:
      return {
        ...state,
        listAll: action.payload
      };
    case USER_BIRTHDAYS_SUCCESS:
      return {
        ...state,
        birthdays: action.payload
      };
    case USER_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload
      };
    default:
      return state;
  }
}
