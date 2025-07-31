module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/.github/claude/tests/test-setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/Incident-Report/src/$1',
  },
  testMatch: [
    '<rootDir>/.github/claude/tests/**/*.test.{js,jsx,ts,tsx}',
  ],
  collectCoverageFrom: [
    'Incident-Report/src/**/*.{js,jsx,ts,tsx}',
    '!Incident-Report/src/**/*.d.ts',
    '!Incident-Report/src/main.tsx',
    '!Incident-Report/src/vite-env.d.ts',
    '!Incident-Report/src/polyfills.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};