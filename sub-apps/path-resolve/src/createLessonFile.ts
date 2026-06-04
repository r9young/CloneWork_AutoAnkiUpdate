import fs from "node:fs";
import path from "node:path";
import { Document, HeadingLevel, Packer, Paragraph } from "docx";
import { loadConfig } from "./config.js";

export type LessonFileResult = {
  reviewPath: string;
  lessonFolderPath: string;
  wordFilePath: string;
};

export async function createLessonFile(lessonNumber: string): Promise<LessonFileResult> {
  const config = loadConfig();

  const lessonFolderPath = path.resolve(
    config.reviewPath,
    `Lesson_${lessonNumber}`
  );

  fs.mkdirSync(lessonFolderPath, { recursive: true });

  const wordFilePath = path.resolve(
    lessonFolderPath,
    `Lesson_${lessonNumber}_Notes.docx`
  );

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: `Lesson ${lessonNumber}`,
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            text: "Vocabulary",
            heading: HeadingLevel.HEADING_2
          }),
          new Paragraph("Write vocabulary here..."),
          new Paragraph({
            text: "Key Grammar",
            heading: HeadingLevel.HEADING_2
          }),
          new Paragraph("Write key grammar here...")
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(wordFilePath, buffer);

  return {
    reviewPath: config.reviewPath,
    lessonFolderPath,
    wordFilePath
  };
}
