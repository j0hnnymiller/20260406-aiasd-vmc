const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const ROOT_DIR = __dirname;
const PORT = 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname;
  try {
    pathname = decodeURIComponent(parsedUrl.pathname === "/" ? "/index.html" : parsedUrl.pathname);
  } catch {
    res.writeHead(400);
    res.end("Bad Request");
    return;
  }

  // Resolve the absolute path and ensure it stays within ROOT_DIR
  const filePath = path.resolve(ROOT_DIR, pathname.replace(/^\//, ""));
  const relative = path.relative(ROOT_DIR, filePath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  const ext = path.extname(filePath);
  if (!Object.prototype.hasOwnProperty.call(MIME_TYPES, ext)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }

    res.setHeader("Content-Type", MIME_TYPES[ext]);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end("File not found");
      } else {
        res.writeHead(200);
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
