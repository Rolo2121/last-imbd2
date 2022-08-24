const { builtinModules } = require("module");

const apiKey = process.env.API_KEY;

const getMovieUrl = (query) => `https://api.themoviedb.org/3/search/movie/?api_key=${API_KEY}&query=${query}`;
const getGenreUrl = () => `https://api.themoviedb.org/3/genre/movie/list?api_key=08389134f27bb5c7051579d94ad25dbd&language=en-US`;

async function getMovieByName(name) {
  const url = getMovieUrl(name);
  const movieResponse = await axios.get(url);
  const firstMovie = movieResponse.data.results[0];

  const genreResponse = await axios.get(getGenreUrl());
  const genres = genreResponse.data.genres;

  const parsedMovie = {
    title: firstMovie.original_title,
    rating: firstMovie.vote_average,
    poster: `https://image.tmdb.org/t/p/w500${firstMovie.poster_path}`,
    genres: firstMovie.genre_ids.map((id) => genres.find((genre) => genre.id === id).name).join(", "),
  };
  return parsedMovie;
}

module.exports = getMovieByName;
