import { atom } from 'recoil';
import { IArticle } from '../common/types';

const myArticles = atom({
  key: 'myArticles',
  default: [] as IArticle[],
});

export default myArticles;
