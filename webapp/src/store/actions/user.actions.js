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
  const failure = error => ({ type: usersConstants.LOGIN_FAILURE, payload: { error } });

  return (dispatch) => {
    dispatch(request());
    return service.login({ username, password })
      .then(({ access, refresh }) => {
        dispatch(success({ access, refresh }));
      })
      .catch(({ error }) => {
        dispatch(failure(error));
      });
  };
};

const userActions = {
  login,
};
export default userActions;
