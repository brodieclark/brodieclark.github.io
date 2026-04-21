/**
 * Dev-only: CRA webpack-dev-server does not always serve public/brld/index.html
 * for /brld/ (directory index). Serve the same file as production GitHub Pages.
 */
const path = require("path");
const fs = require("fs");

module.exports = function setupProxy(app) {
  const mapHtml = path.join(__dirname, "..", "public", "brld", "index.html");
  app.get(["/brld", "/brld/"], (_req, res) => {
    res.type("html").send(fs.readFileSync(mapHtml, "utf8"));
  });
};
