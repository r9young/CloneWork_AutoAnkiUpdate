
import type { Sqlite } from "./sqlite.ts";

export class Database {
  constructor(private readonly sqlite: Sqlite) {}
    // Sqlite is here, as Database should not directly know how to talk to SQLite.
    //   Sqlite know:
    //     1. Where the database file is
    //     2. How to send SQL to SQLite
    //     3. How to return results later

  init(): void {
    this.sqlite.exec(`
      CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT NOT NULL UNIQUE,
        modified_at REAL NOT NULL,
        content_hash TEXT NOT NULL,
        last_processed_hash TEXT,
        last_processed_at REAL,
        last_content TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        created_at REAL NOT NULL,
        updated_at REAL NOT NULL
      );

      CREATE TABLE IF NOT EXISTS content_chunks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        document_id INTEGER NOT NULL REFERENCES documents(id),
        chunk_hash TEXT NOT NULL UNIQUE,
        text TEXT NOT NULL,
        line_start INTEGER,
        line_end INTEGER,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at REAL NOT NULL
      );
    `);
  }

  
}

// database.ts
//   decides what SQL to run

// sqlite.ts
//   runs that SQL using sqlite3
