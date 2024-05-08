// https://jestjs.io/docs/en/configuration
export default {
  verbose: true,
  // use jsdom env
  // testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testRegex: [/\.spec.ts/],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  }
};
