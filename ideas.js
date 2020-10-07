import axios from 'axios';
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
  IDEA_PORTFOILOS_SUCCESS,
  PORTFOLIO_GET_SUCCESS,
} from './types';
import { APIS } from '../../AppConstants';
import { ERROR_MESSAGES } from '../../MessagesEN';
import { destroy, initialize } from 'redux-form';
import { FORMS } from '../../AppConstants';

export function createIdea(values, successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .post(APIS.IDEAS, values)
      .then((response) => {
        dispatch(destroy(FORMS.NEW_IDEA_FORM));
        dispatch(
          initialize(FORMS.NEW_IDEA_FORM, {
            application: values.application,
            portfolio: values.portfolio,
          })
        );
        dispatch({ type: IDEA_CREATE_SUCCESS, payload: response.data.data });
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function updateIdea(values, successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .put(`${APIS.IDEAS}/${values.ideaNumber}`, values)
      .then((response) => {
        dispatch({ type: IDEA_CREATE_SUCCESS, payload: response.data.data });
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function updateIdeaStatus(values, successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .put(`${APIS.IDEAS_STATUS}/${values.ideaNumber}`, values)
      .then((response) => {
        dispatch({ type: IDEA_CREATE_SUCCESS, payload: response.data.data });
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function getIdea(ideaNumber, successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .get(`${APIS.IDEAS}/${ideaNumber}`)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: IDEA_GET_SUCCESS, payload: response.data.data });
          successCallback(response.data);
        } else {
          errorCallback(response.data.message);
        }
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function listIdeas(values, successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .get(`${APIS.IDEAS}`)
      .then((response) => {
        dispatch({ type: IDEA_LIST_SUCCESS, payload: response.data });
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function listAllIdeas(year, successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .get(`${APIS.LIST_ALL_IDEAS}/${year}`)
      .then((response) => {
        dispatch({ type: IDEA_LIST_ALL_SUCCESS, payload: response.data });
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function listAllAutomationIdeas(year, type, successCallback, errorCallback) {
  let values = {
    year,
    type,
  };
  return (dispatch) => {
    axios
      .post(APIS.LIST_ALL_AUTOMATION_IDEAS, values)
      .then((response) => {
        dispatch({ type: IDEA_LIST_ALL_SUCCESS, payload: response.data });
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function getAccountSummary(year, country, successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .get(`${APIS.IDEAS_ACCOUNT_SUMMARY}/${year}/${country}`)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: IDEA_ACCOUNT_SUMMARY_SUCCESS,
            payload: response.data.data,
          });
          successCallback(response.data);
        } else {
          errorCallback(response.data.message);
        }
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function customSummaryForAutomation(year, location, successCallback, errorCallback) {
  let values = {
    year,
    location,
  };
  return (dispatch) => {
    axios
      .post(APIS.IDEAS_ACCOUNT_SUMMARY_AUTOMATION_CUSTOM, values)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: IDEA_ACCOUNT_SUMMARY_CUSTOM_SUCCESS,
            payload: response.data.data,
          });
          successCallback(response.data);
        } else {
          errorCallback(response.data.message);
        }
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function getAccountSummaryForAutomation(year, type, successCallback, errorCallback) {
  let values = {
    year,
    type,
  };
  return (dispatch) => {
    axios
      .post(APIS.IDEAS_ACCOUNT_SUMMARY_AUTOMATION, values)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: IDEA_ACCOUNT_SUMMARY_SUCCESS,
            payload: response.data.data,
          });
          successCallback(response.data);
        } else {
          errorCallback(response.data.message);
        }
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

const getSelf = (year) => {
  return axios.get(`${APIS.IDEAS_SELF_SUMMARY}/${year}`);
};

const getUsers = (year) => {
  return axios.get(`${APIS.IDEAS_USERS_SUMMARY}/${year}`);
};

export const getIndividualSummary = (year, successCallback, errorCallback) => {
  return (dispatch) => {
    axios
      .all([getSelf(year), getUsers(year)])
      .then(
        axios.spread(function (self, users) {
          dispatch({ type: IDEA_SELF_SUCCESS, payload: self.data });
          dispatch({ type: IDEA_USERS_SUCCESS, payload: users.data });
          successCallback();
        })
      )
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
};

export function getAccountTypeList(successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .get(`${APIS.IDEAS_ACCOUNT_TYPES}`)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: IDEA_ACCOUNT_TYPES_SUCCESS,
            payload: response.data.data,
          });
          successCallback(response.data);
        } else {
          errorCallback(response.data.message);
        }
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function getPortfolioList(successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .get(`${APIS.IDEAS_PORTFOILOS}`)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: IDEA_PORTFOILOS_SUCCESS,
            payload: response.data.data,
          });
          successCallback(response.data);
        } else {
          errorCallback(response.data.message);
        }
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function getPortfolioByProject(projectName, successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .get(`${APIS.PORTFOLIO}/${projectName}`)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: PORTFOLIO_GET_SUCCESS, payload: response.data });
          successCallback(response.data);
        } else {
          errorCallback(response.data.message);
        }
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function downloadIdeas(successCallback, errorCallback) {
  axios
    .get(APIS.DOWNLOAD_IDEAS)
    .then((response) => {
      var x = response.data;
      x =
        'Idea Number,Idea Statement,Problem Statement,Solution Description,Portfolio,Application,Classification,Hours Savings,' +
        'Hours Required,Dollar Savings,Intangible Benefits,Stage,Status,Submitter,Submitted Date,Last Edited Date,SME Review Date,' +
        'Council Review Date,Client Review Date,Implementation Date,Last Editor,SME Reviewer,Council Reviewer,Client Reviewer,Next Stage,Next Status,Points,Country\n' +
        x;
      successCallback(x);
    })
    .catch((error) => {
      errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
    });
}
