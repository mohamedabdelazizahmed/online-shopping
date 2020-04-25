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
   * after added isLoggedIn in se ssion show cookie in browser
   * connect.sid cookie session cookie 
   */
  req.session.isLoggedIn = true ;
  res.redirect("/");
};
