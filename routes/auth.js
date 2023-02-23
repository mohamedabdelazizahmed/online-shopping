const path = require("path");

const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        // if (value == "test@test.com") {
        //   throw new Error("this is email address if forbidden");
        // }
        return User.findOne({ email: value })
          .then((userDoc) => {
            if (userDoc) {
              return Promise.reject("E-mail exists already , please pick different one ")
            }
          });
        return true;
      }),
    body(
      "password",
      "Please enter a password with only numbers and text at least 5 character"
    )
      .isLength({ min: "5" })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value == req.body.password) {
        throw new Error("The password have to match");
      }
      return true;
    }),
  ],

  authController.postSignup
);
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;