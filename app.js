const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// import mongoose to connect to database
const mongoose = require("mongoose");
//initialize session when app is running "npm install --save express-session"
const session = require("express-session");
// to store session in mongodb using package "npm install --save connect-mongodb-session"
const MongoDBStore = require("connect-mongodb-session")(session);
// npm install --save csurf
const csrf = require('csurf');

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://mohamedabdelaziz:01282434860m@node-complete-fced0.mongodb.net/shop-v2?retryWrites=true&w=majority";

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection  = csrf();
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// secret =>should be long txt , resave => mean session not save for every request
// saveUninitialized => ensure that no session  save for request
// cookie :{expires} you can configure it 
// Middleware set automatically cookie  for you
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);


/**
 *  Mongoose fetch full user object no data in database 
 * resolve the user data in session not full user object like mongoose
 */
app.use((req, res, next) => {
  // resolve when logout  for every request "req.session.user._id NOT FOUND"
  if (!req.session.user) {
    return next();
  }
  // get user based the data store user in session
  User.findById(req.session.user._id)
    .then(user => { 
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

/**
 *  data included for every view render
 */
app.use((req ,res , next) => {
  //locals it's allow  special field in response
  res.locals.isAuthenticated = req.session.isLoggedIn ,
  res.locals.csrfToken = req.csrfToken();
  next();
})



app.use("/admin", adminRoutes);
app.use(shopRoutes);
//auth routes
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("... Connect To Mongodb via Mongoose ...");
    console.log("http://localhost:3000");
    /** Create User dummy user*/
    // User.findOne().then((user) => {
    //   if (!user) {
    //     console.log("... Create User Demo ...");
    //     const user = new User({
    //       name: "Mohamed",
    //       email: "zizo@test.com",
    //       cart: {
    //         items: [],
    //       },
    //     });
    //     user.save();
    //   }
    // });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
