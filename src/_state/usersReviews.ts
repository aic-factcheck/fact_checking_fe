import { atom } from 'recoil';
import { IReview } from '../common/types';

const myReviews = atom({
  key: 'myReviews',
  default: [] as IReview[],
});

export default myReviews;
