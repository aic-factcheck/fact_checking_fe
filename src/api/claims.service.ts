/* eslint-disable arrow-body-style */
import { factCheckBe } from '../http_common';
import { IClaim } from '../common/types';

export default class ClaimsService {
  static getClaimsList = (page: number) => {
    return factCheckBe.get<IClaim[]>(`/hot/claims?perPage=10&page=${page}`);
  };

  static getMyClaims = (userId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.get<IClaim[]>(`/users/${userId}/claims`, { headers });
  };

  static voteClaim = (idClaim: string, rating: number) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.post<number>(`/vote?claimId=${idClaim}`, { rating }, { headers });
  };

  static getClaimsOfArticle = (articleId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.get<IClaim[]>(`/articles/${articleId}/claims`, { headers });
  };

  static createClaim = (articleId: string, values: IClaim) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.post<IClaim>(`/articles/${articleId}/claims`, values, { headers });
  };

  static editClaim = (articleid: string, claimid: string, values: IClaim) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.patch<IClaim>(`/articles/${articleid}/claims/${claimid}`, values, { headers });
  };

  static queryClaim = (patternSearch: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.get<IClaim[]>(`/search/claims?text=${patternSearch}`, { headers });
  };
}
