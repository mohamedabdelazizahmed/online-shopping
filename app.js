const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// import mongoose to connect to database
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5e93673dd9bf1e342cd08770")
    .then((user) => {
      console.log("FETCH THE USER FOR USER");
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
//auth routes
app.use(authRoutes);


app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://mohamedabdelaziz:01282434860m@node-complete-fced0.mongodb.net/shop-v2?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log("... Connect To Mongodb via Mongoose ...");
    console.log("http://localhost:3000");
    /** Create User*/
    User.findOne().then((user) => {
      if (!user) {
        console.log("... Create User Demo ...");
        const user = new User({
          name: "Mohamed",
          email: "zizo@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
