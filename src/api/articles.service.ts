/* eslint-disable arrow-body-style */
import { factCheckBe, scrapingService } from '../http_common';
import { IArticle } from '../common/types';

export default class ArticlesService {
  static getArticlesList = (page: number) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.get<IArticle[]>(`/articles?perPage=10&page=${page}`, { headers });
  };

  static saveArticle = (articleId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.post(`/save?articleId=${articleId}`, { }, { headers });
  };

  static unsaveArticle = (articleId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.delete(`/save?articleId=${articleId}`, { headers });
  };

  static getArticle = (articleId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.get<IArticle>(`/articles/${articleId}`, { headers });
  };

  static getMyArticles = (userId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.get<IArticle[]>(`/users/${userId}/articles`, { headers });
  };

  static getTextFromURL = (urlAdress: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return scrapingService.get<string>(`/extract/json?url=${urlAdress}`, { headers });
  };

  static editArticle = (id: string, mergedValues: IArticle) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.patch<IArticle>(`/articles/${id}`, mergedValues, { headers });
  };

  static createArticle = (mergedValues: IArticle) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.post<IArticle>('/articles', mergedValues, { headers });
  };

  static queryArticle = (patternSearch: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.get<IArticle[]>(`/search/articles?text=${patternSearch}`, { headers });
  };
}
