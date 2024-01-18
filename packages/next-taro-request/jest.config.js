// https://jestjs.io/docs/en/configuration
module.exports = {
  verbose: true,
  testRegex: [/\.spec.js/],
  //preset: "jest-puppeteer",
  automock: false,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
