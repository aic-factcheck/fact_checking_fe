import http from '../http_common';
import { IReview } from '../common/types';

export default class ReviewsService {
  static getReviews = (articleid: string, claimid: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return http.get<IReview[]>(`/articles/${articleid}/claims/${claimid}/reviews`, { headers });
  };

  static voteReview = (idReview: string, rating: number) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return http.post<number>(`/vote?reviewId=${idReview}`, { rating }, { headers });
  };

  static addreview = (articleid: string, claimid: string, values: IReview) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return http.post<IReview>(`/articles/${articleid}/claims/${claimid}/reviews`, values, { headers });
  };
}
