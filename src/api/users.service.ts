import http from "../http_common";
import { IPerson, IStats } from "../common/types";
import { message } from 'antd';
import axios from "axios";

class UserService {

  login(email: string, password: string) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.post<any>("/auth/login", { email, password }, { headers } )/*.then((res) => {
      setAuth(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('token', res.data.token.accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token.accessToken}`;
    })*/;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = ``;
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.post<any>("/auth/register", {firstName, lastName, email, password}, { headers })/*.then((res) => {
      setAuth(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('token', res.data.token.accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token.accessToken}`;
    });*/
  }

  getUserStats() {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.get<IStats>("/stats", { headers });
  }

  getLeaderboard() {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.get<IPerson[]>("/stats/leaderboard", { headers });
  }

  editProfile(id: string, firstName: string, lastName: string, email: string, setAuth: any, auth: any) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.patch<any>(`/users/${id}`, {firstName, lastName, email}, { headers }).then((res) => {
      const saveUser = {
        "token":{
           "tokenType":"Bearer",
           "accessToken":`${auth?.token?.accessToken}`,
           "refreshToken":`${auth?.token?.refreshToken}`,
           "expiresIn":`${auth?.token?.expiresIn}`
        },
        "user":{
           "id":`${id}`,
           "name":`${res.data.name}`,
           "email":`${res.data.email}`,
           "role":`${res.data.role}`,
           "createdAt":`${res.data.createdAt}`,
           "firstName":`${res.data.firstName}`,
           "lastName":`${res.data.lastName}`,
           "nReviews":`${res.data.nReviews}`,
           "nBeenVoted":`${res.data.nBeenVoted}`,
           "savedArticles":`${res.data.savedArticles}`,
        }
      }
      localStorage.setItem('user', JSON.stringify(saveUser));
      setAuth(saveUser);
      message.info('Changes saved successfully!');
    }).catch();
  }

}

export default new UserService();