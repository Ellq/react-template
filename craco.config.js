/* eslint-disable */

const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/assets/scss/index.scss";
        `,
      },
    },
  },

  webpack: {
    plugins: [new StylelintPlugin({ fix: true })],
  },
};
