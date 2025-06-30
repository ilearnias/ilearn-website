import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./languages/english.json";
import ar from "./languages/arabic.json";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Add language detection only on the client side
if (typeof window !== "undefined") {
  i18n.use(LanguageDetector);
  const storedLang = localStorage.getItem("i18nextLng");
  if (storedLang) {
    i18n.changeLanguage(storedLang);
  }
}

export default i18n;
