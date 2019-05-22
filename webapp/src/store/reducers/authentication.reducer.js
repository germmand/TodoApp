import Constants from '../constants';

const { usersConstants } = Constants;

const initialState = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  logginIn: false,
  authError: null,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case usersConstants.LOGIN_REQUEST:
      return {
        ...state,
        logginIn: true,
      };
    case usersConstants.LOGIN_SUCCESS:
      return {
        ...state,
        logginIn: false,
        isLoggedIn: true,
        accessToken: action.payload.access,
        refreshToken: action.payload.refresh,
      };
    case usersConstants.LOGIN_FAILURE:
      return {
        ...state,
        logginIn: false,
        authError: action.payload.errors,
      };
    default:
      return state;
  }
};
export default authenticationReducer;
