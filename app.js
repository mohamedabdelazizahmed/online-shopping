const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require('./models/user');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/* create middleware find user when received  any request*/
app.use((req ,res ,next) => {
  User.findById("5e9089c957e1c824e8de6e15")
  .then((user) => {
    console.log('FINNED THE  DEMO FOR USER ');
    console.log(user);
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  console.log("mongoConnect");
  // not return client after create getdb function 
  // console.log(client);

  /* create new collection compass mongodb */

  app.listen(3000);
});
