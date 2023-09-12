module.exports = {
    presets: [
        "@babel/preset-env",
        [
            "@babel/preset-typescript",
            {
                allExtensions: true,
            },
        ],
    ],
    // plugins: ["@babel/plugin-syntax-dynamic-import"],
};
