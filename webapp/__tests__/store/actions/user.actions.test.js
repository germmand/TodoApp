import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import userActions from '../../../src/store/actions/user.actions';
import usersConstants from '../../../src/store/constants/user.constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login action', () => {
  let store;
  let loginService;
  const { login } = userActions;

  beforeEach(() => {
    store = mockStore({});
    loginService = (body, succeeds) => ({
      login: () => new Promise((resolve, reject) => {
        setTimeout(() => (succeeds ? resolve(body) : reject(body)), 100);
      }),
    });
  });

  it('dispatches actions for successful login', () => {
    const mockResponse = {
      access: 'access_token',
      refresh: 'refresh_token',
    };
    const fakeUser = {
      username: 'fakeUser',
      password: 'superPassword',
    };
    return store.dispatch(login(fakeUser, loginService(mockResponse, true)))
      .then(() => {
        const loginRequestAction = login.request();
        const loginSuccessAction = login.success(mockResponse);
        expect(store.getActions()).toHaveLength(2);
        expect(store.getActions()[0]).toEqual(loginRequestAction);
        expect(store.getActions()[1]).toEqual(loginSuccessAction);
      });
  });

  it('dispatches actions for failed login', () => {
    const mockResponse = {
      credentials: ['No account was found with given credentials.'],
    };
    const fakeUser = {
      username: 'fakeUser',
      password: 'superPassword',
    };
    return store.dispatch(login(fakeUser, loginService(mockResponse, false)))
      .then(() => {
        const loginRequestAction = login.request();
        const loginFailureAction = login.failure(mockResponse);
        expect(store.getActions()).toHaveLength(2);
        expect(store.getActions()[0]).toEqual(loginRequestAction);
        expect(store.getActions()[1]).toEqual(loginFailureAction);
      });
  });
});

describe('logout action', () => {
  let store;
  const { logout } = userActions;
  beforeEach(() => {
    store = mockStore({});
  });

  it('dispatches respective actions for logout', () => {
    const expectedAction = { type: usersConstants.LOGOUT };
    store.dispatch(logout());
    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()[0]).toEqual(expectedAction);
  });
});
