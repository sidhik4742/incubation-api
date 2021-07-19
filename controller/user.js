const User = require("../models/user");

// exports.getUserById = (req, res, next, id) => {
//   User.findById(id).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: "No user found in db",
//       });
//     }
//     req.profile = user;
//     next();
//   });
// };

// // get user method
// exports.getUser = (req, res) => {
//   // Todo : get back here for the password..
//   // req.profile.salt = "";
//   req.profile.salt = undefined;
//   req.profile.encryp_password = undefined;
//   return res.json(req.profile);
// };

// // update user
// exports.updateUser = (req, res) => {
//   User.findByIdAndUpdate(
//     { _id: req.profile._id },
//     { $set: req.body },
//     { new: true, useFindAndModify: false },
//     (err, user) => {
//       if (err) {
//         return res.status(400).json({
//           error: "you are not authorized to update the user",
//         });
//       }
//       user.salt = undefined;
//       user.encryp_password = undefined;
//       res.json(user);
//     }
//   );
// };

//  assignment to find all the store users
exports.findAll = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "No user ",
      });
    }
    res.json(users);
  });
};

// update user data
// exports.updateUser = (req, res, next) => {
//   const user1 = new User({
//     id: req.params.id,
//     name: req.body.name,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//     role: req.body.role,
//     phone: req.body.phone,
//   });
//   User.updateOne({ _id: req.params.id }, user1)
//     .then(() => {
//       res.status(200).json({
//         msg: "User Updated Successfully",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };

// Delete user controller

