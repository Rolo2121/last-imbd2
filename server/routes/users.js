const express = require("express");
const router = express.Router();
const User = require("../models/User");
//const { auth } = require("../middleware/auth");
var sanitize = require("mongo-sanitize");
const bcrypt = require("bcrypt");

router.post("/signup", async function (req, res) {
  try {
    var user = await User.create(sanitize(req.body));
    req.session.userId = user._id;
    res.sendStatus(200);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/login", async function (req, res) {
  try {
    var user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.sendStatus(400);
    }
    user.comparePassword(req.body.password, (error, match) => {
      if (!match) {
        return res.sendStatus(400);
      }
    });
    req.session.userId = user._id;
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/me", async function (req, res) {
  try {
    const user = await User.findById(req.session.userId);
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
