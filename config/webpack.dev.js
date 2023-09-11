/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require("./webpack.base.js");
const { merge } = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = merge(baseConfig, {
  mode: "development",
  target: "web",
  devServer: {
    hot: true,
    open: true,
    client: {
      overlay: false,
    },
  },
  devtool: false,//eval-cheap-module-source-map
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new ESLintPlugin({ extensions: ["js", "ts", "vue"] }),
  ],
});
