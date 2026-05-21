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

import type { ScannedFile } from "./types.ts";



function scanFiles(watchDir: string): ScannedFile[] {
   // scan folder
   return [];
}
