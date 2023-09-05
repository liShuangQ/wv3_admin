/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const devMode = process.env.NODE_ENV !== "production";
module.exports = {
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset",
        generator: {
          filename: "images/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(eot|svg|ttf|woff2?|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: devMode
          ? ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
          : [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "wv3",
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".vue"], // 改变引入文件， 可以不写后缀名
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  cache: {
    type: "filesystem",
  },
};
