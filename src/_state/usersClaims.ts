import { atom } from 'recoil';
import { IClaim } from '../common/types';

const myClaims = atom({
  key: 'myClaims',
  default: [] as IClaim[],
});

export default myClaims;
