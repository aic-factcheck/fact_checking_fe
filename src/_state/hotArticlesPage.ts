import { atom } from 'recoil';

const hotArticlesPage = atom({
  key: 'hotArticlesPage',
  default: 1 as number,
});

export default hotArticlesPage;
