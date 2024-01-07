// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationFI from './locales/fi/translation.json';

// the translations
const resources = {
    en: {
        translation: translationEN,
    },
    fi: {
        translation: translationFI,
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en', // language to use
        fallbackLng: 'en', // use en if detected lng is not available

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

// In your i18n.ts

// const browserLanguage = navigator.language.includes('fi') ? 'fi' : 'en';

// i18n
//     .use(initReactI18next)
//     .init({
//         // ... other i18n config
//         lng: browserLanguage,
//         fallbackLng: 'en',
//         // ...
//     });

export default i18n;
