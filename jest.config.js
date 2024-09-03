module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testMatch: ["**/tests/unit/**/*.spec.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
};
