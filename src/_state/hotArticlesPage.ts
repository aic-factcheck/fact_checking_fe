import { atom } from 'recoil';

const hotArticlesPage = atom({
  key: 'hotClaimsPage',
  default: 1 as number,
});

export default hotArticlesPage;
