module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "prismjs",
      {
        languages: ["javascript", "css", "markup", "typescript", "markdown"],
        plugins: [""],
        theme: "tomorrow",
        css: true
      }
    ]
  ]
};
