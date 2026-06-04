# path-resolve

This is a small independent sub-app for practicing `path.resolve()`.

It shows how to build two absolute paths:

```text
config.reviewPath + Lesson_43
= lesson folder path

lesson folder path + Lesson_43_Notes.docx
= Word file path
```

The example writes a small real `.docx` file so the focus stays on the folder path and file path.

## Run

```bash
npm install
npm run build
npm start -- 43
```

Example output:

```text
Review folder: /.../AutoAnkiUpdate_Clone/sub-apps/path-resolve/review
Lesson folder: /.../AutoAnkiUpdate_Clone/sub-apps/path-resolve/review/Lesson_43
Word file: /.../AutoAnkiUpdate_Clone/sub-apps/path-resolve/review/Lesson_43/Lesson_43_Notes.docx
```
