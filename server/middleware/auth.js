const userModel = require('../models/User');

async function auth(req, res, next) {
	try {
		const user = await userModel.findById(req.session.userId);
		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

module.exports = auth;
