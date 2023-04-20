/* eslint-disable arrow-body-style */
import { message } from 'antd';
import axios from 'axios';
import { factCheckBe } from '../http_common';
import { IPerson, IProfile, IStats } from '../common/types';

export default class UserService {
  static login = (email: string, password: string) => {
    return factCheckBe.post<string, string>('/auth/login', { email, password });
  };

  static logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    axios.defaults.headers.common.Authorization = '';
  };

  static signup = (firstName: string, lastName: string, email: string, password: string) => {
    return factCheckBe.post<any>('/auth/register', {
      firstName, lastName, email, password,
    });
  };

  static getUserStats = () => {
    return factCheckBe.get<IStats>('/stats');
  };

  static getUserStatsProfile = (userId: string) => {
    return factCheckBe.get<IStats>(`/stats?userId=${userId}`);
  };

  static getLeaderboard = () => {
    return factCheckBe.get<IPerson[]>('/stats/leaderboard');
  };

  // eslint-disable-next-line max-len
  static editProfile = (id: string, firstName: string, lastName: string, email: string, setAuth: any, auth: any) => {
    return factCheckBe.patch<any>(`/users/${id}`, { firstName, lastName, email }).then((res) => {
      const saveUser = {
        token: {
          tokenType: 'Bearer',
          accessToken: `${auth?.token?.accessToken}`,
          refreshToken: `${auth?.token?.refreshToken}`,
          expiresIn: `${auth?.token?.expiresIn}`,
        },
        user: {
          id: `${id}`,
          name: `${res.data.name}`,
          email: `${res.data.email}`,
          role: `${res.data.role}`,
          createdAt: `${res.data.createdAt}`,
          firstName: `${res.data.firstName}`,
          lastName: `${res.data.lastName}`,
          nReviews: `${res.data.nReviews}`,
          nBeenVoted: `${res.data.nBeenVoted}`,
          savedArticles: `${res.data.savedArticles}`,
        },
      };
      localStorage.setItem('user', JSON.stringify(saveUser));
      setAuth(saveUser);
      message.info('Changes saved successfully!');
    }).catch();
  };

  static getUserProfile = (userId: string) => {
    return factCheckBe.get<IProfile[]>(`/users/${userId}`);
  };
}
