const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const hbs = require("hbs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 10000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", viewPath);
app.use(express.static(publicPath));

app.use("/", require("../router/userRouter"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
