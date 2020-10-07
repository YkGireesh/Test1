import axios from 'axios';
import {
  DASHBOARD_INFO_SUCCESS,
  DASHBOARD_HEALTH_SUCCESS,
  DASHBOARD_ENV_SUCCESS,
  DASHBOARD_METRICS_SUCCESS,
  DASHBOARD_TRACE_SUCCESS,
  DASHBOARD_AUDIT_SUCCESS
} from './types';
import { APIS } from '../../AppConstants';
import { ERROR_MESSAGES } from '../../MessagesEN';

const getInfo = () => {
  return axios.get(APIS.DASHBOARD_INFO);
};

const getHealth = () => {
  return axios.get(APIS.DASHBOARD_HEALTH);
};

const getEnv = () => {
  return axios.get(APIS.DASHBOARD_ENV);
};

const getMetrics = () => {
  return axios.get(APIS.DASHBOARD_METRICS);
};

const getTrace = () => {
  return axios.get(APIS.DASHBOARD_TRACE);
};

const getAudit = () => {
  return axios.get(APIS.DASHBOARD_AUDIT);
};

export const getAppInfo = (successCallback, errorCallback) => {
  return dispatch => {
    axios
      .all([getInfo(), getHealth(), getEnv()])
      .then(
        axios.spread(function(info, health, env) {
          dispatch({ type: DASHBOARD_INFO_SUCCESS, payload: info.data });
          dispatch({ type: DASHBOARD_HEALTH_SUCCESS, payload: health.data });
          dispatch({ type: DASHBOARD_ENV_SUCCESS, payload: env.data });
          successCallback();
        })
      )
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
};

export const getAppMetrics = (successCallback, errorCallback) => {
  return dispatch => {
    axios
      .all([getMetrics()])
      .then(
        axios.spread(function(metrics) {
          dispatch({ type: DASHBOARD_METRICS_SUCCESS, payload: metrics.data });
          successCallback();
        })
      )
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
};

export const getAppTrace = (successCallback, errorCallback) => {
  return dispatch => {
    axios
      .all([getTrace()])
      .then(
        axios.spread(function(trace) {
          let flatData = trace.data;
          flatData = flatData.map((item, index) => {
            item.path = item.info.path;
            item.method = item.info.method;
            item.timeTaken = item.info.timeTaken;

            return item;
          });
          dispatch({ type: DASHBOARD_TRACE_SUCCESS, payload: flatData });
          successCallback();
        })
      )
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
};

export const getAppAudit = (successCallback, errorCallback) => {
  return dispatch => {
    axios
      .all([getAudit()])
      .then(
        axios.spread(function(audit) {
          dispatch({ type: DASHBOARD_AUDIT_SUCCESS, payload: audit.data });
          successCallback();
        })
      )
      .catch(error => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
};
