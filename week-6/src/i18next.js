import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "tr",
    lng: "tr",
    resources: {
        en: {
            translation: require("./constants/language/en.json"),
        },
        tr: {
            translation: require("./constants/language/tr.json"),
        },
        fr: {
            translation: require("./constants/language/fr.json"),
        },
    },
    ns: ["translation"],
    defaultNS: "translation",
});

i18n.languages = ["en", "tr", "fr"];

export const languages = [
    { name: "English", code: "en" },
    { name: "Turkish", code: "tr" },
    { name: "French", code: "fr" },
];

export default i18n;
