import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        Idea_Menu: "Idea",
        "Submit Idea":"Submit Idea",
        "Search Idea":"Search Idea",
        Manage_Idea_Menu: "Manage Ideas",
        "Incoming Ideas": "Incoming Ideas",
        Idea_Verification_Menu: "Idea Verification",
        "Incoming Ideas": "Incoming Ideas",
        Acknowledgments_Menu: "Acknowledgments",
        "Incoming Acknowledgements": "Incoming Acknowledgements",
        Reports_Menu: "Reports",
        "Reports": "Reports",
        Administration_Menu: "Administration",
        "Administration": "Administration",
        History: "History",
        "History": "History"
      }
    },
    es: {
        translations: {
          Idea_Menu: "Idea",
          "Submit Idea":"Someter Idea",
          "Search Idea":"Buscar Idea",
          Manage_Idea_Menu: "Manejar Ideas",
          "Incoming Ideas": "Ideas Entrantes",
          Idea_Verification_Menu: "Verificar Ideas",
          "Incoming Ideas": "Ideas Entrantes",
          Acknowledgments_Menu: "Reconocimientos",
          "Incoming Acknowledgements": "Reconocimientos Entrantes",
          Reports_Menu: "Reportes",
          "Reports": "Reportes",
          Administration_Menu: "Administracion",
          "Administration": "Administracion",
          History: "Historia",
          "History": "Historia"
        }
      },
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;