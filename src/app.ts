import { scanFiles } from "./scanner.js";
import { Config } from "./types.ts";

export function scan(db: Database, config: Config): { files: number; chunks: number; ambiguous: number } {
      const files = scanFiles(config.watchDir);

      for (const file of files) {
        const document = db.upsertDocument(file);
            if (document.status === "unchanged") {
            continue;
        }


      }

}