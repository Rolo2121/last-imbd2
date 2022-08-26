//need this
require("dotenv").config();
const path = require("path");
const express = require("express");
const db = require("./config/connection");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const session = require("express-session");

// const connect = mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected..."))
//   .catch((err) => console.log(err));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(cookieParser());

// app.use("/api/user", require("./routes/users"));
// app.use("/api/comment", require("./routes/comment"));
// app.use("/api/like", require("./routes/like"));
// app.use("/api/favorite", require("./routes/favorite"));
// app.use("/api/movie", require("./routes/movie"));

// app.use(express.static(path.join(__dirname, "../client/build")));

// const port = process.env.PORT || 5001;

// app.listen(port, () => {
//   console.log(`Sever Running at ${port}`);
// });
