const commonConfig = require('./jest.config');

module.exports = {
  ...commonConfig,
  testMatch: [
    '**/*.unit.test.{js,ts}'
  ],
  collectCoverageFrom: [
    '**/db/**/*.js',
    '**/libs/**/*.js',
    '**/middlewares/**/*.js',
    '**/routes/**/*.js',
    '**/services/**/*.js',
    '**/utils/**/*.js'
  ],
  coverageDirectory: 'coverage/unit'
};
