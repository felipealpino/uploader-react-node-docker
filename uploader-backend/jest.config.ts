module.exports = {
  preset: 'ts-jest',
  // Stop running tests after `n` failures
  bail: true,

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/tests/**/*.test.ts?(x)'],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The test environment that will be used for testing
  testEnvironment: 'node',
};
