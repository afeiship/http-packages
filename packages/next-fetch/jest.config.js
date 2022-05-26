// https://jestjs.io/docs/en/configuration
module.exports = {
  cache: false,
  verbose: true,
  testRegex: [/\.spec.js/],
  //preset: "jest-puppeteer",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
