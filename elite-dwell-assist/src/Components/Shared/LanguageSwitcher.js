import React, { useEffect } from "react";

const LanguageSwitcher = () => {
  useEffect(() => {
    function googleTranslateElementInit() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "bn,en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    }
    googleTranslateElementInit();
  }, []);

  // return <button id="google_translate_element"></button>;
  return <div id="google_translate_element"></div>;
};

export default LanguageSwitcher;
