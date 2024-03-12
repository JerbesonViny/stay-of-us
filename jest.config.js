const config = {
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coveragePathIgnorePatterns: ["types.ts", "index.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  moduleNameMapper: {
    "@/tests/(.+)": "<rootDir>/tests/$1",
    "@/(.+)": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["js", "ts", "json"],
  testRegex: [".unit-spec.ts$", ".integration-spec.ts$", ".e2e-spec.ts$"],
  roots: ["<rootDir>/tests"],
  testEnvironment: "jest-environment-node",
  transform: {
    "\\.ts$": "ts-jest",
  },
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 72,
      lines: 90,
      statements: 90,
    },
  },
};

module.exports = config;
