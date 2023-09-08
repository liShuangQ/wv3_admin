/* eslint-disable @typescript-eslint/no-var-requires */
const devMode = process.env.NODE_ENV !== "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const AutoImport = require('unplugin-auto-import/webpack')
const AutoComponents = require('unplugin-vue-components/webpack')
const webpack = require("webpack");

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
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new HtmlWebpackPlugin({
            title: "wv3",
            template: "./index.html",
        }),
        new VueLoaderPlugin(),
        AutoImport({
            imports: ["vue", "vue-router"],
            dts: "types/auto-imports.d.ts",
        }),
        AutoComponents({
            resolvers: [],
            dts: 'types/components.d.ts'
        })
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
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: devMode ? '/' : '/wv3/'
    }
};
