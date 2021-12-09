const StylelintPlugin = require("stylelint-webpack-plugin")

module.exports = {
  webpack: {
    plugins: [new StylelintPlugin({ fix: true })]
  }
}
