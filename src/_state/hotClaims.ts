import { atom } from 'recoil';
import { IClaim } from '../common/types';

const hotClaims = atom({
  key: 'hotClaims',
  default: [] as IClaim[],
});

export default hotClaims;
