//need this
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const config = require("./config/key");
const mongoose = require("mongoose");
const session = require("express-session");
const {graphqlHTTP} = require("express-graphql")
const {buildSchema} = require("graphql")
const Movie= require('./models/Movie')
const schema = buildSchema(`
type MovieItem {
  title: String
  poster: String
  genre: String
  rating: Float
  _id: String
}
  type Query{
    movies: [MovieItem]
  }
`)
const root = {
  movies:async() => {
    const movies = await Movie.find({});
    return movies
  }
}

const connect = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,

}))

app.use("/api/user", require("./routes/users"));
// app.use("/api/comment", require("./routes/comment"));
// app.use("/api/like", require("./routes/like"));
// app.use("/api/favorite", require("./routes/favorite"));
app.use("/api/movie", require("./routes/movie"));

app.use(express.static(path.join(__dirname, "../client/build")));

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Sever Running at ${port}`);
});
