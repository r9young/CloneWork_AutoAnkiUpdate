export type Config = {
    watchDir: string;
    databasePath: string;
    reviewPath: string;
    openAiApiKey?: string;
    openAiModel: string;
    ankiConnectUrl: string;
    ankiDeck: string;
    ankiNoteType: string;
}
export type ScannedFile = {
    path: string; // "/Users/you/notes/lesson.md"
    modifiedAt: number; // 1710000000 modifiedAt is just the file’s last modified time.
    contentHash: string; // "b7f4c9a..."
    content: string; // "招待されたんです -> I was invited."
};
