const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signin } = require("../controller/auth");
const { signup } = require("../controller/auth");
const { signout, isSignedIn } = require("../controller/auth");

//  signup route
router.post(
  "/signup",
  [
    check("name", "Name should be at least 3 chars").isLength({ min: 3 }),
    check("email", "Email is required.").isEmail(),
    check("email", "Email already Existed.").isEmail(),
    check("password", "Minimum 3 characters password is required.").isLength({
      min: 3,
    }),
    check("phone", "Phone should be 10 digits").isLength({ min: 10 }),
  ],
  signup
);

// signin route
router.post(
  "/signin",
  [
    check("email", "email is required.").isEmail(),
    check("password", "Password is required").isLength({ min: 3 }),
  ],
  signin
);

// signout route
router.get("/signout", signout);

// test route
router.get("/test", isSignedIn, (req, res) => {
  // res.send("protected route...");
  res.json(req.auth);
});

module.exports = router;
