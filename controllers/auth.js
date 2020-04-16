exports.getLogin = (req, res, next) => {
  console.log("Login Page Render");  
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.isLoggedIn
  });
};


exports.postLogin = (req, res, next) => {
  /** store information isLoggedIn */ 
  req.isLoggedIn = true;
  res.redirect('/');
};
