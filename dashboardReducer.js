import {
  DASHBOARD_INFO_SUCCESS,
  DASHBOARD_HEALTH_SUCCESS,
  DASHBOARD_ENV_SUCCESS,
  DASHBOARD_METRICS_SUCCESS,
  DASHBOARD_TRACE_SUCCESS,
  DASHBOARD_AUDIT_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DASHBOARD_INFO_SUCCESS:
      return { ...state, info: action.payload };
    case DASHBOARD_HEALTH_SUCCESS:
      return { ...state, health: action.payload };
    case DASHBOARD_ENV_SUCCESS:
      return { ...state, env: action.payload };
    case DASHBOARD_METRICS_SUCCESS:
      return { ...state, metrics: action.payload };
    case DASHBOARD_TRACE_SUCCESS:
      return { ...state, trace: action.payload };
    case DASHBOARD_AUDIT_SUCCESS:
      return { ...state, audit: action.payload };
    default:
      return state;
  }
}
