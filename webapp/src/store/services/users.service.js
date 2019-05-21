import API from '../../utils/http/API';

const login = ({ username, password }) => API.post('/users/authenticate', { username, password })
  .then((response) => {
    console.log('SUCCESS: ');
    console.log(response);
    return response;
  })
  .catch((error) => {
    console.log('ERROR: ');
    console.log(error);
    return error;
  });

const usersService = {
  login,
};
export default usersService;
