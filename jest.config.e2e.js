const commonConfig = require('./jest.config');

module.exports = {
  ...commonConfig,
  testMatch: [
    '**/*.e2e.test.{js,ts}'
  ],
  collectCoverageFrom: [
    '**/db/**/*.js',
    '**/libs/**/*.js',
    '**/middlewares/**/*.js',
    '**/routes/**/*.js',
    '**/services/**/*.js',
    '**/utils/**/*.js'
  ],
  coverageDirectory: 'coverage/e2e'
};
