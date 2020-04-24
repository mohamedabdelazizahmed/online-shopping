exports.getLogin = (req, res, next) => {

  // const isLoggedIn = req
  //   .get('Cookie')
  //   .split(';')[1]
  //   .trim()
  //   .split('=')[1];
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
   */
  res.setHeader('Set-Cookie', 'loggedIn=true');

  res.redirect("/");
};
