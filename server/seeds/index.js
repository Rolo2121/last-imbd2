require("dotenv").config();
const movieModel = require("../models/Movie");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, async () => {
  await movieModel.deleteMany({});
  await movieModel.insertMany([
    {
      title: "Star Wars",
      genre: "Sci-Fi",
      poster: "https://m.media-amazon.com/images/M/MV5BNzg4MjQxNTQtZmI5My00YjMwLWJlMjUtMmJlY2U2ZWFlNzY1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UY478_.jpg",
      rating: 8.6,
    },
    {
      title: "Grease",
      genre: "Drama, Comedy",
      poster: "https://m.media-amazon.com/images/M/MV5BZmUyMDEyOTgtZmUwOS00NTdkLThlNzctNTM1ODQ4M2VhMjdhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY756_.jpg",
      rating: 7.2,
    },
    {
      title: "The Lord of the Rings",
      genre: "Fantasy",
      poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UY712_.jpg",
      rating: 8.8,
    },
    {
      title: "Beast",
      genre: "Drama",
      poster: "https://m.media-amazon.com/images/M/MV5BMmY5MDI2YmQtNDM0YS00ZWI3LTlmM2YtYWMzNjYyOWRiZGVhXkEyXkFqcGdeQXVyMTMzODk3NDU0._V1_.jpg",
      rating: 5.9,
    },
  ]);
  process.exit(0);
});
