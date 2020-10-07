import { FEEDBACK_LIST_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FEEDBACK_LIST_SUCCESS:
      return { ...state, listAll: action.payload };
    default:
      return state;
  }
}
