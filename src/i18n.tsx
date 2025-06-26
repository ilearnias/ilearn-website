import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./languages/english.json";
import ar from "./languages/arabic.json";

if (typeof window !== "undefined") {
  const selectedLanguage = localStorage.getItem("i18nextLng") || "en";
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: en,
        },
        ar: {
          translation: ar,
        },
      },
      fallbackLng: "en",
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator"],
      },
      lng: selectedLanguage,
    });
}

export default i18n;
