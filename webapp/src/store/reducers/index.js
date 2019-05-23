import { combineReducers } from 'redux';

import authenticationReducer from './authentication.reducer';

import Constants from '../constants';

const { usersConstants } = Constants;

const appReducer = combineReducers({
  authenticationReducer,
});

const rootReducer = (state, action) => {
  // When the user logs out,
  // reset the whole state to its initial default.
  if (action.type === usersConstants.LOGOUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
