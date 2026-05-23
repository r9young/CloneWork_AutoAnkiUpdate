import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { Database } from "./database.js";
import { Sqlite } from "./sqlite.js";

test("Database.init creates required tables", (t) => {
  const root = fs.mkdtempSync(path.resolve(".tmp-db-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));

  const databasePath = path.join(root, "autoanki.sqlite3");
  const sqlite = new Sqlite(databasePath);
  const database = new Database(sqlite);

  database.init();

  const tables = sqlite
    .all("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
    .map((row) => String(row.name));

  assert.ok(tables.includes("documents"));
  assert.ok(tables.includes("content_chunks"));
});
