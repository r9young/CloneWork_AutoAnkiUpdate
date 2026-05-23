/*
 * watch folder
 *    ↓
 * scanner each folder and subfolder to find all .md and .txt files
 *    ↓
 * create a hash for each file content, and store the file path, modified time, and hash in an array of objects
 *    ↓
 * return the array of objects to the main process
 */

import fs from "node:fs";
import { loadConfig } from "./config.ts";
import type { ScannedFile } from "./types.ts";
import path from "node:path";
import { sha256Text } from "./hash.ts";
// import fg from "fast-glob"; // which is faster and simple way but same result as walk


const config = loadConfig();


const SUPPORTED_EXTENSIONS = new Set([".md", ".txt"]);

export function scanFiles(watchDir = config.watchDir): ScannedFile[] {
  if (!fs.existsSync(watchDir)) {
    return [];
  }

  const results: ScannedFile[] = [];
  for (const filePath of walk(watchDir)) {
    if (!SUPPORTED_EXTENSIONS.has(path.extname(filePath).toLowerCase())) { // check the extension of the file, if it's not .md or .txt, skip it
      continue;
    }
    const content = fs.readFileSync(filePath, "utf8");
    const stat = fs.statSync(filePath);
    results.push({
      path: path.resolve(filePath),
      modifiedAt: stat.mtimeMs / 1000,
      contentHash: sha256Text(content), // The app reads the text inside the file, then creates a hash from that text.
      content
    });
  }
  return results.sort((a, b) => a.path.localeCompare(b.path));
}


// walk function that goes through a folder, and also goes through every folder inside it, until you find all files
// it should return an array of file paths
function walk(dir: string): string[] { 
   const entries = fs.readdirSync(dir, { withFileTypes: true });
   const output: string[] = [];
   for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
         output.push(...walk(fullPath));
      } else if (entry.isFile()) {
         output.push(fullPath);
      }
   }
   return output; // it should return an array of file paths, like:
   // [
   //    "watch/lesson.md",
   //    "watch/grammar/grammar.txt",
   //    "watch/vocab/vocab.txt"
   // ]
}
