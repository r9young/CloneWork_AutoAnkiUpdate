/*
 * watch folder
 *    ↓
 * scanner
 *    ↓
 * [
 *   current snapshot of lesson.md,
 *   current snapshot of grammar.txt
 * ]
 *    ↓
 * app/database compare this snapshot with previous snapshot
 */

import { loadConfig } from "./config.ts";
import type { ScannedFile } from "./types.ts";

const config = loadConfig();

export function scanFiles(watchDir = config.watchDir): ScannedFile[] {
   if (!watchDir) {
      throw new Error("watchDir is not defined in config");
   }
}

