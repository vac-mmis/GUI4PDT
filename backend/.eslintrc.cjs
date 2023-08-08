/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: ["prettier", "eslint:recommended"],
    parserOptions: {
        ecmaVersion: "latest",
    },
};
