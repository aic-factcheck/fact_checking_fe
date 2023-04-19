import http from '../http_common';
import { IClaim } from '../common/types';

export default class ClaimsService {
  static getClaimsList = (page: number) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return http.get<IClaim[]>(`/hot/claims?perPage=10&page=${page}`, { headers });
  };

  static getMyClaims = (userId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return http.get<IClaim[]>(`/users/${userId}/claims`, { headers });
  };

  static voteClaim = (idClaim: string, rating: number) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return http.post<number>(`/vote?claimId=${idClaim}`, { rating }, { headers });
  };

  static getClaimsOfArticle = (articleId: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return http.get<IClaim[]>(`/articles/${articleId}/claims`, { headers });
  };

  static createClaim = (articleId: string, values: IClaim) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return http.post<IClaim>(`/articles/${articleId}/claims`, values, { headers });
  };

  static editClaim = (articleid: string, claimid: string, values: IClaim) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return http.patch<IClaim>(`/articles/${articleid}/claims/${claimid}`, values, { headers });
  };

  static queryClaim = (patternSearch: string, page: number) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return http.get<IClaim[]>(`/search/claims?text=${patternSearch}&perPage=10&page=${page}`, { headers });
  };
}
