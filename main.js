const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
var favicon = require("serve-favicon");

const { solve24Game } = require("./solver");

const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "bower_components")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(favicon(path.join(__dirname, "assets", "favicon.ico")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "24 Game Solver",
    errors: [],
    data: {
      solutions: [],
      w: "",
      x: "",
      y: "",
      z: "",
      seconds: 0,
    },
  });
});

app.post(
  "/",
  [
    check("w")
      .isNumeric()
      .withMessage("Please fill the first column with number between 1 to 13")
      .isLength({ min: 1 })
      .withMessage("Please fill the first column with number between 1 to 13"),
    check("x")
      .isNumeric()
      .withMessage("Please fill the first column with number between 1 to 13")
      .isLength({ min: 1 })
      .withMessage("Please fill the second column with number between 1 to 13"),
    check("y")
      .isNumeric()
      .withMessage("Please fill the first column with number between 1 to 13")
      .isLength({ min: 1 })
      .withMessage("Please fill the third column with number between 1 to 13"),
    check("z")
      .isNumeric()
      .withMessage("Please fill the first column with number between 1 to 13")
      .isLength({ min: 1 })
      .withMessage("Please fill the fourth column with number between 1 to 13"),
  ],
  (req, res) => {
    const start = Date.now();
    const errors = validationResult(req);
    const solutions = solve24Game(
      req.body.w,
      req.body.x,
      req.body.y,
      req.body.z
    );
    const stop = Date.now();
    res.render("index", {
      title: "24 Game Solver: Result",
      errors: errors.array(),
      data: {
        solutions: solutions,
        w: req.body.w,
        x: req.body.x,
        y: req.body.y,
        z: req.body.z,
        seconds: (stop - start) / 1000,
      },
    });
  }
);

app.listen(port, () => {
  console.log(`24Game Solver app listening at http://localhost:${port}`);
});
