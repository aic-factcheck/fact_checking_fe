import http, { scrapingService } from '../http_common';
import { IArticle } from '../common/types';

export default class ArticlesService {
  static getArticlesList = () => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return http.get<IArticle[]>('/articles', { headers });
  };

  static saveArticle = (articleId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return http.post(`/save?articleId=${articleId}`, { }, { headers });
  };

  static unsaveArticle = (articleId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return http.delete(`/save?articleId=${articleId}`, { headers });
  };

  static getArticle = (articleId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return http.get<IArticle>(`/articles/${articleId}`, { headers });
  };

  static getMyArticles = (userId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return http.get<IArticle[]>(`/users/${userId}/articles`, { headers });
  };

  static getTextFromURL = (urlAdress: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return scrapingService.get<string>(`/extract/json?url=${urlAdress}`, { headers });
  };

  static editArticle = (id: string, mergedValues: IArticle) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return http.patch<IArticle>(`/articles/${id}`, mergedValues, { headers });
  };

  static createArticle = (mergedValues: IArticle) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return http.post<IArticle>('/articles', mergedValues, { headers });
  };
}
