#!/usr/bin/env node
import { loadConfig } from "./config.ts";

import { fileURLToPath } from "node:url";

export function getHelpText(): string {
  return [
    "autoanki",
    "",
    "Local-first Markdown/TXT to Anki flashcard pipeline.",
    "",
    "Usage:",
    "  autoanki --help"
  ].join("\n");
}

export function main(args = process.argv.slice(2)): void {
  if (args.includes("--help") || args.includes("-h")) {
    console.log(getHelpText());
    return;
  }

  console.log(getHelpText());
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
