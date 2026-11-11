const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
var favicon = require("serve-favicon");

const { solve24Game } = require("./solver");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
// Register Pug explicitly so serverless bundlers (Netlify Functions) include it.
app.engine("pug", require("pug").__express);
app.set("view engine", "pug");
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules", "bootstrap")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(favicon(path.join(__dirname, "assets", "favicon.ico")));

const emptyData = { solutions: [], w: "", x: "", y: "", z: "", seconds: 0, submitted: false };

app.get("/", (req, res) => {
  res.render("index", { title: "24 Game Solver", errors: [], data: emptyData });
});

const FIELDS = [
  ["w", "first"],
  ["x", "second"],
  ["y", "third"],
  ["z", "fourth"],
];

app.post(
  "/",
  FIELDS.map(([field, position]) =>
    check(field)
      .trim()
      .isInt({ min: 1, max: 13 })
      .withMessage(`Please fill the ${position} column with a whole number between 1 and 13`)
      .toInt()
  ),
  (req, res) => {
    const errors = validationResult(req);
    const { w, x, y, z } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        title: "24 Game Solver",
        errors: errors.array(),
        data: { ...emptyData, w, x, y, z },
      });
    }

    const start = Date.now();
    const solutions = solve24Game(w, x, y, z);
    const seconds = (Date.now() - start) / 1000;

    res.render("index", {
      title: "24 Game Solver: Solution(s)",
      errors: [],
      data: { solutions, w, x, y, z, seconds, submitted: true },
    });
  }
);

// Vercel imports the app; locally (and on Heroku-style hosts) we start the server.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`24 Game Solver app listening at http://localhost:${port}`);
  });
}

module.exports = app;
