import usersConstants from '../../../src/store/constants/user.constants';
import authenticationReducer from '../../../src/store/reducers/authentication.reducer';

const initialState = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  logginIn: false,
  authError: null,
};

describe('authentication reducer', () => {
  it('returns initial state', () => {
    const returnedState = authenticationReducer(undefined, {});
    expect(returnedState).toEqual(initialState);
  });

  it('handles login request', () => {
    const expectedState = {
      ...initialState,
      logginIn: true,
    };
    const action = { type: usersConstants.LOGIN_REQUEST };
    const returnedState = authenticationReducer(initialState, action);
    expect(returnedState).toEqual(expectedState);
  });

  it('handles login success', () => {
    const expectedState = {
      ...initialState,
      isLoggedIn: true,
      logginIn: false,
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    };
    const { accessToken, refreshToken } = expectedState;
    const action = {
      type: usersConstants.LOGIN_SUCCESS,
      payload: {
        access: accessToken,
        refresh: refreshToken,
      },
    };
    const returnedState = authenticationReducer(initialState, action);
    expect(returnedState).toEqual(expectedState);
  });

  it('handles login failure', () => {
    const expectedState = {
      ...initialState,
      logginIn: false,
      isLoggedIn: false,
      authError: {
        credentials: ['No account was found with given credentials'],
      },
    };
    const { authError } = expectedState;
    const action = {
      type: usersConstants.LOGIN_FAILURE,
      payload: {
        errors: authError,
      },
    };
    const returnedState = authenticationReducer(initialState, action);
    expect(returnedState).toEqual(expectedState);
  });
});
