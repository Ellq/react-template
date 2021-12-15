/* eslint-disable */

const path = require("path");
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
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Api": path.resolve(__dirname, "src/api"),
      "@Img": path.resolve(__dirname, "src/assets/img"),
      "@Models": path.resolve(__dirname, "src/models"),
      "@Store": path.resolve(__dirname, "src/models"),
    },
  },
};
