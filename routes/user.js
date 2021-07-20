const express = require("express");
const User = require("../models/user");
const Plans = require("../models/plans");
const Subscribers = require("../models/subscribers")
const router = express.Router();
const {
  getUserById,
  getUser,
  updateUser,
  findAll,
  deleteUser,
} = require("../controller/user");
const { isSignedIn, isAuthenticated } = require("../controller/auth");

// router.param("userId", getUserById);

// router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
// router.get("/user/:userId", getUser);

// assignment for us
// router.get("/user", findAll);


//get all plans route
router.get("/user/getallplans", async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.query.id });
    console.log(user);
    let allPlans = await Plans.find();
    res.json({ allPlans, userEmail: user.email });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//get all subscribers
router.get("/user/getallsubscribers", async (req, res) => {
  try {
    let allSbscribers = await Subscribers.find();
    res.json(allSbscribers);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    let user1 = await User.find();
    res.json(user1);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// get user by an id
router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!id) {
      return res.status(404).json({
        message: "no user found",
      });
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

// put request which means update user
// router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
// router.put("/user/:userId", updateUser);
// router.put("/user/:userId", updateUser);

router.patch("/user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(updateUser);
  } catch (error) {
    res.status(404).send(updateUser);
  }
});

// delete user from the db

router.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteuser = await User.findByIdAndDelete(id);
    if (!id) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.send(deleteuser);
  } catch (error) {
    res.status(500).json({
      error: "no user found ",
    });
  }
});

module.exports = router;
