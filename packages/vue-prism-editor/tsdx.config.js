/* eslint-disable @typescript-eslint/no-var-requires */
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const nested = require('postcss-nested');
const path = require('path');

module.exports = {
  /**
   * @param {import('rollup/dist/rollup').InputOptions} config
   */
  rollup(config, options) {
    if (options.format === 'umd') {
      // https://github.com/koca/vue-prism-editor/issues/86
      config.output.intro = 'var global = typeof self !== undefined ? self : this;';
      // auto register prism editor component
      config.output.outro = `let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.component("PrismEditor", PrismEditor)
}`;
    }

    config.plugins.push(
      postcss({
        plugins: [
          nested(),
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ].filter(Boolean),
        // only write out CSS for the first bundle (avoids pointless extra files):
        inject: false,
        extract: path.resolve('dist/prismeditor.min.css'),
      })
    );
    return config;
  },
};
