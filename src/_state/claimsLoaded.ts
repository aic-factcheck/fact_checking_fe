import { atom } from 'recoil';

const claimsLoaded = atom({
  key: 'claimsLoaded',
  default: false,
});

export default claimsLoaded;