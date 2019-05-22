import API from '../../utils/http/API';

const login = ({ username, password }) => API.post('/users/authenticate', { username, password })
  .then(response => response.data)
  .catch((error) => {
    throw error.response.data;
  });

const usersService = {
  login,
};
export default usersService;
