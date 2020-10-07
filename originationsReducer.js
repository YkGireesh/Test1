import {
  ORIGINATION_CREATE_SUCCESS,
  ORIGINATION_GET_SUCCESS,
  ORIGINATION_LIST_ALL_SUCCESS,
  ORIGINATION_PORTFOILOS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ORIGINATION_CREATE_SUCCESS:
      return { ...state, activeOrigination: action.payload };
    case ORIGINATION_GET_SUCCESS:
      return { ...state, activeOrigination: action.payload };
    case ORIGINATION_LIST_ALL_SUCCESS:
      return { ...state, listAll: action.payload };
    case ORIGINATION_PORTFOILOS_SUCCESS:
      return { ...state, listAll: action.payload };
    default:
      return state;
  }
}
