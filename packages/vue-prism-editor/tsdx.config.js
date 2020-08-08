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
  rollup(config) {
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
