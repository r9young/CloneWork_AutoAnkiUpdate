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

import fs from "node:fs";
import { loadConfig } from "./config.ts";
import type { ScannedFile } from "./types.ts";
// import fg from "fast-glob"; // which is faster and simple way but same result as walk


const config = loadConfig();

export function scanFiles(watchDir = config.watchDir): ScannedFile[] {
   if (!fs.existsSync(watchDir)) {
      return [];
   }

   const result: ScannedFile[] = [];

   // go through a folder, and also go through every folder inside it, until you find all files
   for (const fileName of walk(watchDir)) {
      const filePath = `${watchDir}/${fileName}`;
   }

   return [];
}


function walk(dir: string): string[] { 
   return []
}