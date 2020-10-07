import axios from 'axios';
import { APIS } from '../../AppConstants';
import { ERROR_MESSAGES } from '../../MessagesEN';
import { destroy } from 'redux-form';
import { FORMS } from '../../AppConstants';

export function markAttendance(values, successCallback, errorCallback) {
  return (dispatch) => {
    axios
      .post(APIS.MARK_ATTENDANCE, values)
      .then((response) => {
        dispatch(destroy(FORMS.MARK_ATTENDANCE_FORM));
        successCallback(response.data);
      })
      .catch((error) => {
        errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
      });
  };
}

export function listAttendance(successCallback, errorCallback) {
  axios
    .get(APIS.LIST_ATTENDANCE)
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
    });
}

export function getDailyAttendanceData(
  inputDate,
  showNonRegistered,
  selectedGeoLocations,
  selectedChargeabilityOptions,
  selectedAccountTypeOptions,
  successCallback,
  errorCallback
) {
  const formData = new FormData();
  formData.append('date', inputDate);
  formData.append('showNonRegistered', showNonRegistered);
  formData.append('selectedGeoLocations', selectedGeoLocations);
  formData.append('selectedChargeabilityOptions', selectedChargeabilityOptions);
  formData.append('selectedAccountTypeOptions', selectedAccountTypeOptions);

  axios
    .post(APIS.GET_ATTENDANCE_DATA, formData)
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
    });
}

export function getAttendanceTrendsData(
  startDate,
  endDate,
  showNonRegistered,
  selectedGeoLocations,
  selectedChargeabilityOptions,
  selectedAccountTypeOptions,
  successCallback,
  errorCallback
) {
  const formData = new FormData();
  formData.append('startDate', startDate);
  formData.append('endDate', endDate);
  formData.append('showNonRegistered', showNonRegistered);
  formData.append('selectedGeoLocations', selectedGeoLocations);
  formData.append('selectedChargeabilityOptions', selectedChargeabilityOptions);
  formData.append('selectedAccountTypeOptions', selectedAccountTypeOptions);

  axios
    .post(APIS.GET_ATTENDANCE_TRENDS_DATA, formData)
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
    });
}

export function downloadAttendance(date, weekly, successCallback, errorCallback) {
  const formData = new FormData();
  formData.append('date', date);
  formData.append('weekly', weekly);

  axios
    .post(APIS.DOWNLOAD_ATTENDANCE, formData)
    .then((response) => {
      var x = response.data;
      x =
        'Enterprise Id,Active on Account,Registered on Portal,Email,Name,Personnel Number,Project Manager,Project Name,' +
        'Sub Project,Work Location,Account Type,Start Date,End Date,Chargeability,Attendance Date,Attendance Marked,Category,Present WFH,Present WFH – Partial Day,WFH Enabled - OOO,Other Approved Absences,Vacation/Sick/Other Leaves,Present Office\n' +
        x;
      successCallback(x);
    })
    .catch((error) => {
      errorCallback(ERROR_MESSAGES.SERVICE_ERROR);
    });
}
