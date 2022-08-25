const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
//const { auth } = require("../middleware/auth");
var sanitize = require("mongo-sanitize");
const { getMovieByName } = require("../api/theMovieDB");

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
router.get("/movie/:id", async (req, res) => {
  const movies = await Movie.findById(req.params.id);
  res.json(movies);
});

router.get("/search/:movie_name", async (req, res) => {
  const foundMovie = await Movie.find({});
  if (req.params.movie_name && req.params.movie_name != "undefined") {
    console.log(req.params);
    res.json(foundMovie.filter((movie) => movie.title?.toLowerCase().includes(req.params.movie_name.toLowerCase())));
  } else {
    console.log(333);
    res.send(foundMovie);
  }
});

module.exports = router;
