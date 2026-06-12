"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { TRANSLATIONS } from "./i18n";

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  tr: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("cyp_lang");
    if (saved && TRANSLATIONS[saved]) setLang(saved);
  }, []);

  const updateLang = (l) => {
    setLang(l);
    window.localStorage.setItem("cyp_lang", l);
  };

  const tr = (key) => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return dict[key] ?? TRANSLATIONS.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: updateLang, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
