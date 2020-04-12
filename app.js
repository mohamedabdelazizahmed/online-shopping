const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// import mongoose to connect to database
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://mohamedabdelaziz:01282434860m@node-complete-fced0.mongodb.net/shop-v2?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
      console.log("connect to mongodb via mongoose");
      console.log("http://localhost:3000");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
