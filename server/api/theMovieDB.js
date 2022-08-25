// const { builtinModules } = require("module");
// import axios from 'axios';
const axios = require("axios");

const API_KEY = process.env.API_KEY;

const getMovieUrl = (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
const getMovieSearchUrl = (query) => `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&query=${query}`;
const getGenreUrl = () => `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

async function getMoviesByName(name) {
  try {
    const url = getMovieSearchUrl(name);
    const movieResponse = await axios.get(url);

    const genreResponse = await axios.get(getGenreUrl());
    const genres = genreResponse.data.genres;

    // Get the first 10 movies
    const parsedMovies = movieResponse.data.results.slice(0, 10).map((movie) => ({
      tmdbId: movie.id,
      title: movie.original_title,
      rating: movie.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      genres: movie.genre_ids.map((id) => genres.find((genre) => genre.id === id).name).join(", "),
    }));

    return parsedMovies;
  } catch (error) {
    console.error(error);
  }

  return [];
}

async function getMovieById(id) {
  try {
    const url = getMovieUrl(id);
    const movieResponse = await axios.get(url);

    // Get the first 10 movies
    const parsedMovie = {
      tmdbId: movieResponse.data.id,
      title: movieResponse.data.original_title,
      rating: movieResponse.data.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${movieResponse.data.poster_path}`,
      genres: movieResponse.data.genres.map((genre) => genre.name).join(", "),
      overview: movieResponse.data.overview,
      createdAt: movieResponse.data.release_date,
    };

    return parsedMovie;
  } catch (error) {
    console.error(error);
  }

  return null;
}

module.exports = { getMoviesByName, getMovieById };
