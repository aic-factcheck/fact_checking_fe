import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './locales/en/translation.json';
import translationCzech from './locales/cz/translation.json';
import translationSlovak from './locales/sk/translation.json';

const resources = {
  en: {
    translation: translationEnglish,
  },
  cz: {
    translation: translationCzech,
  },
  sk: {
    translation: translationSlovak,
  },
};

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    returnNull: false,
  });

export default i18next;
