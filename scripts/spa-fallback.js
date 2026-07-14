/**
 * Static hosts often fail to rewrite SPA routes to index.html.
 * Copy index.html into each client route folder so /admin, /about, etc. load the app.
 */
const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const indexPath = path.join(buildDir, "index.html");

const routes = ["admin", "about", "project", "experience", "resume"];

if (!fs.existsSync(indexPath)) {
  console.error("spa-fallback: build/index.html not found. Run react-scripts build first.");
  process.exit(1);
}

const html = fs.readFileSync(indexPath);

for (const route of routes) {
  const dir = path.join(buildDir, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log(`spa-fallback: wrote ${route}/index.html`);
}
