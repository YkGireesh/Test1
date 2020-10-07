import {
  IDEA_CREATE_SUCCESS,
  IDEA_GET_SUCCESS,
  IDEA_LIST_SUCCESS,
  IDEA_LIST_ALL_SUCCESS,
  IDEA_ACCOUNT_SUMMARY_SUCCESS,
  IDEA_SELF_SUCCESS,
  IDEA_USERS_SUCCESS,
  IDEA_ACCOUNT_SUMMARY_CUSTOM_SUCCESS,
  IDEA_ACCOUNT_TYPES_SUCCESS,
  IDEA_PORTFOILOS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case IDEA_CREATE_SUCCESS:
      return { ...state, activeIdea: action.payload };
    case IDEA_GET_SUCCESS:
      return { ...state, activeIdea: action.payload };
    case IDEA_LIST_SUCCESS:
      return { ...state, list: action.payload };
    case IDEA_LIST_ALL_SUCCESS:
      return { ...state, listAll: action.payload };
    case IDEA_ACCOUNT_SUMMARY_SUCCESS:
      return { ...state, accountSummary: action.payload };
    case IDEA_ACCOUNT_SUMMARY_CUSTOM_SUCCESS:
      return { ...state, customAutomationSummary: action.payload };
    case IDEA_SELF_SUCCESS:
      return { ...state, self: action.payload };
    case IDEA_USERS_SUCCESS:
      return { ...state, users: action.payload };
    case IDEA_ACCOUNT_TYPES_SUCCESS:
      return { ...state, users: action.payload };
    case IDEA_PORTFOILOS_SUCCESS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
