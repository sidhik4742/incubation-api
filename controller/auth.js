const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// exports.signup = (req, res) => {
//   console.log("REQ BODY", req.body);

//   res.json({
//     message: "youar signup successfully.. ",
//     name: "iqbal noushad",
//     body: "hey hi this is iqbal noushad who is writing my name as well as bio.",
//   });
// };

exports.signup = (req, res) => {
  console.log("this is signup page");
  // validation handler
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  const { email } = req.body;
  User.findOne({ email: email }).then((userExist) => {
    if (userExist) {
      return res.status(422).json({
        error: "Email already Exist",
      });
    }
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: "NOT able to save user in db",
        });
      }
      // res.json({
      //   name: user.name,
      //   email: user.email,
      //   id: user._id,

      // });
      res.json(user);
      console.log("REQ BODY:::", req.body);
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  //destructuring of data
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email dose not exists",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }
    // create token to put it into the cookie
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end  deconstruct
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

// signout method
exports.signout = (req, res) => {
  //    clear the cookie
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

// protected routes

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["RSA", "sha1", "RS256", "HS256"],
  userProperty: "auth",
});

// custom meddilware
exports.isAuthenticated = (req, res, next) => {
  // user can update his profile
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not admin",
    });
  }
  next();
};
