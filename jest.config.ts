import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
};

export default config;
