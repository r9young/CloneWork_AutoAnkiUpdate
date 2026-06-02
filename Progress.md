# Current Project Status: Local Markdown/TXT to Anki Pipeline

So far, this app has the foundation for a **local Markdown/TXT to Anki pipeline**.

The app can already:

```text
read local Markdown/TXT files
scan folders and subfolders
hash file content
create SQLite tables
test database initialization
```

However, the full pipeline is not connected yet.

---

## 1. Current Main Files

### `config.ts`

This file defines the main app settings.

It tells the app where to read from and where to write data.

```text
watchDir       -> folder to scan
databasePath  -> SQLite database file
reviewPath    -> future review output
OpenAI/Anki settings
```

In simple terms, this file answers:

```text
Where should the app look, save, and connect?
```

---

### `scanner.ts`

This file scans the watch folder.

It can:

```text
find .md and .txt files
walk through subfolders
read file content
get modified time
create content hash
return ScannedFile[]
```

This part answers:

```text
What files currently exist, and what is their current content?
```

---

### `hash.ts`

This file creates hashes for text content.

It currently supports:

```text
sha256Text()
normalizeText()
makeDuplicateKey()
```

This helps the app:

```text
compare content
detect duplicate text
know whether content has changed
```

---

### `sqlite.ts`

This file provides a TypeScript wrapper around SQLite.

It has these main methods:

```text
exec() -> run raw SQL scripts
run()  -> change database data
all()  -> read many rows
get()  -> read one row
```

This file is the bridge between:

```text
TypeScript app <-> SQLite database
```

---

### `database.ts`

This file creates the database structure.

Currently, it has:

```ts
init()
```

The `init()` method creates these tables:

```text
documents
content_chunks
```

So this part answers:

```text
What tables does the app need?
```

---

### `database.test.ts`

This file tests whether `Database.init()` works correctly.

It creates a test database, runs `init()`, and checks that these tables exist:

```text
documents
content_chunks
```

So this test confirms:

```text
The database structure can be created successfully.
```

---

### `cli.ts`

This file currently only prints help text.

It exists, but it does not run the full app yet.

At this stage, it does not:

```text
start scanning
save files to database
generate cards
send cards to Anki
```

---

## 2. Current Pipeline State

The project currently has these working foundations:

```text
config exists
scanner can read files
hashing works
SQLite wrapper exists
database tables can be created
database init test works
```

So the app has the basic infrastructure, but the pieces are not fully connected yet.

---

## 3. What Is Not Done Yet

The following parts are still missing:

```text
database does not yet save scanned documents
app.ts is not connected
cli.ts does not start the pipeline
content is not split into chunks/cards
OpenAI card generation is not built
review output is not built
AnkiConnect sending is not built
```

In other words, the app can scan and prepare data, but it does not yet complete the full workflow.

---

## 4. Next Best Step

The next strongest step is still:

```text
Add Database.upsertDocument(file)
```

This will connect:

```text
scanner.ts -> database.ts
```

After this step, the app will be able to detect whether a scanned file is:

```text
new file
changed file
unchanged file
```

This is an important milestone because it turns the scanner from a file reader into part of a real database-backed pipeline.

---

## 5. Simple Pipeline View

The current direction of the app should look like this:

```text
config.ts
   ↓
scanner.ts
   ↓
database.ts
   ↓
content chunking
   ↓
OpenAI card generation
   ↓
review output
   ↓
AnkiConnect
```

Right now, the project is mainly at this stage:

```text
config.ts
   ↓
scanner.ts
   ↓
database.ts setup
```

The next step is to make `scanner.ts` save its results into the database through:

```text
Database.upsertDocument(file)
```
