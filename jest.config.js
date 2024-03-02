const config = {
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  moduleNameMapper: {
    "@/tests/(.+)": "<rootDir>/tests/$1",
    "@/(.+)": "<rootDir>/src/$1",
  },
  roots: ["<rootDir>/tests"],
  testEnvironment: "jest-environment-node",
  transform: {
    "\\.ts$": "ts-jest",
  },
};

module.exports = config;
