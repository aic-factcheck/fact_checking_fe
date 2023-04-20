/* eslint-disable arrow-body-style */
import { factCheckBe } from '../http_common';
import { IClaim } from '../common/types';

export default class ClaimsService {
  static getClaimsList = (page: number) => {
    return factCheckBe.get<IClaim[]>(`/hot/claims?perPage=10&page=${page}`);
  };

  static getMyClaims = (userId: string) => {
    return factCheckBe.get<IClaim[]>(`/users/${userId}/claims`);
  };

  static voteClaim = (idClaim: string, rating: number) => {
    return factCheckBe.post<number>(`/vote?claimId=${idClaim}`, { rating });
  };

  static getClaimsOfArticle = (articleId: string) => {
    return factCheckBe.get<IClaim[]>(`/articles/${articleId}/claims`);
  };

  static createClaim = (articleId: string, values: IClaim) => {
    return factCheckBe.post<IClaim>(`/articles/${articleId}/claims`, values);
  };

  static editClaim = (articleid: string, claimid: string, values: IClaim) => {
    return factCheckBe.patch<IClaim>(`/articles/${articleid}/claims/${claimid}`, values);
  };

  static queryClaim = (patternSearch: string, page: number) => {
    return factCheckBe.get<IClaim[]>(`/search/claims?text=${patternSearch}&perPage=10&page=${page}`);
  };
}
