import Constants from '../constants';

import Services from '../services';

const { usersConstants } = Constants;
const { usersService } = Services;

const login = ({ username, password }, service = usersService) => {
  const request = () => ({ type: usersConstants.LOGIN_REQUEST });
  const success = ({ access, refresh }) => ({
    type: usersConstants.LOGIN_SUCCESS,
    payload: { access, refresh },
  });
  const failure = errors => ({ type: usersConstants.LOGIN_FAILURE, payload: { errors } });

  return (dispatch) => {
    dispatch(request());
    return service.login({ username, password })
      .then(({ access, refresh }) => {
        dispatch(success({ access, refresh }));
      })
      .catch((errors) => {
        dispatch(failure(errors));
      });
  };
};

const logout = () => (dispatch) => {
  dispatch({ type: usersConstants.LOGOUT });
};

const userActions = {
  login,
  logout,
};
export default userActions;
