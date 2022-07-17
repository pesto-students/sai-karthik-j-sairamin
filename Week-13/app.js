var express = require("express");
var path = require("path");
const logger = require("./middleware/logger");
const env = require("dotenv");
const { marked } = require("marked");
const fs = require("fs");

env.config({ path: "./config/config.env" });

const currentRouter = require("./routes/current");
const forecastRouter = require("./routes/forecast");

var app = express();

// view engine setup
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res, next) {
  var path = __dirname + "/API_DOCUMENTATION.md";
  console.log(path);
  var file = fs.readFileSync(path, "utf8");
  res.send(marked(file.toString()));
  // res.send("Welcome to FatCow Weather API Service");
});
app.use("/api/current", currentRouter);
app.use("/api/forecast", forecastRouter);

console.log("PORT NO: ", process.env.PORT);
app.listen(process.env.PORT, () => {
  console.info("Server is running on port ", process.env.PORT);
});

module.exports = app;
