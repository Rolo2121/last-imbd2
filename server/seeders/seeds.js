const bcrypt = require('bcrypt');
const {faker} = require('@faker-js/faker');
const db = require('../config/connection');
const { Movie, User } = require('../models');
console.log(faker)
db.once('open', async () => {
  await Movie.deleteMany({});
  await User.deleteMany({});

  const userData = [];
  for (let i = 1; i < 51; i++) {
    const username = `user${i}`;
    const email = `${username}@gmail.com`;
    const password = await bcrypt.hash("password", 10)
    userData.push({ username, email, password });
  }
  const createdUsers = await User.collection.insertMany(userData);

  const movieData = [];
  for (let i = 0; i < 50; i += 1) {
    const externalMovieId = faker.random.numeric();
    const rating = faker.random.numeric({ 'min': 0, 'max': 10 });
    const voteCount = faker.random.numeric();
    const title = faker.commerce.productName();
    const overview = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const releaseDate = faker.date.past();
    const poster = faker.image.imageUrl();
    const trailer = faker.image.imageUrl();
    movieData.push({ externalMovieId, rating, voteCount, title, overview, releaseDate, poster, trailer });
  }
  console.log(movieData)
  const createdMovies = await Movie.collection.insertMany(movieData);

  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];
    let friendId = userId;
    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }
    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];
    let movieId;
    for (let i =0; i < (Math.floor(Math.random() * 10)); i += 1) {
      const randomMovieIndex = Math.floor(Math.random() * createdMovies.ops.length);
      movieId = createdMovies.ops[randomMovieIndex];
    }
    await User.updateOne({ _id: userId }, { $addToSet: { likedMovies: movieId } });
    await Movie.updateOne({ _id: movieId }, { $addToSet: { likedUsers: userId } });
  }

  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];
    let movieId;
    for (let i =0; i < (Math.floor(Math.random() * 10)); i += 1) {
      const randomMovieIndex = Math.floor(Math.random() * createdMovies.ops.length);
      movieId = createdMovies.ops[randomMovieIndex];
    }
    await User.updateOne({ _id: userId }, { $addToSet: { dislikedMovies: movieId } });
    await Movie.updateOne({ _id: movieId }, { $addToSet: { dislikedUsers: userId } });
  }

  console.log('all done!');
  process.exit(0);
});