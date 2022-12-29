import { atom } from 'recoil';

const myArticles = atom({
  key: 'myArticles',
  default: null,
});

export default myArticles;
