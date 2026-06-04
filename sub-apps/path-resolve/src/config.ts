import path from "node:path";

export type Config = {
  reviewPath: string;
};

export function loadConfig(cwd = process.cwd()): Config {
  return {
    reviewPath: path.resolve(cwd, "review")
  };
}
