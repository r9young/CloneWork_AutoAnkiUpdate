import { createLessonFile } from "./createLessonFile.js";

const lessonNumber = process.argv[2] ?? "43";
const result = await createLessonFile(lessonNumber);

console.log("Review folder:", result.reviewPath);
console.log("Lesson folder:", result.lessonFolderPath);
console.log("Word file:", result.wordFilePath);
