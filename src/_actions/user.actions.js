import { useSetRecoilState, useRecoilState } from 'recoil';
import { message } from 'antd';
import authAtom from '../_state/auth';
import usersAtom from '../_state/users';

import useFetchWrapper from '../_helpers/fetch_wrapper';

export default function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_BASE}`;
  const fetchWrapper = useFetchWrapper();
  const [auth, setAuth] = useRecoilState(authAtom);
  // eslint-disable-next-line no-unused-vars
  const setUsers = useSetRecoilState(usersAtom);

  function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/auth/login`, { email, password })
      .then((user) => {
        const now = new Date();
        const saveUser = {
          data: user.user,
          token: user.token,
          at: user.token.accessToken,
          expiry: now + 900000,
        };

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

  function signup(firstName, lastName, email, password, verificationCode) {
    return fetchWrapper.post(`${baseUrl}/auth/register`, {
      firstName, lastName, email, password, verificationCode,
    })
      .then((user) => {
        const now = new Date();
        const saveUser = {
          data: user.user,
          token: user.token,
          at: user.token.accessToken,
          expiry: now + 900000,
        };

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

  function editProfile(id, firstName, lastName, email, password) {
    return fetchWrapper.patch(`${baseUrl}/users/${id}`, {
      firstName, lastName, email, password,
    })
      .then((user) => {
        const now = new Date();
        const saveUser = {
          data: user,
          token: auth.token,
          at: auth.token.accessToken,
          expiry: now + 900000,
        };

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
  }

  function getArticles() {
    return fetchWrapper.get(`${baseUrl}/articles`, { }).then((res) => res.json()).catch(console.log(''));
  }

  function getAll() {
    return fetchWrapper.get(`${baseUrl}/users`).then(setUsers);
  }

  return {
    login,
    logout,
    getAll,
    signup,
    editProfile,
    getArticles,
  };
}
