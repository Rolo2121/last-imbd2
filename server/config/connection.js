const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/last-imbd2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
  //useFindAndModify: false,
  //retryWrites: true,
  //w: 'majority'
});

module.exports = mongoose.connection;
