import { atom } from 'recoil';

const hotClaimsPage = atom({
  key: 'hotClaimsPage',
  default: 1 as number,
});

export default hotClaimsPage;
