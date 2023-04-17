import http from "../http_common";
import { IReview } from "../common/types";

class ReviewsService {

  getReviews(articleid: string, claimid: string,) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.get<IReview[]>(`/articles/${articleid}/claims/${claimid}/reviews`, { headers } );
  }

  voteReview(idReview: string, rating: number) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.post<any>(`/vote?reviewId=${idReview}`, { rating }, { headers } );
  }

  addreview(articleid: string, claimid: string, values: any) {
    const headers = { "Authorization": `Bearer ${localStorage.getItem('token')}` }; 
    return http.post<any>(`/articles/${articleid}/claims/${claimid}/reviews`, values, { headers } );
  }

}

export default new ReviewsService();