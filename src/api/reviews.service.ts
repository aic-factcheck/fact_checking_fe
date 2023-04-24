/* eslint-disable arrow-body-style */
import { factCheckBe } from '../http_common';
import { IReview } from '../common/types';

export default class ReviewsService {
  static getReviews = (articleid: string, claimid: string) => {
    return factCheckBe.get<IReview[]>(`/articles/${articleid}/claims/${claimid}/reviews`);
  };

  static voteReview = (idReview: string, rating: number) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.post<number>(`/vote?reviewId=${idReview}`, { rating }, { headers });
  };

  static addreview = (articleid: string, claimid: string, values: IReview) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
    return factCheckBe.post<IReview>(`/articles/${articleid}/claims/${claimid}/reviews`, values, { headers });
  };
}
