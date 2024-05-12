/** @type {import("prettier").Config} */
module.exports = {
  importOrder: ["<BUILTIN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^@/(.*)$", "", "^[./]"],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  printWidth: 120,
};
