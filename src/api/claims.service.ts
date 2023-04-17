import http from "../http_common";
import { IClaim } from "../common/types";

class ClaimsService {

  getClaimsList() {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.get<IClaim[]>("/hot/claims" , { headers });
  }

  getMyClaims(userId: string) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.get<IClaim[]>(`/users/${userId}/claims`, { headers });
  }

  voteClaim(idClaim: string, rating: number) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.post<any>(`/vote?claimId=${idClaim}`, { rating }, { headers });
  }

  getClaimsOfArticle(articleId: string) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.get<IClaim[]>(`/articles/${articleId}/claims`, { headers });
  }

  createClaim(articleId: string, values: any) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.post<any>(`/articles/${articleId}/claims`, values, { headers });
  }

  editClaim(articleid: string, claimid: string, values: any) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.patch<any>(`/articles/${articleid}/claims/${claimid}`, values, { headers });
  }

}

export default new ClaimsService();