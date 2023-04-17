import { atom } from 'recoil';

const articlesLoaded = atom({
  key: 'articlesLoaded',
  default: false,
});

export default articlesLoaded;