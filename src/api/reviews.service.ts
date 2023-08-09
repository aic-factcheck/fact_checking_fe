/* eslint-disable arrow-body-style */
import { factCheckBe } from '../http_common';
import { IReview, IUserReview } from '../common/types';

export default class ReviewsService {
  static getReviews = (articleid: string, claimid: string) => {
    return factCheckBe.get<IReview[]>(`/articles/${articleid}/claims/${claimid}/reviews`);
  };

  static voteReview = (idReview: string, rating: number) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.post<number>(`/vote?id=${idReview}&type=REVIEW`, { rating }, { headers });
  };

  static addreview = (articleid: string, claimid: string, values: IReview) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.post<IReview>(`/articles/${articleid}/claims/${claimid}/reviews`, values, { headers });
  };

  static editreview = (articleId: string, claimId: string, reviewId: string, values: IReview) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.patch<IReview>(`/articles/${articleId}/claims/${claimId}/reviews/${reviewId}`, values, { headers });
  };

  static userReviews = (userid: string) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.get<IUserReview[]>(`/users/${userid}/reviews`, { headers });
  };
}
