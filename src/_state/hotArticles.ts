import { atom } from 'recoil';
import { IArticle } from '../common/types';

const hotArticles = atom({
  key: 'hotArticles',
  default: [] as IArticle[],
});

export default hotArticles;
