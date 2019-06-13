const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

// Register new user
router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  
  // Add user
  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: "Failed to register user"});
    } else {
      res.json({success: true, msg: "User registered sucessfully"});
    }
  });
});

// Authenticate user
router.post("/authenticate", (req, res, next) => {
  res.send("AUTHENTICATE");
});

// Get user profile
router.get("/profile", (req, res, next) => {
  res.send("PROFILE");
});

module.exports = router;