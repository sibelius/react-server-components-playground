module.exports = {
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx', 'json'],
  transform: {
    '^.testEv+\\.(js|ts|tsx)?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom-sixteen',
  testRegex: '/__tests__/[^/]*(\\.ts|\\.coffee|[^d]\\.ts)$',
};
