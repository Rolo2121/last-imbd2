const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Movie = require("../models/Movie");
const auth = require("../middleware/auth");
var sanitize = require("mongo-sanitize");

router.post("/signup", async function (req, res) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.sendStatus(400);
    }
    var user = await User.create(sanitize(req.body));
    req.session.userId = user._id;
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async function (req, res) {
  try {
    var user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.sendStatus(400);
    }
    // bcrypt.compareSync(plaintext, this.password);
    // user.comparePassword(req.body.password, (error, match) => {
    //   if (!match) {
    //     return res.sendStatus(400);
    //   }
    // }); bcrypt.hashSync(this.password, 10)
    if (bcrypt.hashSync(req.body.password, 10) !== user.password) {
      res.sendStatus(400);
    }
    req.session.userId = user._id;
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/ping", auth, async function (req, res) {
  try {
    res.sendStatus(req.session.userId ? 200 : 400);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/watchlist/:movieId", auth, async function (req, res) {
  try {
    const user = req.user;
    if (!user) {
      res.sendStatus(403);
      return;
    }
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      res.sendStatus(404);
      return;
    }
    if (user.watchlist.includes(movie._id)) {
      res.sendStatus(400);
      return;
    }
    user.watchlist.push(movie._id);
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/watchlist/:movieId", auth, async function (req, res) {
  try {
    const user = req.user;
    if (!user) {
      res.sendStatus(403);
      return;
    }
    if (!user.watchlist.includes(req.params.movieId)) {
      res.sendStatus(404);
      return;
    }
    user.watchlist = user.watchlist.filter((movieId) => movieId.toString() !== req.params.movieId);
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/watchlist", auth, async (req, res) => {
  try {
    const user = await req.user.populate("watchlist");
    if (!user) {
      res.sendStatus(403);
      return;
    }
    res.json(user.watchlist);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
