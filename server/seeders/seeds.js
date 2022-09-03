const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const db = require("../config/connection");
const { Movie, User } = require("../models");
const axios = require('axios')
// category can be top_rated, latest, popular
 const getMovies = (category, page=1) => {
  return axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=50cd42e604e54f742ad62e14e52e83b2&language=en-US?page=${page}`);
};

db.once("open", async () => {
  await Movie.deleteMany({});
  await User.deleteMany({});

  const userData = [];
  for (let i = 1; i < 51; i++) {
    const username = `user${i}`;
    const email = `${username}@gmail.com`;
    const password = await bcrypt.hash("password", 10);
    userData.push({ username, email, password });
  }
  const createdUsers = await User.collection.insertMany(userData);

  const movieDataSetOne = (await getMovies('top_rated')).data.results;
  const movieDataSetTwo = (await getMovies('top_rated', 2)).data.results;
  const movieDataSetThree = (await getMovies('top_rated', 3)).data.results;
  const movieDataSetFour = (await getMovies('top_rated', 4)).data.results;
  const movieDataSetFive = (await getMovies('top_rated', 5)).data.results;
  const genreDataSet = (await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=50cd42e604e54f742ad62e14e52e83b2&language=en-US`)).data.genres
  const combineMovieSet = [...movieDataSetOne].concat(movieDataSetTwo, movieDataSetThree, movieDataSetFour, movieDataSetFive)

const movieData = []
const imageBasePath ="https://image.tmdb.org/t/p/original"
combineMovieSet.forEach(({title, poster_path, release_date, overview, id, vote_average, vote_count, genre_ids}) => {
  if (movieData.filter((movieSearch) => {
    return movieSearch.externalMovieId === id
  }).length < 1){
    console.log('adding movie to list')
  const record= ({ externalMovieId: id, rating: vote_average, voteCount: vote_count, title, overview, releaseDate: release_date, poster: `${imageBasePath}${poster_path}`, genre: genreDataSet.find((foundGenre) => {
      return foundGenre.id === genre_ids[0]
  }) .name }); 
  movieData.push(record)
  Movie.create(record)
  }  
})
console.log(JSON.stringify(movieData))
  /*for (let i = 0; i < 50; i += 1) {
    const externalMovieId = faker.random.numeric();
    const rating = faker.random.numeric({ min: 0, max: 10 });
    const voteCount = faker.random.numeric();
    const title = faker.commerce.productName();
    const overview = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const releaseDate = faker.date.past();
    const poster = faker.image.imageUrl();
    const trailer = faker.image.imageUrl();
    movieData.push({ externalMovieId, rating, voteCount, title, overview, releaseDate, poster, trailer });
  }*/
 // const createdMovies = await db.collection('movies').insertMany(movieData);
 // console.log(createdMovies)
  console.log('created movies')

  //db.close()
  return
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];
    let friendId = userId;
    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }
  }
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];
    let movieId;
    for (let i = 0; i < Math.floor(Math.random() * 10); i += 1) {
      const randomMovieIndex = Math.floor(Math.random() * createdMovies.ops.length);
      movieId = createdMovies.ops[randomMovieIndex];
    }
  }

  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];
    let movieId;
    for (let i = 0; i < Math.floor(Math.random() * 10); i += 1) {
      const randomMovieIndex = Math.floor(Math.random() * createdMovies.ops.length);
      movieId = createdMovies.ops[randomMovieIndex];
    }
  }

  console.log("all done!");
  process.exit(0);
});
