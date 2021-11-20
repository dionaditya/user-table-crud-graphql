module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleDirectories: ["node_modules", "src"]
};