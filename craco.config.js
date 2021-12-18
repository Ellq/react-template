/* eslint-disable */

const path = require("path");
const StylelintPlugin = require("stylelint-webpack-plugin");
const CracoAlias = require("craco-alias");

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

  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],

  webpack: {
    plugins: [new StylelintPlugin({ fix: true })],
  },
};
