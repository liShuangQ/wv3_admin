module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        "vue/setup-compiler-macros": true,
    },
    parser: "vue-eslint-parser",
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        // "standard-with-typescript",
        "plugin:@typescript-eslint/recommended",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        parser: "@typescript-eslint/parser",
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {
        indent: ["error", 4],
        "complexity": ["error", {"max": 20}],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": "off",
        quotes: "off",
        semi: "off",
        "comma-dangle": "off",
        "no-undef": "off",
        "prefer-const": "off",
        "vue/multi-word-component-names": "off",
        "no-async-promise-executor": "off",
        "no-debugger": "off",
        eqeqeq: "error",
        "default-case": "error",
        "no-useless-escape": "off",
        "vue/singleline-html-element-content-newline": "off",
        "vue/multiline-html-element-content-newline": "off",
        "vue/html-self-closing": "off",
        "no-unused-vars": "off",
        "vue/attributes-order": "off",
        "vue/max-attributes-per-line": "off",
        "vue/valid-v-slot": "off",
        "@typescript-eslint/no-unused-vars": "off",
    },
};
