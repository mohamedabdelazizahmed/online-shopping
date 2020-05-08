// npm install --save bcryptjs
const bcrypt = require("bcryptjs");
const User = require("../models/user");
exports.getLogin = (req, res, next) => {
  // we can manipulated data in the browser
  // const isLoggedIn = req
  //   .get('Cookie')
  //   .split(';')[1]
  //   .trim()
  //   .split('=')[1] == 'true';
  console.log("Login Page Render");
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  /** store information isLoggedIn */

  //  req.isLoggedIn = true;
  /**
   * request is dead after sending response
   * solution add cookie in header response
   * The  cookie attached for every request
   * The data  send for every request
   *  open DEVTools in chrome > Application > Cookies
   * secure configuration  mean we cant access using js  not showing because using https
   * httpOnly  configuration mean send for every request but can't access it js browser
   */
  // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');

  ///////////////////////////////////////////////////////////////////////////
  /**
   * after added isLoggedIn in se session show cookie in browser
   * connect.sid cookie session cookie
   */
  User.findById("5e93673dd9bf1e342cd08770")
    .then((user) => {
      console.log(user);
      //set isLoggedIn in session
      req.session.isLoggedIn = true;
      // in session stor data user when logged in session document in database
      req.session.user = user;
      // ensure the session was created to continue
      req.session.save((err) => {
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/signup");
      }
      // return promise in pkg bcrypt
      return bcrypt.hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });
        return user.save();
      });
    })

    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {});
};
