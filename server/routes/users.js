const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Movie = require('../models/Movie');
//const { auth } = require("../middleware/auth");
var sanitize = require('mongo-sanitize');

router.post('/signup', async function (req, res) {
	try {
		var user = await User.create(sanitize(req.body));
		req.session.userId = user._id;
		res.sendStatus(200);
	} catch (error) {
		response.status(500).send(error);
	}
});

router.post('/login', async function (req, res) {
	try {
		var user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.sendStatus(400);
		}
		user.comparePassword(req.body.password, (error, match) => {
			if (!match) {
				return res.sendStatus(400);
			}
		});
		req.session.userId = user._id;
		res.sendStatus(200);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/me', async function (req, res) {
	try {
		const user = await User.findById(req.session.userId);
		res.json(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.post('/watchlist/:movieId', async function (req, res) {
	try {
		const user = await User.findById(req.session.userId);
		if (!user) {
			res.sendStatus(403);
			return;
		}
		const movie = await Movie.findById(req.params.movieId);
		if (!movie) {
			res.sendStatus(404);
			return;
		}
		if (user.watchlist.includes(movie._id)) {
			res.sendStatus(400);
			return;
		}
		user.watchlist.push(movie._id);
		await user.save();
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

router.delete('/watchlist/:movieId', async function (req, res) {
	try {
		const user = await User.findById(req.session.userId);
		if (!user) {
			res.sendStatus(403);
			return;
		}
		if (!user.watchlist.includes(req.params.movieId)) {
			res.sendStatus(404);
			return;
		}
		user.watchlist = user.watchlist.filter(
			(movieId) => movieId.toString() !== req.params.movieId
		);
		await user.save();
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

router.get('/watchlist', async (req, res) => {
	try {
		const user = await User.findById(req.session.userId).populate('watchlist');
		if (!user) {
			res.sendStatus(403);
			return;
		}
		res.json(user.watchlist);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

module.exports = router;
