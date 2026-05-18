import path from "node:path";
import type { Config } from "./types.ts";

/*
 * cwd means "current working directory".
 *
 * If no cwd is provided, use the current folder.
 * This function must return a Config object, which is defined in types.ts.
 *
 * Everything inside return { ... } is the actual returned Config object.
 * So it will return with Config {...} and the properties inside it.
 *
 * The properties of the Config object are defined in types.ts, and they are:
 */

export function loadConfig(cwd = process.cwd()): Config {
    const watchDir = path.resolve(cwd, "watch"); // resolve() turns path pieces into one absolute path.
    const databasePath = path.resolve(cwd, "database.db");
    const reviewPath = path.resolve(cwd, "review");
    const openAiApiKey = process.env.OPENAI_API_KEY;
    const openAiModel = "gpt-4";
    const ankiConnectUrl = "http://localhost:8765";
    const ankiDeck = "Default";
    const ankiNoteType = "Basic";

    return {
        watchDir,
        databasePath,
        reviewPath,
        openAiApiKey,
        openAiModel,
        ankiConnectUrl,
        ankiDeck,
        ankiNoteType
    };
    
}