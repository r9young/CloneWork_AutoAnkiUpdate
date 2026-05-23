// Sqlite
//   knows HOW to run SQL

// It should do 3 basic things:
    // Remember where the database file is.
    // Make sure the folder for the database exists.
    // Provide methods to run SQL.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";


export type SqlValue = string | number | null;
export type SqlRow = Record<string, unknown>;

export class Sqlite {
  constructor(private readonly databasePath: string) {
    fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  }

  exec(sql: string): void {
    execFileSync("sqlite3", ["-batch", "-bail", this.databasePath, sql], {
      encoding: "utf8"
    });
  }

  run(sql: string, params: SqlValue[] = []): void {
    this.exec(this.interpolate(sql, params));
  }

  all<T extends SqlRow>(sql: string, params: SqlValue[] = []): T[] {
    const output = execFileSync(
      "sqlite3",
      ["-batch", "-json", this.databasePath, this.interpolate(sql, params)],
      { encoding: "utf8" }
    ).trim();
    if (!output) {
      return [];
    }
    return JSON.parse(output) as T[];
  }

  get<T extends SqlRow>(sql: string, params: SqlValue[] = []): T | undefined {
    return this.all<T>(`${sql} LIMIT 1`, params)[0];
  }

  private interpolate(sql: string, params: SqlValue[]): string {
    let index = 0;
    return sql.replace(/\?/g, () => {
      if (index >= params.length) {
        throw new Error("Missing SQL parameter");
      }
      return quoteSql(params[index++]);
    });
  }
}

function quoteSql(value: SqlValue): string {
  if (value === null) {
    return "NULL";
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : "NULL";
  }
  return `'${value.replace(/'/g, "''")}'`;
}

