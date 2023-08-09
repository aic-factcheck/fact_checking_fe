import { atom } from 'recoil';

const reviewsLoaded = atom({
  key: 'reviewsLoaded',
  default: false,
});

export default reviewsLoaded;
