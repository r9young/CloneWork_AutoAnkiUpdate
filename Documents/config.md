## Which library does process.cwd() come from, and why does it know my local directory?

Process is a built-in global object in Node.js. You might ask where is the Node.js coming from? Let's review the followings: 


The start point is config.json

```

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






