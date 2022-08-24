const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
//const { auth } = require("../middleware/auth");
var sanitize = require("mongo-sanitize");

// router.post("/", auth, async (req, res) => {
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(sanitize(req.body));
    res.json(movie);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

router.get("/search/:movie_name", async (req, res) => {});

module.exports = router;
