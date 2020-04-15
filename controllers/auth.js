exports.getLogin = (req, res, next) => {
  console.log("Login Page Render");  
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
  });
};
