/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
    },
    testPathIgnorePatterns: [
      '<rootDir>/.next/',
      '<rootDir>/node_modules/'
    ]
  };