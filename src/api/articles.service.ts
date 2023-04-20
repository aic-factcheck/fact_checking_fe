/* eslint-disable arrow-body-style */
import { factCheckBe, scrapingService } from '../http_common';
import { IArticle } from '../common/types';

export default class ArticlesService {
  static getArticlesList = (page: number) => {
    return factCheckBe.get<IArticle[]>(`/articles?perPage=10&page=${page}`);
  };

  static saveArticle = (articleId: string) => {
    return factCheckBe.post(`/save?articleId=${articleId}`, { });
  };

  static unsaveArticle = (articleId: string) => {
    return factCheckBe.delete(`/save?articleId=${articleId}`);
  };

  static getArticle = (articleId: string) => {
    return factCheckBe.get<IArticle>(`/articles/${articleId}`);
  };

  static getMyArticles = (userId: string) => {
    return factCheckBe.get<IArticle[]>(`/users/${userId}/articles`);
  };

  static getTextFromURL = (urlAdress: string) => {
    return scrapingService.get<string>(`/extract/json?url=${urlAdress}`);
  };

  static editArticle = (id: string, mergedValues: IArticle) => {
    return factCheckBe.patch<IArticle>(`/articles/${id}`, mergedValues);
  };

  static createArticle = (mergedValues: IArticle) => {
    return factCheckBe.post<IArticle>('/articles', mergedValues);
  };

  static queryArticle = (patternSearch: string, page: number) => {
    return factCheckBe.get<IArticle[]>(`/search/articles?text=${patternSearch}&perPage=10&page=${page}`);
  };
}
