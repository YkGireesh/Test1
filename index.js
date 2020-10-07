import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AppUserReducer from './appUserReducer';
import MessageReducer from './messageReducer';
import IdeasReducer from './ideasReducer';
import OriginationsReducer from './originationsReducer';
import FeedbackReducer from './feedbackReducer';
import DashboardReducer from './dashboardReducer';
import UsersReducer from './usersReducer';
import { SIGN_OUT_USER_SUCCESS } from '../actions/types';

const appReducer = combineReducers({
  user: AppUserReducer,
  error: MessageReducer,
  ideas: IdeasReducer,
  originations: OriginationsReducer,
  feedback: FeedbackReducer,
  dashboard: DashboardReducer,
  users: UsersReducer,
  form: FormReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT_USER_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
