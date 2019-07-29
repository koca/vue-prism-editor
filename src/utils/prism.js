/* global Prism */
import escapeHtml from "escape-html";

function wrap(code, lang, langPrism) {
  if (lang === "text") {
    code = escapeHtml(code);
  }
  return `<code class="language-${langPrism}">${code}</code>`;
}

export default (str, lang) => {
  if (!lang) {
    return wrap(str, "text", "text");
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
    return wrap(code, rawLang, lang);
  }
  return wrap(str, "text", "text");
};
