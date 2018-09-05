/* global Prism */
import escapeHtml from "escape-html";

function wrap(code, lang) {
  if (lang === "text") {
    code = escapeHtml(code);
  }
  return `<code>${code}</code>`;
}

export default (str, lang) => {
  if (!lang) {
    return wrap(str, "text");
  }
  lang = lang.toLowerCase();
  const rawLang = lang;
  if (lang === "vue" || lang === "html") {
    lang = "markup";
  }
  if (lang === "md") {
    lang = "markdown";
  }
  if (lang === "ts") {
    lang = "typescript";
  }
  if (Prism.languages[lang]) {
    const code = Prism.highlight(str, Prism.languages[lang], lang);
    return wrap(code, rawLang);
  }
  return wrap(str, "text");
};
