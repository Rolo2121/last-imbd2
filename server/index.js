const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('./config/key');

const mongoose = require('mongoose');
const connect = mongoose.connect(config.mongoURI, { userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/api/favorite', require('./routes/favorite'));

app.get('/movie/"movieId', function (req, res) {
    res.cookie('cross-site-cookie', 'bar', { sameSite: 'none', secure: true });
});

app.get('*', function (req, res) {
    res.status(404).send('You are in the wrong place');
});

const port = process.env.port || 5000

app.listen(port, () => {
    console.log(`Sever Running at ${port}`)
});