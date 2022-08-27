const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    externalMovieId: {
      type: Number,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    voteCount: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
    },
    poster: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    trailer: {
      type: String,
    },
  },
  { timestamps: true }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
