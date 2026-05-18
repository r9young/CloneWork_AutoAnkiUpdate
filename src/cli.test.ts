import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

import { getHelpText } from "./cli.js";
import { loadConfig } from "./config.js";

test("help text includes the command name", () => {
  assert.match(getHelpText(), /autoanki/);
});

test("loadConfig uses documented defaults", () => {
  const root = path.resolve("/tmp/autoanki-test");
  const config = withConfigEnv({}, () => loadConfig(root));

  assert.equal(config.watchDir, path.join(root, "documents"));
  assert.equal(config.databasePath, path.join(root, "autoanki.sqlite3"));
  assert.equal(config.reviewPath, path.join(root, "review.json"));
  assert.equal(config.openAiModel, "gpt-4.1-mini");
  assert.equal(config.ankiConnectUrl, "http://127.0.0.1:8765");
  assert.equal(config.ankiDeck, "AutoAnki");
  assert.equal(config.ankiNoteType, "Basic");
});

test("loadConfig respects environment overrides", () => {
  const root = path.resolve("/tmp/autoanki-test");
  const config = withConfigEnv(
    {
      AUTOANKI_WATCH_DIR: "notes",
      AUTOANKI_DB: "data/cards.sqlite3",
      AUTOANKI_REVIEW_PATH: "out/review.json",
      OPENAI_API_KEY: "test-key",
      OPENAI_MODEL: "custom-model",
      ANKI_CONNECT_URL: "http://localhost:9999",
      AUTOANKI_DECK: "Japanese",
      AUTOANKI_NOTE_TYPE: "Japanese Basic"
    },
    () => loadConfig(root)
  );

  assert.equal(config.watchDir, path.resolve("notes"));
  assert.equal(config.databasePath, path.resolve("data/cards.sqlite3"));
  assert.equal(config.reviewPath, path.resolve("out/review.json"));
  assert.equal(config.openAiApiKey, "test-key");
  assert.equal(config.openAiModel, "custom-model");
  assert.equal(config.ankiConnectUrl, "http://localhost:9999");
  assert.equal(config.ankiDeck, "Japanese");
  assert.equal(config.ankiNoteType, "Japanese Basic");
});

function withConfigEnv<T>(env: NodeJS.ProcessEnv, callback: () => T): T {
  const keys = [
    "AUTOANKI_WATCH_DIR",
    "AUTOANKI_DB",
    "AUTOANKI_REVIEW_PATH",
    "OPENAI_API_KEY",
    "OPENAI_MODEL",
    "ANKI_CONNECT_URL",
    "AUTOANKI_DECK",
    "AUTOANKI_NOTE_TYPE"
  ];
  const previous = new Map(keys.map((key) => [key, process.env[key]]));

  try {
    for (const key of keys) {
      delete process.env[key];
    }
    Object.assign(process.env, env);
    return callback();
  } finally {
    for (const key of keys) {
      const value = previous.get(key);
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}
