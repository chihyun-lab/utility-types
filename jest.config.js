module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      tsconfig: {
        target: "ES2020",
        module: "CommonJS",
        lib: ["ES2020"],
        types: ["jest"],
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        moduleResolution: "node",
        resolveJsonModule: true,
        allowSyntheticDefaultImports: true,
        noEmitOnError: true,
      },
    }],
  },
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  moduleFileExtensions: ["ts", "js", "json"],
  testTimeout: 10000,
};
