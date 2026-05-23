import { createHash } from "node:crypto";

export function sha256Text(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function normalizeText(value: string): string {
  return value.toLocaleLowerCase().replace(/\s+/g, " ").trim();
}

export function makeDuplicateKey(front: string, back: string, grammarPoint = ""): string {
  return sha256Text(normalizeText(`${front}\n${grammarPoint || back}`));
}

