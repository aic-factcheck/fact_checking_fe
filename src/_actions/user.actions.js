import { useSetRecoilState } from 'recoil';
import { message } from 'antd';
// import { history } from '_helpers/history';
import authAtom from '../_state/auth';
import usersAtom from '../_state/users';

import useFetchWrapper from '../_helpers/fetch_wrapper';

// import  { Redirect } from 'react-router-dom'

export default function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_BASE}`;
  const fetchWrapper = useFetchWrapper();
  const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);

  function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/auth/login`, { email, password })
      .then((user) => {
        const saveUser = {
          data: user.user,
          token: user.token,
          at: user.token.accessToken,
        };

        console.log(user);

        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(saveUser));
        setAuth(saveUser);

        // get return url from location state or default to home page
        // const { from } = history.location.state || { from: { pathname: '/' } };
        // history.push('/collections');
        window.location.reload(false);
      })
      .catch((error) => {
        message.error(error);
      });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem('user');
    setAuth(null);
    // history.push('/authentication/wallet-sign-in');
  }

  function getAll() {
    return fetchWrapper.get(`${baseUrl}/users`).then(setUsers);
  }

  return {
    login,
    logout,
    getAll,
  };
}
