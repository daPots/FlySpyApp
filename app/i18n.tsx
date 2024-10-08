import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from 'expo-localization'

import en from "../locales/en.json";
import zh from "../locales/zh.json";

const resources = {
  en: {translation: en},
  zh: {translation: zh}
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;