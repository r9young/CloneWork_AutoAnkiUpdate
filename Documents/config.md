## Which library does process.cwd() come from, and why does it know my local directory?

Process is a built-in global object in Node.js. You might ask where is the Node.js coming from? Let's review the followings: 


The start point is config.json

```typescript

{
  "scripts": {
    "dev": "tsx src/index.ts",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "sqlite3": "^5.1.7"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tsx": "^4.0.0"
  }
}

```

It means:

1. This project uses npm.
2. This project can run Node commands.
3. This project has Node Packages.
4. This project has scripts like npm run dev.

Of Course, the Node.js must be installed on your computer.

process is not a method, it is a build-in global object in Node.js. For you to better understand, you might review the reference of: `https://nodejs.org/api/process.html?utm_source=chatgpt.com`

process = Node.js global object
cwd() = method
process.cwd() = call the cwd method from the process object.


---

## What does cwd = process.cwd() mean?

```typescript

export function loadConfig(cwd = process.cwd()): Config { ... }

```

process.cwd() means the current working directory, usually the folder where you run the command in the terminal.

so think about where do you run the command in the terminal. it would be under my-app/ NOT my-app/src

```doc

my-app/
  src/
    config.ts
  watch/
  database.db
  review/
  package.json

```

so if you ask what is the actual value of cwd in loadConfig(cwd = process.cwd())? The actual value of cwd is the string path. e.g `cwd = "/Users/maomao/my-app"`

In fact, it means `export function loadConfig(cwd = "/Users/maomao/my-app")``.


## What does `const watchDir = path.resolve(cwd, "watch");` mean?

Firstly you need to you understand what is path.resolve(...).

Ref: `https://nodejs.org/api/path.html#pathresolvepaths`

For example,

```typescript
path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// Returns: '/tmp/file'

```

so based on two examples above:

There are two findings:

Example 1:  `const watchDir = path.resolve(cwd, "watch")` can also be code as: `const watchDir = path.resolve(cwd, "./watch")`.They are basically the same here.

Example 2: it will only return `/tmp/file` because '/tmp/file/' starts with /, so it is already an absolute path.In path.resolve(), when Node sees an absolute path later in the arguments, it basically says:

path.resolve() is a Node.js built-in function from the path module

```typescript
const cwd = "/Users/maomao/my-app";
const watchDir = path.resolve(cwd, "watch");
```

Result would be: /Users/maomao/my-app/watch

## What does the function loadConfig return?

it will return an object. but you might ask why it is an object? Because of the curly brace { } after return:

```typescript

return {
    watchDir,
    databasePath,
    reviewPath,
    openAiApiKey,
    openAiModel,
    ankiConnectUrl,
    ankiDeck,
    ankiNoteType
}

```

Also, Typescript gives another clue here:

  `export function loadConfig(cwd = process.cwd()): Config`

The : Config means: This function should return something with the Config shape. Config is an object type, it looks like the following and you can find it in the type.ts.

```typescript

type Config = {
  watchDir: string;
  databasePath: string;
  reviewPath: string;
  openAiApiKey: string | undefined;
  openAiModel: string;
  ankiConnectUrl: string;
  ankiDeck: string;
  ankiNoteType: string;
};

```

## What would be the final return ?

```typescript

return {
  watchDir: "/Users/yang/Documents/AutoAnkiUpdate_Clone/watch",
  databasePath: "/Users/yang/Documents/AutoAnkiUpdate_Clone/database.db",
  reviewPath: "/Users/yang/Documents/AutoAnkiUpdate_Clone/review",
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiModel: "gpt-4",
  ankiConnectUrl: "http://localhost:8765",
  ankiDeck: "Default",
  ankiNoteType: "Basic"
};

```

## Why we created the path-resolve sub-app

To make `path.resolve()` easier to understand, we created a small independent app at `sub-apps/path-resolve`. This app is only for learning and practice. It shows the same idea from `config.ts` in a simpler example: first use `path.resolve()` to create a lesson folder path, then use `path.resolve()` again to create the Word file path inside that folder. This helps us see that `path.resolve()` is not creating the folder by itself; it is only building the full absolute path string. The actual folder and file are created afterward by `fs.mkdirSync()` and `fs.writeFileSync()`.
